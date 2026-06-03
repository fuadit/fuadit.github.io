// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Sun, Moon, Briefcase, Code, User, ArrowDown, ExternalLink } from 'lucide-react';
import UpdateNotification from './components/UpdateNotification';

interface Project {
  title: string;
  desc: string;
  link?: string;
}

export default function App(): React.JSX.Element {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const skills: string[] = [
    'TypeScript', 'ReactJS', 'Tailwind v4', 
    'PWA / Service Workers', 'Material Design 3', 
    'UI/UX Design', 'Git & GitHub', 'Vite'
  ];

  const projects: Project[] = [
    { title: 'منصة تجارة إلكترونية PWA', desc: 'تطبيق متجر متكامل يعمل بدون إنترنت مع سلة مشتريات ديناميكية.' },
    { title: 'لوحة تحكم ذكية', desc: 'لوحة تحكم لإدارة البيانات تعتمد على نظام ألوان متكيف مع المستخدم.' },
    { title: 'تطبيق إدارة المهام', desc: 'أداة إنتاجية لتنظيم الوقت مع إشعارات فورية باستخدام الـ Service Worker.' },
  ];

  return (
    <div className="min-h-screen bg-sys-light-background dark:bg-sys-dark-background text-gray-800 dark:text-gray-100" dir="rtl">
      
      {/* 1. شريط التنقل */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-sys-light-background/80 dark:bg-sys-dark-background/80 border-b border-gray-200/50 dark:border-gray-800/50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-xl font-bold text-sys-light-primary dark:text-sys-dark-primary tracking-wide">
            مُطوّر PWA
          </div>
          
          <div className="flex items-center gap-6">
            <ul className="hidden md:flex gap-6 text-sm font-medium">
              <li><a href="#hero" className="hover:text-sys-light-primary dark:hover:text-sys-dark-primary transition">الرئيسية</a></li>
              <li><a href="#about" className="hover:text-sys-light-primary dark:hover:text-sys-dark-primary transition">عني</a></li>
              <li><a href="#projects" className="hover:text-sys-light-primary dark:hover:text-sys-dark-primary transition">أعمالي</a></li>
            </ul>

            {/* زر تبديل المظهر بالحواف المتوسطة لـ Material 3 */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-m3-md bg-sys-light-surface dark:bg-sys-dark-surface text-sys-light-primary dark:text-sys-dark-primary hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* 2. قسم الترحيب */}
      <section id="hero" className="max-w-6xl mx-auto px-6 pt-20 pb-16 flex flex-col items-center text-center justify-center min-h-[70vh]">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-m3-full bg-sys-light-surface dark:bg-sys-dark-surface text-sys-light-primary dark:text-sys-dark-primary text-sm font-medium mb-6 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          متاح للمشاريع الجديدة
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
          أهلاً بك، أنا أصمم وأبرمج <br />
          <span className="text-sys-light-primary dark:text-sys-dark-primary">تطبيقات ويب ذكية وفريدة</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-10 leading-relaxed">
          موقع شخصي مبني بالكامل كـ PWA متطور باستخدام TypeScript، يجمع بين جمالية تصاميم Material Design 3 وقوة وسرعة Tailwind CSS v4 الجديد.
        </p>
        
        {/* أزرار بحواف دائرية كاملة M3 Full Shape */}
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#projects" className="px-8 py-3 bg-sys-light-primary dark:bg-sys-dark-primary text-sys-light-on-primary dark:text-sys-dark-on-primary font-medium rounded-m3-full shadow-sm hover:shadow-lg hover:opacity-95 transition-all flex items-center gap-2">
            <Briefcase size={18} />
            تصفح أعمالي
          </a>
        </div>

        <div className="mt-16 animate-bounce text-gray-400">
          <ArrowDown size={24} />
        </div>
      </section>

      {/* 3. قسم عني والمهارات */}
      <section id="about" className="bg-sys-light-surface/50 dark:bg-sys-dark-surface/30 py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4 text-sys-light-primary dark:text-sys-dark-primary">
              <User size={24} />
              <h2 className="text-2xl font-bold">من أنا؟</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              أنا مطور برمجيات واجهات مستخدم متقدمة أعتمد على TypeScript لكتابة أكواد نظيفة وقابلة للصيانة والتوسع. أهتم جداً بتجربة المستخدم وتطبيق معايير الـ PWA لتوفير أفضل أداء ممكن.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {skills.map((skill: string, index: number) => (
              <span key={index} className="px-4 py-2 bg-sys-light-surface dark:bg-sys-dark-surface border border-gray-200/50 dark:border-gray-700/50 text-sm font-medium rounded-m3-md shadow-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. قسم معرض الأعمال - بطاقات بحواف كبيرة M3 Large Shape */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center gap-3 mb-10 text-sys-light-primary dark:text-sys-dark-primary">
          <Code size={24} />
          <h2 className="text-3xl font-bold">آخر المشاريع</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project: Project, i: number) => (
            <div key={i} className="p-6 bg-sys-light-surface dark:bg-sys-dark-surface rounded-m3-lg border border-transparent dark:border-gray-800/40 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-sys-light-primary dark:text-sys-dark-primary mb-3">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">{project.desc}</p>
              </div>
              <a href={project.link || "#"} className="text-sm font-medium flex items-center gap-1 text-sys-light-secondary dark:text-sys-dark-secondary hover:underline">
                معاينة المشروع <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 5. تذييل الصفحة */}
      <footer className="border-t border-gray-200/60 dark:border-gray-800/60 py-8 text-center text-sm text-gray-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} موقعي الشخصي. جميع الحقوق محفوظة.</p>
          <p className="bg-sys-light-surface dark:bg-sys-dark-surface px-3 py-1 rounded-m3-sm text-xs font-mono">
            React + TS + Tailwind v4
          </p>
        </div>
      </footer>

{/* مكون التنبيه بالتحديث الذكي */}
      <UpdateNotification />
    </div>
  );
}