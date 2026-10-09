import './globals.css';

export const metadata = {
  title: 'مكتب النائب المستشار طاهر الخولي',
  description: 'نظام إدارة الفعاليات وقاعدة بيانات أهالي دائرة مصر القديمة والمنيل',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-brand-dark text-amber-100 flex flex-col">
        {/* Header الرئيسي باللوجو والتنسيق الذهبي */}
        <header className="bg-brand-card border-b border-brand-gold/30 p-4 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brand-gold/20 border border-brand-gold flex items-center justify-center font-bold text-brand-gold text-xl">
                TK
              </div>
              <div>
                <h1 className="text-xl font-bold text-brand-gold">مكتب النائب المستشار / طاهر الخولي</h1>
                <p className="text-xs text-amber-200/70">عضو مجلس النواب - دائرة مصر القديمة والمنيل | وكيل اللجنة الدستورية والتشريعية</p>
              </div>
            </div>
            
            {/* شريط التنقل المتجاوب للموبايل والكمبيوتر */}
            <nav className="flex gap-2 sm:gap-4 text-sm no-print overflow-x-auto w-full md:w-auto py-2">
              <a href="/" className="px-3 py-1.5 rounded bg-brand-gold/10 text-brand-gold hover:bg-brand-gold hover:text-black transition">الرئيسية</a>
              <a href="/events" className="px-3 py-1.5 rounded bg-brand-gold/10 text-brand-gold hover:bg-brand-gold hover:text-black transition">الفعاليات</a>
              <a href="/citizens" className="px-3 py-1.5 rounded bg-brand-gold/10 text-brand-gold hover:bg-brand-gold hover:text-black transition">أهالي الدائرة</a>
              <a href="/beneficiaries" className="px-3 py-1.5 rounded bg-brand-gold/10 text-brand-gold hover:bg-brand-gold hover:text-black transition">المستفيدين</a>
            </nav>
          </div>
        </header>

        {/* محتوى الصفحة */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-brand-card border-t border-brand-gold/20 p-4 text-center text-xs text-amber-200/50 no-print">
          جميع الحقوق محفوظة © مكتب النائب المستشار طاهر الخولي
        </footer>
      </body>
    </html>
  );
}