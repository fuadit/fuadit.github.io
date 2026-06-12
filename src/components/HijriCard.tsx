import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';

interface HijriDateState {
  day: string;
  month: string;
  year: string;
}

export default function HijriCard(): React.JSX.Element {
  const [hijriDate, setHijriDate] = useState<HijriDateState>({ day: '', month: '', year: '' });

  useEffect(() => {
    try {
      const formatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura-nu-latn', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      const parts = formatter.formatToParts(new Date());
      const day = parts.find(p => p.type === 'day')?.value || '';
      const month = parts.find(p => p.type === 'month')?.value || '';
      const year = parts.find(p => p.type === 'year')?.value.replace(/[^\d]/g, '') || '';
      setHijriDate({ day, month, year });
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (!hijriDate.day) return <div className="h-full bg-sys-light-surface/50 dark:bg-sys-dark-surface/50 animate-pulse rounded-m3-lg"></div>;

  return (
    <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3.5 bg-sys-light-surface dark:bg-sys-dark-surface rounded-m3-lg border border-transparent dark:border-gray-800/30 shadow-xs hover:border-sys-light-primary/20 dark:hover:border-sys-dark-primary/20 transition-all duration-300 group h-full w-full min-w-0">
      
      {/* صندوق اليوم - مرن ويصغر تدريجياً حسب الجوال */}
      <div className="flex flex-col items-center justify-center bg-sys-light-background dark:bg-sys-dark-background px-2 sm:px-3.5 py-1 rounded-m3-md border border-gray-200/20 dark:border-gray-700/30 shrink-0">
        <span className="font-sans text-lg sm:text-2xl font-black text-sys-light-primary dark:text-sys-dark-primary tracking-tight">
          {hijriDate.day}
        </span>
        <span className="text-[8px] sm:text-[9px] font-mono text-gray-400 dark:text-gray-500 uppercase font-bold">
          اليوم
        </span>
      </div>

      {/* مساحة النص مع حماية التداخل عبر min-w-0 و truncate */}
      <div className="flex flex-col items-start justify-center pr-0.5 min-w-0 flex-1">
        <span className="font-amiri text-base sm:text-xl font-bold text-gray-800 dark:text-gray-100 leading-none mb-1 transition-colors group-hover:text-sys-light-primary dark:group-hover:text-sys-dark-primary truncate w-full">
          {hijriDate.month}
        </span>
        <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 font-mono truncate w-full">
          <Calendar size={10} className="text-sys-light-primary/70 dark:text-sys-dark-primary/70 shrink-0" />
          <span className="truncate">{hijriDate.year} هـ</span>
        </div>
      </div>
    </div>
  );
}