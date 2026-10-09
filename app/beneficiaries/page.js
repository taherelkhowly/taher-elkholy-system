'use client';

export default function BeneficiariesPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-brand-card p-6 rounded-lg border border-brand-gold/30 no-print">
        <div>
          <h2 className="text-xl font-bold text-brand-gold">سجل المستفيدين العام</h2>
          <p className="text-xs text-amber-200/70">عرض كافة الأسماء والفعاليات المستفاد منها بالتواريخ والأوقات</p>
        </div>
        <button 
          onClick={handlePrint}
          className="bg-brand-gold text-black px-4 py-2 rounded font-bold text-sm hover:bg-amber-300 transition"
        >
          🖨️ طباعة السجل الرسمي (PDF)
        </button>
      </div>

      {/* الهيدر الذي يظهر فقط أثناء الطباعة */}
      <div className="print-only text-center mb-6">
        <h1 className="text-2xl font-bold">مكتب النائب المستشار / طاهر الخولي</h1>
        <p className="text-sm">عضو مجلس النواب عن دائرة مصر القديمة والمنيل - وكيل اللجنة الدستورية والتشريعية</p>
        <hr className="my-2 border-black" />
        <h3 className="text-lg font-bold">كشف المستفيدين المسجلين في الخدمات والجماهيرية</h3>
      </div>

      <div className="bg-brand-card rounded-lg border border-brand-gold/20 overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead className="bg-brand-dark border-b border-brand-gold/30 text-brand-gold">
            <tr>
              <th className="p-3">م</th>
              <th className="p-3">الرقم القومي</th>
              <th className="p-3">الاسم</th>
              <th className="p-3">الشياخة</th>
              <th className="p-3">الفعاليات المستفاد منها</th>
              <th className="p-3">تاريخ ووقت التسجيل</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-gold/10">
            <tr>
              <td className="p-3">1</td>
              <td className="p-3">2950505010XXXX</td>
              <td className="p-3">محمود مصطفى السيد</td>
              <td className="p-3">عين الصيرة</td>
              <td className="p-3">قافلة طبية + توزيع معونات</td>
              <td className="p-3">09/10/2026 - 04:30 PM</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}