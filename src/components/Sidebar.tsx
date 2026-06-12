import React from 'react';
import { Home, CheckSquare, Calculator, X, Calendar, Sparkles,NotebookPen } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps): React.JSX.Element {
  // مصفوفة عناصر القائمة لسهولة الصيانة والتعديل مستقبلاً
  const menuItems = [
    { label: 'الرئيسية', icon: <Home size={18} />, link: '#hero' },
    { label: 'المدونة', icon: <NotebookPen size={18} />, link: '#habits-daily' },
    { label: 'تتبع العادات - اليومي', icon: <CheckSquare size={18} />, link: '#habits-daily' },
    { label: 'تتبع العادات - الإحصائيات', icon: <Calendar size={18} />, link: '#habits-stats' },
    { label: 'الآلة الحاسبة الذكية', icon: <Calculator size={18} />, link: '#calculator' },
  ];

  return (
    <>
      {/* غطاء خلفي معتم (Overlay) يظهر فقط على الجوال عند فتح القائمة لإغلاقها عند الضغط في أي مكان فارغ */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs md:hidden transition-opacity duration-300"
        />
      )}

      {/* هيكل الـ Sidebar الذكي */}
      <aside className={`
        fixed top-0 bottom-0 right-0 z-50 flex flex-col w-64 
        bg-sys-light-surface dark:bg-sys-dark-surface 
        border-l border-gray-200/50 dark:border-gray-800/50 
        transform transition-transform duration-300 ease-in-out
        md:translate-x-0 md:sticky md:h-screen
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        
        {/* رأس الشريط الجانبي - يظهر فيه زر الإغلاق على الجوال فقط */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200/30 dark:border-gray-800/30">
          <div className="flex items-center gap-2 font-bold text-sys-light-primary dark:text-sys-dark-primary text-sm tracking-wide">
            <Sparkles size={16} />
            <span>لوحة التحكم والأدوات</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-m3-sm hover:bg-gray-200/50 dark:hover:bg-gray-700/50 md:hidden cursor-pointer text-gray-500"
            aria-label="Close Sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* روابط وعناصر القائمة للتنقل */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.link}
                  onClick={onClose} // يغلق القائمة تلقائياً بعد الضغط على الجوال
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-m3-md text-gray-600 dark:text-gray-300 hover:bg-sys-light-primary/8 dark:hover:bg-sys-dark-primary/10 hover:text-sys-light-primary dark:hover:text-sys-dark-primary transition-all duration-200 group"
                >
                  <span className="text-gray-400 group-hover:text-sys-light-primary dark:group-hover:text-sys-dark-primary transition-colors">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* تذييل بسيط للشريط الجانبي */}
        <div className="p-4 border-t border-gray-200/30 dark:border-gray-800/30 text-[10px] font-mono text-center text-gray-400">
          الإصدار v4.0.0
        </div>
      </aside>
    </>
  );
}