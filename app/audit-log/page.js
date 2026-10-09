export default function AuditLogPage() {
  return (
    <div className="space-y-6">
      <div className="bg-brand-card p-6 rounded-lg border border-brand-gold/30">
        <h2 className="text-xl font-bold text-brand-gold">سجل الحركات والتعديلات (Audit Log)</h2>
        <p className="text-xs text-amber-200/70">متابعة كافة التغييرات والإضافات والعمليات التي تمت على السيستم</p>
      </div>

      <div className="bg-brand-card rounded-lg border border-brand-gold/20 overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead className="bg-brand-dark border-b border-brand-gold/30 text-brand-gold">
            <tr>
              <th className="p-3">الموظف / المستخدم</th>
              <th className="p-3">نوع الحركة</th>
              <th className="p-3">التفاصيل</th>
              <th className="p-3">المكتب</th>
              <th className="p-3">التاريخ والوقت</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-gold/10">
            <tr>
              <td className="p-3">مسؤول النظام</td>
              <td className="p-3 text-green-400">إضافة مواطن جديد</td>
              <td className="p-3">تسجيل المواطن (أحمد محمد) في فعالية القافلة</td>
              <td className="p-3">جامع عمرو بن العاص</td>
              <td className="p-3">09/10/2026 - 05:15 PM</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}