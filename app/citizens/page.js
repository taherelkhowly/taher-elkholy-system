'use client';
import { useState } from 'react';

export default function CitizensPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-brand-card p-6 rounded-lg border border-brand-gold/30">
        <div>
          <h2 className="text-xl font-bold text-brand-gold">قاعدة بيانات أهالي الدائرة</h2>
          <p className="text-xs text-amber-200/70">سجل يضم حوالي 280,000 مواطن مع إمكانية التحديث بملف Excel</p>
        </div>
        <div className="flex gap-2">
          <label className="cursor-pointer bg-brand-gold text-black px-4 py-2 rounded font-bold text-sm hover:bg-amber-300 transition">
            + تحديث عبر ملف Excel
            <input type="file" accept=".xlsx, .csv" className="hidden" />
          </label>
        </div>
      </div>

      <div className="bg-brand-card p-4 rounded-lg border border-brand-gold/20">
        <input
          type="text"
          placeholder="ابحث بالاسم أو الرقم القومي أو الشياخة..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded bg-brand-dark border border-brand-gold/30 text-amber-100 focus:outline-none focus:border-brand-gold"
        />
      </div>

      <div className="bg-brand-card rounded-lg border border-brand-gold/20 overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead className="bg-brand-dark border-b border-brand-gold/30 text-brand-gold">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">الرقم القومي</th>
              <th className="p-3">الاسم الكامل</th>
              <th className="p-3">الشياخة</th>
              <th className="p-3">العنوان</th>
              <th className="p-3">الوظيفة / المؤهل</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-gold/10">
            <tr>
              <td className="p-3">1</td>
              <td className="p-3">2980101010XXXX</td>
              <td className="p-3">أحمد محمد علي</td>
              <td className="p-3">المنيل</td>
              <td className="p-3">شارع الروضة - مصر القديمة</td>
              <td className="p-3">مهندس</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}