export default function HomePage() {
  const sheyakhat = [
    "عين الصيرة", "أثر النبي", "الكفور", "كوم غراب", 
    "المنيل", "أبو السعود", "الروضة", "الخوخة"
  ];

  return (
    <div className="space-y-6">
      {/* التنبيه والمكتب النشط */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-brand-card p-5 rounded-lg border border-brand-gold/30">
          <p className="text-xs text-amber-200/70">الفعالية النشطة الآن</p>
          <h3 className="text-lg font-bold text-brand-gold mt-1">قافلة الخدمات الجماهيرية الشاملة</h3>
          <span className="inline-block mt-2 text-xs bg-green-900/60 text-green-300 px-2 py-1 rounded">متاحة للتسجيل الحالى</span>
        </div>

        <div className="bg-brand-card p-5 rounded-lg border border-brand-gold/30">
          <p className="text-xs text-amber-200/70">المكتب الحالي المفتوح</p>
          <h3 className="text-lg font-bold text-brand-gold mt-1">مكتب جامع عمرو بن العاص</h3>
          <p className="text-xs text-amber-100/60 mt-1">متاح أيضاً: مكتب الفسطاط</p>
        </div>

        <div className="bg-brand-card p-5 rounded-lg border border-brand-gold/30">
          <p className="text-xs text-amber-200/70">إجمالي شياخات الدائرة</p>
          <h3 className="text-lg font-bold text-brand-gold mt-1">8 شياخات رئيسية</h3>
          <p className="text-xs text-amber-100/60 mt-1">تغطية كاملة لمصر القديمة والمنيل</p>
        </div>
      </div>

      {/* قائمة الشياخات الـ 8 */}
      <div className="bg-brand-card p-6 rounded-lg border border-brand-gold/30">
        <h2 className="text-md font-bold text-brand-gold mb-3">شياخات دائرة مصر القديمة والمنيل:</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {sheyakhat.map((sh, idx) => (
            <div key={idx} className="bg-brand-dark p-3 rounded border border-brand-gold/10 text-center text-sm">
              {idx + 1}. {sh}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}