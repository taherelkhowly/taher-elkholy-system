import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'مكتب النائب المستشار طاهر الخولي | نظام إدارة المكتب',
  description: 'نظام داخلي لإدارة طلبات المكتب والخدمات والفعاليات والمستفيدين والتقارير.',
  applicationName: 'مكتب النائب المستشار طاهر الخولي',
};

const nav = [
  ['/', 'الرئيسية'], ['/requests', 'طلبات النائب'], ['/services', 'الخدمات'],
  ['/citizens', 'قاعدة البيانات'], ['/beneficiaries', 'المستفيدون'],
  ['/events', 'الفعاليات'], ['/reports', 'التقارير'], ['/print', 'الطباعة A4'], ['/audit-log', 'سجل الحركات'],
];

export default function RootLayout({ children }) {
  return <html lang="ar" dir="rtl"><body>
    <header className="site-header no-print"><div className="header-inner">
      <Link href="/" className="brand"><div className="brand-mark">ط خ</div><div><h1>مكتب النائب المستشار / طاهر الخولي</h1><p>نظام الإدارة الداخلي • مصر القديمة والمنيل</p></div></Link>
      <nav className="nav">{nav.map(([href,label]) => <Link key={href} href={href}>{label}</Link>)}</nav>
    </div></header>
    <main className="main">{children}</main>
    <footer className="site-footer no-print">نظام الإدارة الداخلي — مكتب النائب المستشار طاهر الخولي</footer>
  </body></html>;
}
