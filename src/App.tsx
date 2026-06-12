// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Briefcase, Code, BookOpen, ArrowDown, ExternalLink } from 'lucide-react';
import UpdateNotification from './components/UpdateNotification';
import HijriCard from './components/HijriCard';
import WeatherCard from './components/WeatherCard';
import MotivationalQuote from './components/MotivationalQuote';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

interface Project {
  title: string;
  desc: string;
  tech: string;
  link?: string;
}

interface BlogPost {
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  link?: string;
}

export default function App(): React.JSX.Element {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const skills: string[] = [
    'php', 'laravel', 'mysql', 'postegreSQL', 'javascript', 'kotlin', 'C#', 'MonoGame',
    'TypeScript', 'ReactJS', 'Tailwindcss',
    'PWA Architecture', 'UI/UX Design', 'Vite'
  ];

const projects: Project[] = [
  { 
    title: 'Lorem Ipsum Dolor', 
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.', 
    tech: 'React + TypeScript' 
  },
  { 
    title: 'Sit Amet Consectetur', 
    desc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 
    tech: 'Tailwind v4' 
  },
];

const blogPosts: BlogPost[] = [
  {
    title: 'Lorem ipsum dolor sit amet consectetur',
    date: '15-05-2026',
    readTime: '5 min read',
    excerpt: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  },
  {
    title: 'Excepteur sint occaecat cupidatat non proident',
    date: '01-04-2026',
    readTime: '7 min read',
    excerpt: 'Sunt in culpa qui officia deserunt mollit anim id est laborum ut et doloris clam.'
  },
];

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  return (
    <div className="min-h-screen bg-sys-light-background dark:bg-sys-dark-background text-gray-800 dark:text-gray-100 transition-colors duration-300 font-sans flex flex-col" dir="rtl">

      {/* 1. شريط التنقل العلوي */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} onMenuClick={() => setSidebarOpen(true)} />

      {/* الحاوية الكبرى المقسمة لتوزيع الـ Sidebar بجانب المحتوى */}
      <div className="flex flex-1 w-full relative">

        {/* 2. الشريط الجانبي */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* 3. المحتوى الأساسي للموقع (المساحة المتبقية كاملة) */}
        <main className="flex-1 min-w-0">

          {/* شريط المعلومات العلوي الذكي (التاريخ، الطقس، العبارة) */}
          <div className="max-w-3xl mx-auto px-6 pt-8 w-full grid grid-cols-2 gap-3 items-stretch">
            <HijriCard />
            <WeatherCard />
            <MotivationalQuote />
          </div>

          {/* الأقسام الأساسية للموقع */}
          <section id="hero" className="...">
            {/* محتوى الهيرو... */}
          </section>


          {/* 2. قسم الهيرو (Hero Section) */}
          <section id="hero" className="max-w-3xl mx-auto px-6 pt-24 pb-16 flex flex-col items-center text-center justify-center min-h-[65vh]">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              أصمم وأبني <span className="text-sys-light-primary dark:text-sys-dark-primary">تجارب ويب حديثة</span>
            </h1>
            <a href="#projects" className="px-6 py-3 bg-sys-light-primary dark:bg-sys-dark-primary text-sys-light-on-primary dark:text-sys-dark-on-primary font-medium rounded-m3-full shadow-sm hover:shadow-md hover:opacity-95 transition-all flex items-center gap-2 text-sm">
              <Briefcase size={16} />
             تصفح المزيد
            </a>
            <div className="mt-12 animate-bounce text-gray-400">
              <ArrowDown size={20} />
            </div>
          </section>

          {/* 3. قسم المهارات (Skills Section) */}
          <section id="skills" className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-200/40 dark:border-gray-800/40">
            <div className="flex items-center gap-2.5 mb-8 text-sys-light-primary dark:text-sys-dark-primary">
              <Code size={20} />
              <h2 className="text-xl font-bold">المهارات التقنية</h2>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill: string, index: number) => (
                <span key={index} className="px-4 py-2 bg-sys-light-surface dark:bg-sys-dark-surface text-sm font-medium rounded-m3-md border border-transparent dark:border-gray-800/30 shadow-xs">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* 4. قسم المشاريع (Projects Section) */}
          <section id="projects" className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-200/40 dark:border-gray-800/40">
            <div className="flex items-center gap-2.5 mb-8 text-sys-light-primary dark:text-sys-dark-primary">
              <Briefcase size={20} />
              <h2 className="text-xl font-bold">المشاريع الحالية</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {projects.map((project: Project, i: number) => (
                <div key={i} className="p-5 bg-sys-light-surface dark:bg-sys-dark-surface rounded-m3-lg border border-transparent dark:border-gray-800/30 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-sys-light-secondary dark:text-sys-dark-secondary bg-sys-light-background dark:bg-sys-dark-background px-2 py-0.5 rounded-m3-sm border border-gray-200/30 dark:border-gray-700/30">
                      {project.tech}
                    </span>
                    <h3 className="text-lg font-bold mt-3 mb-2">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{project.desc}</p>
                  </div>
                  <a href={project.link || "#"} className="text-xs font-medium flex items-center gap-1 text-sys-light-primary dark:text-sys-dark-primary hover:underline">
                    معاينة فنية <ExternalLink size={12} />
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* 5. قسم المدونة (Blog Section) */}
          <section id="blog" className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-200/40 dark:border-gray-800/40">
            <div className="flex items-center gap-2.5 mb-8 text-sys-light-primary dark:text-sys-dark-primary">
              <BookOpen size={20} />
              <h2 className="text-xl font-bold">مقالات ومشاركات برمجية</h2>
            </div>
            <div className="space-y-6">
              {blogPosts.map((post: BlogPost, i: number) => (
                <article key={i} className="p-5 bg-sys-light-surface/40 dark:bg-sys-dark-surface/10 rounded-m3-lg border border-gray-200/40 dark:border-gray-800/40 hover:border-sys-light-primary/40 dark:hover:border-sys-dark-primary/40 transition-all">
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-2 font-mono">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 hover:text-sys-light-primary dark:hover:text-sys-dark-primary transition">
                    <a href={post.link || "#"}>{post.title}</a>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{post.excerpt}</p>
                </article>
              ))}
            </div>
          </section>


          {/* تذييل الصفحة داخل المحتوى الرئيسي ليكون متناسقاً أفقياً */}
          <footer className="border-t border-gray-200/40 dark:border-gray-800/40 py-8 text-center text-xs text-gray-400 font-mono">
            <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-3">
              <p>© {new Date().getFullYear()} موقعي. جميع الحقوق محفوظة.</p>
              <p className="bg-sys-light-surface dark:bg-sys-dark-surface px-2.5 py-1 rounded-m3-sm">
                React + TS + Tailwind v4
              </p>
            </div>
          </footer>

        </main>
      </div>

      <UpdateNotification />
    </div>
  );

}