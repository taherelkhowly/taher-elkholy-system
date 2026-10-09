'use client';
import { useState } from 'react';

export default function EventsPage() {
  const [nationalId, setNationalId] = useState('');
  const [location, setLocation] = useState('جامع عمرو بن العاص');

  return (
    <div className="space-y-6">
      <div className="bg-brand-card p-6 rounded-lg border border-brand-gold/30">
        <h2 className="text-xl font-bold text-brand-gold mb-4">تسجيل مواطن جديد في الفعالية الحالية</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-amber-200/80 mb-1">المكتب الحالي</label>
            <select 
              value={location} 
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2.5 rounded bg-brand-dark border border-brand-gold/30 text-amber-100 focus:outline-none focus:border-brand-gold"
            >
              <option value="جامع عمرو بن العاص">مكتب جامع عمرو بن العاص</option>
              <option value="الفسطاط">مكتب الفسطاط</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-amber-200/80 mb-1">الرقم القومي (14 رقم)</label>
            <input 
              type="text" 
              maxLength="14"
              placeholder="أدخل الرقم القومي للبحث والتحقق..."
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              className="w-full p-2.5 rounded bg-brand-dark border border-brand-gold/30 text-amber-100 focus:outline-none focus:border-brand-gold"
            />
          </div>
        </div>

        <div className="border-2 border-dashed border-brand-gold/30 p-6 rounded-lg text-center bg-brand-dark/50">
          <p className="text-sm text-amber-200/70 mb-2">إرفاق أو تصوير البطاقة الشخصية (وجه وظهر)</p>
          <input type="file" accept="image/*" className="text-xs text-amber-200" />
        </div>
      </div>
    </div>
  );
}