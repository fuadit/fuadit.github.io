import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Compass } from 'lucide-react';

interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export default function PrayerTimesCard(): React.JSX.Element {
  const [city, setCity] = useState<string>(() => localStorage.getItem('user-prayer-city') || '');
  const [inputCity, setInputCity] = useState<string>('');
  const [prayers, setPrayers] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrayerTimes = async (cityName: string) => {
    if (!cityName.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(cityName)}&country=&method=4`
      );
      const data = await response.json();

      if (data.code !== 200 || !data.data || !data.data.timings) {
        throw new Error('المدينة غير موجودة');
      }

      const timings = data.data.timings;

      setPrayers({
        Fajr: timings.Fajr,
        Sunrise: timings.Sunrise,
        Dhuhr: timings.Dhuhr,
        Asr: timings.Asr,
        Maghrib: timings.Maghrib,
        Isha: timings.Isha,
      });

      localStorage.setItem('user-prayer-city', cityName);
      setCity(cityName);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء جلب الأوقات');
      setPrayers(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) fetchPrayerTimes(city);
  }, []);

  const prayerList = prayers ? [
    { name: 'الفجر', time: prayers.Fajr, isSun: false },
    { name: 'الشروق', time: prayers.Sunrise, isSun: true },
    { name: 'الظهر', time: prayers.Dhuhr, isSun: false },
    { name: 'العصر', time: prayers.Asr, isSun: false },
    { name: 'المغرب', time: prayers.Maghrib, isSun: false },
    { name: 'العشاء', time: prayers.Isha, isSun: false },
  ] : [];

  return (
    /* أضفنا col-span-2 هنا لتأخذ الحاوية السطر كاملاً داخل الـ Grid */
    <div className="col-span-2 p-3 bg-sys-light-surface dark:bg-sys-dark-surface rounded-m3-lg border border-gray-200/30 dark:border-gray-800/20 shadow-xs hover:border-sys-light-primary/20 dark:hover:border-sys-dark-primary/20 transition-all duration-300 flex flex-col justify-center w-full min-w-0">
      
      {!city || error ? (
        /* نموذج البحث وتحديد المدينة */
        <form onSubmit={(e) => { e.preventDefault(); fetchPrayerTimes(inputCity); }} className="flex items-center gap-1.5 w-full">
          <div className="relative flex-1 min-w-0">
            <MapPin size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="مواقيت الصلاة لمدينة..."
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
              className="w-full font-sans text-xs pr-6 pl-2 py-1.5 bg-sys-light-background dark:bg-sys-dark-background text-gray-800 dark:text-gray-100 rounded-m3-md border border-gray-200/50 dark:border-gray-700/30 focus:outline-hidden"
            />
          </div>
          <button type="submit" disabled={loading} className="p-1.5 bg-sys-light-primary dark:bg-sys-dark-primary text-sys-light-on-primary dark:text-sys-dark-on-primary rounded-m3-md cursor-pointer shrink-0 text-xs font-medium px-3">
            {loading ? 'جاري الجلب...' : 'بحث'}
          </button>
        </form>
      ) : (
        /* واجهة عرض مواقيت الصلاة الحالية بمساحة كاملة مريحة للعين */
        <div className="flex flex-col gap-2 w-full">
          
          {/* ترويسة الكارت */}
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800/40 pb-1.5">
            <div className="flex items-center gap-1.5 text-sys-light-primary dark:text-sys-dark-primary font-bold text-xs sm:text-sm">
              <Compass size={14} className="animate-spin-slow" />
              <span>مواقيت الصلاة في مدينة: <span className="text-gray-800 dark:text-gray-200">{city}</span></span>
              <button 
                onClick={() => setCity('')} 
                className="text-xs text-gray-400 hover:text-sys-light-primary dark:hover:text-sys-dark-primary mr-2 transition-colors cursor-pointer font-medium"
              >
                (تغيير المدينة)
              </button>
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-xs font-sans">
              <Clock size={12} />
              <span>التوقيت المحلي اليومي</span>
            </div>
          </div>

          {/* توزيع الصلوات الستة بشكل أفقي ممتد ومثالي عبر السطر الكامل */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-0.5">
            {prayerList.map((prayer, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col items-center justify-center p-2 rounded-m3-md text-center border transition-all duration-200 hover:scale-[1.02]
                  ${prayer.isSun 
                    ? 'bg-amber-500/5 dark:bg-amber-500/5 border-amber-500/20 dark:border-amber-500/20' 
                    : 'bg-sys-light-background dark:bg-sys-dark-background border-gray-100 dark:border-gray-800/40'
                  }`}
              >
                <span className={`text-xs font-semibold ${prayer.isSun ? 'text-amber-600 dark:text-amber-400' : 'text-gray-500 dark:text-gray-400'}`}>
                  {prayer.name}
                </span>
                <span className="text-sm font-mono font-bold text-gray-800 dark:text-gray-100 mt-1 direction-ltr">
                  {prayer.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}