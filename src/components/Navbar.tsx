import React from 'react';
import { Terminal, Sun, Moon, Menu } from 'lucide-react'; // أضفنا Menu هنا

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  onMenuClick: () => void; // دالة جديدة لفتح القائمة الجانبية
}

export default function Navbar({ darkMode, setDarkMode, onMenuClick }: NavbarProps): React.JSX.Element {
  return (
    <nav className="sticky top-0 z-40 backdrop-blur-md bg-sys-light-background/80 dark:bg-sys-dark-background/80 border-b border-gray-200/50 dark:border-gray-800/50 px-6 py-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        
        {/* الجانب الأيمن: زر الجوال والشعار */}
        <div className="flex items-center gap-3">
          {/* زر الهامبرغر يظهر فقط على الجوال md:hidden */}
          <button 
            onClick={onMenuClick}
            className="p-1.5 rounded-m3-sm hover:bg-gray-200/50 dark:hover:bg-gray-700/50 md:hidden cursor-pointer text-gray-600 dark:text-gray-300"
          >
            <Menu size={20} />
          </button>
          
          <div className="text-lg font-bold text-sys-light-primary dark:text-sys-dark-primary flex items-center gap-2">
            <Terminal size={18} />
            <span>فؤاد المهاوش</span>
          </div>
        </div>

        {/* الجانب الأيسر */}
        <div className="flex items-center gap-6">
          <ul className="hidden sm:flex gap-6 text-sm font-medium">
            <li><a href="#hero" className="hover:text-sys-light-primary dark:hover:text-sys-dark-primary transition">الرئيسية</a></li>
            <li><a href="#skills" className="hover:text-sys-light-primary dark:hover:text-sys-dark-primary transition">المهارات</a></li>
            <li><a href="#projects" className="hover:text-sys-light-primary dark:hover:text-sys-dark-primary transition">المشاريع</a></li>
            <li><a href="#blog" className="hover:text-sys-light-primary dark:hover:text-sys-dark-primary transition">المدونة</a></li>
          </ul>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-m3-md bg-sys-light-surface dark:bg-sys-dark-surface text-sys-light-primary dark:text-sys-dark-primary hover:scale-105 active:scale-95 transition-all cursor-pointer select-none"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}