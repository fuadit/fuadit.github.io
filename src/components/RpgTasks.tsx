import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Swords, Trophy, Settings, X, ShieldAlert } from 'lucide-react';

interface RpgTask {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export default function RpgTasks(): React.JSX.Element {
  const [tasks, setTasks] = useState<RpgTask[]>(() => {
    const saved = localStorage.getItem('rpg-weekly-tasks');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'إنهاء مراجعة الكود مع الفريق', difficulty: 'medium' },
      { id: '2', title: 'إصلاح ثغرة الـ PWA الكاش المعلق', difficulty: 'hard' },
      { id: '3', title: 'تحديث مكتبات المشروع', difficulty: 'easy' }
    ];
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [inputTitle, setInputTitle] = useState<string>('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  useEffect(() => {
    localStorage.setItem('rpg-weekly-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTitle.trim()) return;

    const newTask: RpgTask = {
      id: Date.now().toString(),
      title: inputTitle,
      difficulty
    };

    setTasks([...tasks, newTask]);
    setInputTitle('');
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // دالة توليد ألوان متغيرة فريدة للوحوش لتمييزها
  const getMonsterColorBySeed = (id: string, difficulty: 'easy' | 'medium' | 'hard') => {
    const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const variants = {
      easy: ['#22D3EE', '#A78BFA', '#F472B6'], // سماوي، بنفسجي فاتح، وردي بكسل
      medium: ['#E11D48', '#EA580C', '#C026D3'], // أحمر قرمزي، برتقالي، أرجواني
      hard: ['#4C1D95', '#111827', '#030712'] // أسود مطفأ، بنفسجي مظلم
    };
    const list = variants[difficulty];
    return list[seed % list.length];
  };

  // 1. رسم بطل بكسل آرت من الخلف (8-Bit Pixel Hero Back View)
  // تم بناؤه بنظام شبكة بكسل حادة وحواف واضحة جداً crispEdges
  const renderPixelHeroBack = () => (
    <svg width="80" height="80" viewBox="0 0 16 16" style={{ shapeRendering: 'crispEdges' }} className="animate-bounce">
      {/* خوذة/شعر مدبب أصفر ذهبي */}
      <path d="M5 1h6v1H5V1zm-2 1h10v1H3V2zm-1 1h12v3H2V3zm1 3h10v1H3V6z" fill="#FBBF24" />
      <path d="M4 2h8v1H4V2zm-1 1h10v1H3V3zm1 1h8v1H4V4z" fill="#D97706" /> {/* ظلال الشعر */}
      {/* وشاح البطل الأحمر حول الرقبة */}
      <path d="M3 7h10v1H3V7zm-1 1h2v1H2V8zm10 0h2v1h-2V8z" fill="#EF4444" />
      {/* درع الظهر الأزرق الملكي */}
      <path d="M3 8h10v6H3V8zm2 1h6v4H5V9z" fill="#1D4ED8" />
      <path d="M3 8h1v5H3V8zm9 0h1v5h-1V8z" fill="#2563EB" /> {/* أطراف الدرع */}
      {/* الحذاء الأسود السفلي */}
      <path d="M4 14h3v1H4v-1zm5 0h3v1H9v-1z" fill="#111827" />
      {/* سيف بكسل آرت أسطوري مرفوع في اليمين */}
      <path d="M13 1h2v5h-2V1zm-1 5h4v1h-4V6zm1 1h2v1h-2V7z" fill="#E2E8F0" />
      <path d="M14 2h1v4h-1V2z" fill="#94A3B8" /> {/* نصل السيف الداخلي */}
      <path d="M13 7h2v1h-2V7z" fill="#B45309" /> {/* مقبض السيف الخشبي */}
    </svg>
  );

  // 2. رسم وحوش بكسل آرت تواجه الشاشة (8-Bit Front View Monsters)
  const renderPixelMonster = (task: RpgTask) => {
    const color = getMonsterColorBySeed(task.id, task.difficulty);
    
    switch(task.difficulty) {
      case 'easy': // وحش بكسل هلامي (Pixel Slime)
        return (
          <svg width="48" height="48" viewBox="0 0 16 16" style={{ shapeRendering: 'crispEdges' }} className="animate-pulse">
            <path d="M4 6h8v1H4V6zm-2 1h12v1H2V7zm-1 1h14v5H1V8zm1 5h12v1H2V13zm2 1h8v1H4v-1z" fill={color} />
            {/* أعين بكسل سوداء تحدق للأمام */}
            <path d="M4 9h2v2H4V9zm6 0h2v2h-2V9z" fill="#111827" />
            {/* لمعة العين البيضاء */}
            <path d="M4 9h1v1H4V9zm6 0h1v1h-1V9z" fill="#FFFFFF" />
            <path d="M6 12h4v1H6v-1z" fill="rgba(0,0,0,0.2)" /> {/* فم مبتسم بكسل */}
          </svg>
        );
      case 'medium': // وحش صخرة بكسل بقرون وعيون متوهجة (Pixel Demon)
        return (
          <svg width="64" height="64" viewBox="0 0 16 16" style={{ shapeRendering: 'crispEdges' }} className="animate-pulse" style={{ animationDuration: '1.5s' }}>
            {/* قرون بكسل علوية */}
            <path d="M2 1h2v3H2V1zm10 0h2v3h-2V1z" fill="#111827" />
            {/* الرأس والجسم المربع */}
            <path d="M3 4h10v10H3V4z" fill={color} />
            {/* عيون بكسل غاضبة صفراء */}
            <path d="M4 6h3v2H4V6zm5 0h3v2H9V6z" fill="#FBBF24" />
            <path d="M5 7h1v1H5V7zm5 0h1v1h-1V7z" fill="#000000" />
            {/* أنياب بكسل بيضاء */}
            <path d="M5 10h1v1H5v-1zm5 0h1v1h-1v-1z" fill="#FFFFFF" />
            <path d="M6 11h4v1H6v-1z" fill="rgba(0,0,0,0.3)" />
          </svg>
        );
      case 'hard': // الزعيم التنين بكسل العملاق (8-Bit Boss Dragon)
        return (
          <svg width="84" height="84" viewBox="0 0 16 16" style={{ shapeRendering: 'crispEdges' }} className="animate-bounce" style={{ animationDuration: '1.3s' }}>
            {/* أجنحة بكسل ممتدة */}
            <path d="M0 3h4v4H0V3zm12 0h4v4h-4V3z" fill="#1E1B4B" />
            {/* هيكل التنين المربع الضخم */}
            <path d="M2 4h12v11H2V4z" fill={color} />
            {/* قشور بكسل بلون أفتح في الجسم */}
            <path d="M4 5h2v1H4V5zm6 0h2v1h-2V5zm-3 3h2v1H7V8z" fill="rgba(255,255,255,0.15)" />
            {/* عيون حمراء متوهجة مدمرة */}
            <path d="M3 7h3v3H3V7zm7 0h3v3h-3V7z" fill="#EF4444" />
            <path d="M4 8h1v1H4V8zm7 0h1v1h-1V8z" fill="#FBBF24" /> {/* بؤبؤ العين ناري */}
            {/* فم بكسل مليء بالأسنان الحادة الفتاكة */}
            <path d="M4 12h8v2H4v-2z" fill="#111827" />
            <path d="M5 12h1v1H5v-1zm2 0h1v1H7v-1zm2 0h1v1H9v-1zm2 0h1v1h-1v-1z" fill="#FFFFFF" />
          </svg>
        );
    }
  };

  // 3. رسم تضاريس بكسل بالكامل (جبال مكعبة، تلال مسطحة، ونهر بكسل في الأفق)
  const renderPixelScenery = () => (
    <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden bg-[#0c1020]">
      {/* سماء بكسل مرصعة بالنجوم المربعة */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_2px,transparent_2px)] [background-size:20px_20px]" />
      
      {/* جبال بكسل متدرجة مكعبة في الخلفية (Pixel Mountains) */}
      <svg className="absolute bottom-16 left-0 w-full h-20 text-[#1e1e38]" viewBox="0 0 40 10" preserveAspectRatio="none" style={{ shapeRendering: 'crispEdges' }}>
        <path d="M0 10 V5 H4 V3 H8 V1 H14 V3 H18 V5 H24 V2 H30 V4 H34 V6 H40 V10 Z" fill="currentColor" />
      </svg>
      
      {/* جبال بكسل أمامية بلون أغمق */}
      <svg className="absolute bottom-12 left-0 w-full h-16 text-[#141424]" viewBox="0 0 40 10" preserveAspectRatio="none" style={{ shapeRendering: 'crispEdges' }}>
        <path d="M0 10 V6 H6 V4 H12 V2 H16 V5 H22 V3 H28 V5 H35 V7 H40 L40 10 Z" fill="currentColor" />
      </svg>

      {/* الأرض العشبية المسطحة من البكسل (Pixel Meadow) */}
      <div className="absolute bottom-0 inset-x-0 h-14 bg-[#0a2e1d] border-t-4 border-[#155e37]">
        {/* النهر البكسلي الأزرق المتعرج في المنتصف عمودياً */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-16 bg-[#1d4ed8]">
          {/* حواف وتعرجات النهر المربعة */}
          <div className="absolute top-0 left-0 w-4 h-4 bg-[#0a2e1d]" />
          <div className="absolute bottom-4 right-0 w-4 h-6 bg-[#0a2e1d]" />
          <div className="absolute top-6 right-0 w-2 h-4 bg-[#1e40af]" /> {/* زبد الماء بكسل */}
        </div>
      </div>
    </div>
  );

  return (
    <div className="col-span-2 p-4 bg-sys-light-surface dark:bg-sys-dark-surface rounded-m3-lg border border-gray-200/40 dark:border-gray-800/40 shadow-xs flex flex-col gap-3 relative">
      
      {/* الترويسة وأزرار المودال */}
      <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800/40 pb-2 z-10">
        <h3 className="text-sm font-bold flex items-center gap-2 text-sys-light-primary dark:text-sys-dark-primary font-mono">
          <Swords size={16} />
          <span>ميدان التحدي الأسبوعي — BIT-8 RPG</span>
        </h3>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-sys-light-primary/10 dark:bg-sys-dark-primary/10 text-sys-light-primary dark:text-sys-dark-primary text-xs font-semibold rounded-m3-md hover:bg-sys-light-primary/20 dark:hover:bg-sys-dark-primary/20 transition-all cursor-pointer font-sans"
        >
          <Settings size={13} />
          <span>إدارة وحوش المهام ({tasks.length})</span>
        </button>
      </div>

      {/* ساحة المعركة الحادة بنظام الـ Pixel Art الكامل */}
      <div className="w-full min-h-[280px] rounded-m3-md p-6 relative flex flex-col items-center justify-between border-4 border-[#030712] shadow-2xl overflow-hidden">
        
        {/* تضاريس جبال وأنهار الخلفية بنمط البيكسل */}
        {renderPixelScenery()}
        
        {/* شبكة الوحوش البكسلية المكدسة في الأعلى المقابلة لك */}
        <div className="z-10 w-full flex-1 flex items-center justify-center pt-2">
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center text-center text-emerald-400 gap-1 bg-[#030712]/90 p-4 border-2 border-emerald-500 rounded-m3-md shadow-2xl backdrop-blur-md">
              <Trophy size={24} className="animate-bounce" />
              <span className="text-xs font-mono">STAGE CLEARED! PERFECT VICTORY</span>
            </div>
          ) : (
            /* الوحوش تتراص وتتكدس في شبكة مصفوفة بشكل رائع وثلاثي الأبعاد وموزعة الألوان */
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 max-h-[160px] overflow-y-auto p-2 w-full justify-items-center items-end">
              {tasks.map((task) => (
                <div key={task.id} className="flex flex-col items-center group relative cursor-help transition-transform hover:scale-110">
                  {renderPixelMonster(task)}
                  <span className="absolute -top-7 bg-[#030712] border border-gray-800 text-white text-[9px] px-2 py-0.5 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-30 pointer-events-none whitespace-nowrap font-sans">
                    {task.title}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* خط التماس والاشتباك المعلق */}
        {tasks.length > 0 && (
          <div className="z-10 my-1 text-amber-400 opacity-80 animate-pulse bg-[#030712]/80 px-2 py-0.5 rounded border border-amber-500/30 text-[10px] font-mono">
            VS
          </div>
        )}

        {/* البطل في الأسفل في مواجهة عمق الميدان وظهره لك */}
        <div className="z-10 shrink-0 mt-auto flex flex-col items-center">
          {renderPixelHeroBack()}
          <span className="text-[9px] font-mono bg-[#030712] text-blue-400 px-2 py-0.5 rounded border border-blue-500/40 shadow-md mt-1">HERO (YOU)</span>
        </div>

      </div>

      {/* ==================== الـ Modal لإدارة المهام والوحوش ==================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-md bg-sys-light-surface dark:bg-sys-dark-surface border border-gray-200/50 dark:border-gray-800/50 rounded-m3-lg p-5 shadow-2xl flex flex-col gap-4" dir="rtl">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800/40 pb-2">
              <h4 className="text-sm font-bold flex items-center gap-2 text-gray-800 dark:text-gray-100 font-sans">
                <ShieldAlert size={16} className="text-sys-light-primary" />
                <span>غرفة التحكم واستدعاء وحوش الأسبوع</span>
              </h4>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={addTask} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="اكتب اسم المهمة الأسبوعية الجديدة..."
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
                className="w-full font-sans text-xs px-3 py-2 bg-sys-light-background dark:bg-sys-dark-background text-gray-800 dark:text-gray-100 rounded-m3-md border border-gray-200/50 dark:border-gray-700/30 focus:outline-hidden"
              />
              <div className="flex gap-2 font-sans">
                {(['easy', 'medium', 'hard'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficulty(level)}
                    className={`flex-1 text-[11px] py-1.5 rounded-m3-sm border cursor-pointer transition-all ${
                      difficulty === level
                        ? level === 'easy' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500' :
                          level === 'medium' ? 'bg-amber-500/10 text-amber-600 border-amber-500' :
                          'bg-rose-500/10 text-rose-600 border-rose-500 font-bold'
                        : 'bg-transparent text-gray-400 border-gray-100 dark:border-gray-800'
                    }`}
                  >
                    {level === 'easy' ? 'Slime بكسل' : level === 'medium' ? 'Demon بكسل' : 'Dragon زعيم'}
                  </button>
                ))}
              </div>
              <button type="submit" className="w-full py-2 bg-sys-light-primary dark:bg-sys-dark-primary text-sys-light-on-primary dark:text-sys-dark-on-primary font-medium text-xs rounded-m3-md cursor-pointer hover:opacity-90 flex items-center justify-center gap-1 font-sans">
                <Plus size={14} /> استدعاء الوحش إلى ميدان البيكسل
              </button>
            </form>

            <div className="flex-1 overflow-y-auto max-h-[180px] space-y-1.5 border-t border-gray-100 dark:border-gray-800/40 pt-3">
              {tasks.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-4">الميدان نظيف وآمن.</p>
              ) : (
                tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-2 bg-sys-light-background dark:bg-sys-dark-background border border-gray-100 dark:border-gray-800/20 rounded-m3-md">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2.5 h-2.5 shrink-0 rounded-sm" style={{ backgroundColor: getMonsterColorBySeed(task.id, task.difficulty) }} />
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-200 truncate pr-1 font-sans">{task.title}</p>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-gray-400 hover:text-rose-500 p-1 rounded-m3-sm transition-colors cursor-pointer"
                      title="هزيمة وإلغاء الوحش"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}