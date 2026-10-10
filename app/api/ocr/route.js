import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'مفتاح Gemini غير مضبوط. أضف GEMINI_API_KEY إلى ملف .env.local ثم أعد تشغيل المشروع.' }, { status: 503 });
    }
    const body = await request.json();
    const { image, mimeType, side } = body || {};
    if (!image || typeof image !== 'string' || !/^image\/(jpeg|png|webp|heic|heif)$/i.test(mimeType || '')) {
      return NextResponse.json({ error: 'الصورة غير صالحة. ارفع صورة JPG أو PNG أو WEBP واضحة.' }, { status: 400 });
    }
    if (image.length > 12_000_000) {
      return NextResponse.json({ error: 'حجم الصورة كبير. قلّل حجمها ثم حاول مرة أخرى.' }, { status: 413 });
    }
    const sideName = side === 'back' ? 'ظهر بطاقة الرقم القومي' : 'وجه بطاقة الرقم القومي';
    const prompt = `أنت نظام OCR دقيق. اقرأ النص الظاهر فقط من صورة ${sideName} مصرية. لا تخمّن ولا تستنتج ولا تكمل أي بيانات غير واضحة. حافظ على الأرقام كما تظهر. أخرج JSON صالحًا فقط دون markdown بهذا الشكل: {"text":"النص الكامل المقروء حرفيًا","fields":{"citizen_name":"","address":"","district":"","governorate":"","national_id":"","birth_date":"","job":"","gender":"","marital_status":"","religion":""},"uncertain_fields":[]}. استخرج من الوجه الاسم والعنوان والقسم والمحافظة والرقم القومي وتاريخ الميلاد إذا كانت مطبوعة وواضحة. استخرج من الظهر الوظيفة والنوع والحالة الاجتماعية والديانة إذا كانت ظاهرة. الحقول التي لا تظهر أو لا يمكن قراءتها اتركها فارغة، وأضف أسماءها إلى uncertain_fields. لا تستنتج الديانة أو النوع أو الحالة الاجتماعية من الاسم أو الصورة. الرقم القومي المصري 14 رقمًا عادة، لكن لا تصححه بالتخمين.`;
    // Use Gemini Interactions API with the current model instead of the retired generateContent model.
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/interactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        model: 'gemini-3.8-flash',
        input: [
          { type: 'text', text: prompt },
          { type: 'image', data: image, mime_type: mimeType }
        ],
        response_format: { type: 'text', mime_type: 'application/json' },
        generation_config: { temperature: 0.1 }
      }),
      cache: 'no-store'
    });
    const payload = await response.json();
    if (!response.ok) {
      const message = payload?.error?.message || payload?.message || 'تعذر الاتصال بخدمة Gemini.';
      return NextResponse.json({ error: `فشل OCR من Gemini: ${message}` }, { status: response.status === 429 ? 429 : 502 });
    }
    // Interactions API may return output_text directly or text blocks inside output.
    const output = typeof payload?.output_text === 'string'
      ? payload.output_text.trim()
      : (Array.isArray(payload?.output) ? payload.output.flatMap(item => Array.isArray(item?.content) ? item.content : []).map(part => part?.text || '').join('').trim() : '');
    if (!output) return NextResponse.json({ error: 'لم يتمكن Gemini من قراءة هذه الصورة. جرّب صورة أوضح.' }, { status: 422 });
    let parsed;
    try {
      const cleaned = output.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
      parsed = JSON.parse(cleaned);
    } catch {
      return NextResponse.json({ error: 'وصلت نتيجة غير مفهومة من محرك القراءة. حاول مرة أخرى.' }, { status: 502 });
    }
    return NextResponse.json({ text: typeof parsed.text === 'string' ? parsed.text : '', fields: parsed.fields || {}, uncertainFields: Array.isArray(parsed.uncertain_fields) ? parsed.uncertain_fields : [] }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return NextResponse.json({ error: 'تعذر تنفيذ قراءة البطاقة. تحقق من اتصال الإنترنت ثم أعد المحاولة.' }, { status: 500 });
  }
}
