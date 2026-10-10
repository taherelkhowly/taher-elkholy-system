'use client';
import { useState } from 'react';

const emptyFields = { citizen_name:'', address:'', district:'', governorate:'', national_id:'', birth_date:'', job:'', gender:'', marital_status:'', religion:'' };
const labels = { citizen_name:'الاسم', address:'العنوان', district:'القسم', governorate:'المحافظة', national_id:'الرقم القومي', birth_date:'تاريخ الميلاد', job:'الوظيفة', gender:'النوع', marital_status:'الحالة الاجتماعية', religion:'الديانة' };

async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1] || '');
    reader.onerror = () => reject(new Error('تعذر قراءة ملف الصورة.'));
    reader.readAsDataURL(file);
  });
}

export default function IdCardOcr(){
 const [front,setFront]=useState(null),[back,setBack]=useState(null),[frontText,setFrontText]=useState(''),[backText,setBackText]=useState(''),[frontFields,setFrontFields]=useState(emptyFields),[backFields,setBackFields]=useState(emptyFields),[frontUncertain,setFrontUncertain]=useState([]),[backUncertain,setBackUncertain]=useState([]),[busy,setBusy]=useState(false),[progress,setProgress]=useState(''),[error,setError]=useState('');
 const readImage=async(file,side)=>{
   if(!file)return;
   if(!file.type?.startsWith('image/')){setError('اختَر ملف صورة صالحًا.');return;}
   setBusy(true);setError('');setProgress('جارٍ إرسال الصورة إلى Gemini لقراءة النص العربي…');
   try{
    const image=await fileToBase64(file);
    const response=await fetch('/api/ocr',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({image,mimeType:file.type,side})});
    const result=await response.json();
    if(!response.ok)throw new Error(result.error||'تعذرت قراءة الصورة.');
    if(side==='front'){
      setFront(file);setFrontText(result.text||'');setFrontFields({...emptyFields,...(result.fields||{})});setFrontUncertain(result.uncertainFields||[]);
    }else{
      setBack(file);setBackText(result.text||'');setBackFields({...emptyFields,...(result.fields||{})});setBackUncertain(result.uncertainFields||[]);
    }
    setProgress('انتهت القراءة عبر Gemini. راجع النص والحقول؛ لا تحفظ أي قيمة قبل التأكد منها.');
   }catch(e){setError(e?.message||'تعذرت قراءة الصورة. جرّب صورة أوضح بإضاءة جيدة.');}
   finally{setBusy(false);}
 };
 const parseAndFill=()=>{
   const fields={...emptyFields};
   for(const key of Object.keys(fields)) fields[key]=(frontFields[key]||backFields[key]||'').trim();
   fields.ocr_text=[frontText,backText].filter(Boolean).join('\n');
   window.dispatchEvent(new CustomEvent('beneficiary-id-ocr',{detail:fields}));
   setProgress('تم نقل القيم المقروءة مبدئيًا إلى نموذج المستفيد. راجع كل قيمة قبل الحفظ.');
 };
 const clearAll=()=>{setFront(null);setBack(null);setFrontText('');setBackText('');setFrontFields(emptyFields);setBackFields(emptyFields);setFrontUncertain([]);setBackUncertain([]);setProgress('');setError('');};
 const fieldEditor=(side,fields,setFields,uncertain)=> <div className="field" style={{marginTop:12}}><label>مراجعة الحقول المستخرجة — {side==='front'?'الوش':'الضهر'}</label><div className="form-grid">{Object.entries(labels).filter(([key])=>side==='front'?['citizen_name','address','district','governorate','national_id','birth_date'].includes(key):['job','gender','marital_status','religion'].includes(key)).map(([key,label])=><div className="field" key={key}><label>{label}{uncertain.includes(key)?' — راجعها بعناية':''}</label><input className="control" value={fields[key]||''} onChange={e=>setFields(prev=>({...prev,[key]:e.target.value}))} /></div>)}</div></div>;
 return <section className="panel no-print" style={{marginBottom:18}}>
  <div className="eyebrow">OCR سحابي عبر Gemini</div><h3 className="section-title">قراءة بطاقة الرقم القومي</h3>
  <p className="muted" style={{marginTop:0}}>ارفع صورة الوش والضهر. يرسل الموقع الصورة إلى Google Gemini لتحليلها، ثم يعرض النص والحقول لتراجعها وتصححها يدويًا قبل النقل.</p>
  <div className="form-grid">
   <div className="field"><label>وش البطاقة</label><input className="control" type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" capture="environment" disabled={busy} onChange={e=>readImage(e.target.files?.[0],'front')}/>{front&&<small className="muted">{front.name}</small>}</div>
   <div className="field"><label>ضهر البطاقة</label><input className="control" type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" capture="environment" disabled={busy} onChange={e=>readImage(e.target.files?.[0],'back')}/>{back&&<small className="muted">{back.name}</small>}</div>
  </div>
  {(frontText||backText)&&<div className="form-grid" style={{marginTop:14}}>
   <div className="field"><label>النص المقروء من الوش — راجعه</label><textarea className="control" rows={5} value={frontText} onChange={e=>setFrontText(e.target.value)}/></div>
   <div className="field"><label>النص المقروء من الضهر — راجعه</label><textarea className="control" rows={5} value={backText} onChange={e=>setBackText(e.target.value)}/></div>
  </div>}
  {frontText&&fieldEditor('front',frontFields,setFrontFields,frontUncertain)}
  {backText&&fieldEditor('back',backFields,setBackFields,backUncertain)}
  {busy&&<p className="muted" role="status">{progress}</p>}{!busy&&progress&&<p className="muted" role="status">{progress}</p>}{error&&<div className="notice" role="alert" style={{borderColor:'#9b4a4a',color:'#ffb8b8',marginTop:12}}>{error}</div>}
  <div className="form-actions"><button className="btn btn-primary" type="button" disabled={busy||(!frontText&&!backText)} onClick={parseAndFill}>نقل النتائج إلى نموذج المستفيد</button><button className="btn btn-secondary" type="button" disabled={busy} onClick={clearAll}>مسح الصور والنتائج</button></div>
  <p className="muted" style={{fontSize:12,marginBottom:0}}>تنبيه خصوصية: صور البطاقات تُرسل إلى Google Gemini عبر الخادم لقراءتها. لا تستخدم بيانات حقيقية إلا بعد مراجعة إعدادات الخصوصية والصلاحيات وسياسات Google المناسبة لجهة العمل. لا تحفظ النتائج قبل مراجعتها يدويًا.</p>
 </section>;
}
