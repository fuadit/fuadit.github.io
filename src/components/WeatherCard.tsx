import React, { useState, useEffect } from 'react';
import { Sun, CloudSun, CloudRain, Snowflake, Wind, MapPin, Search, Cloud, Navigation, Droplets } from 'lucide-react';

interface WeatherData {
  temp: number;
  condition: string;
  windSpeed: number;
  windDir: number;   // زاوية اتجاه الرياح بالدرجات
  humidity: number;  // نسبة الرطوبة المئوية
}

export default function WeatherCard(): React.JSX.Element {
  const [city, setCity] = useState<string>(() => localStorage.getItem('user-city') || '');
  const [inputCity, setInputCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (cityName: string) => {
    if (!cityName.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=ar`);
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) throw new Error('غير موجودة');
      const { latitude, longitude, name: formattedName } = geoData.results[0];

      // تحديث طلب الـ API لجلب الرطوبة واتجاه الرياح بدقة مع الرابط العصري المحدث لـ Open-Meteo
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code`
      );
      const weatherData = await weatherRes.json();
      if (!weatherData.current) throw new Error('خطأ بالبيانات');
      
      const current = weatherData.current;

      setWeather({
        temp: Math.round(current.temperature_2m),
        condition: current.weather_code === 0 ? 'مشمس' : [1,2,3].includes(current.weather_code) ? 'غائم جزئياً' : 'مستقر',
        windSpeed: Math.round(current.wind_speed_10m),
        windDir: current.wind_direction_10m,
        humidity: current.relative_humidity_2m
      });
      
      localStorage.setItem('user-city', formattedName);
      setCity(formattedName);
    } catch (err: any) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (city) fetchWeather(city); }, []);

  return (
    <div className="p-2.5 sm:p-3.5 bg-sys-light-surface dark:bg-sys-dark-surface rounded-m3-lg border border-transparent dark:border-gray-800/30 shadow-xs hover:border-sys-light-primary/20 dark:hover:border-sys-dark-primary/20 transition-all duration-300 flex flex-col justify-center h-full w-full min-w-0">
      {!city || error ? (
        <form onSubmit={(e) => { e.preventDefault(); fetchWeather(inputCity); }} className="flex items-center gap-1.5 w-full">
          <div className="relative flex-1 min-w-0">
            <MapPin size={10} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="مدينتك..."
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
              className="w-full font-sans text-[11px] pr-5 pl-1 py-1 bg-sys-light-background dark:bg-sys-dark-background text-gray-800 dark:text-gray-100 rounded-m3-md border border-gray-200/50 dark:border-gray-700/30 focus:outline-hidden text-ellipsis"
            />
          </div>
          <button type="submit" disabled={loading} className="p-1 bg-sys-light-primary dark:bg-sys-dark-primary text-sys-light-on-primary dark:text-sys-dark-on-primary rounded-m3-md cursor-pointer shrink-0">
            <Search size={11} />
          </button>
        </form>
      ) : (
        <div className="flex items-center justify-between gap-1 sm:gap-2 group w-full min-w-0">
          {/* الجانب الأيمن: تفاصيل المدينة والأيقونة الحالية */}
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            <div className="flex items-center justify-center bg-sys-light-background dark:bg-sys-dark-background p-1 sm:p-1.5 rounded-m3-md border border-gray-200/20 dark:border-gray-700/30 shrink-0">
              <Sun className="text-amber-500" size={16} />
            </div>
            <div className="flex flex-col items-start justify-center min-w-0 flex-1">
              <span className="font-sans text-[11px] sm:text-xs font-bold text-gray-800 dark:text-gray-100 leading-tight flex items-center gap-1 truncate w-full">
                <span className="truncate">{city}</span>
                <button onClick={() => setCity('')} className="text-[9px] text-sys-light-primary dark:text-sys-dark-primary opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shrink-0">(تعديل)</button>
              </span>
              <span className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 font-sans truncate w-full">
                {weather?.condition || 'جاري...'}
              </span>
            </div>
          </div>

          {/* الجانب الأيسر المطور: الحرارة في سطر والبيانات الفرعية في سطر أسفلها بشكل مكدس ومحمي هندسياً */}
          {weather && (
            <div className="flex flex-col items-end shrink-0 pl-0.5 min-w-0">
              {/* درجة الحرارة الحالية */}
              <div className="font-mono text-left direction-ltr leading-none mb-1">
                <span className="text-base sm:text-xl font-black text-sys-light-primary dark:text-sys-dark-primary tracking-tighter">{weather.temp}°C</span>
              </div>
              
              {/* شريط المؤشرات المصغر الموفر للمساحة */}
              <div className="flex items-center gap-1.5 text-[8px] sm:text-[9px] text-gray-400 dark:text-gray-500 font-sans leading-none">
                {/* مؤشر الرطوبة الجديد */}
                <span className="flex items-center gap-0.5">
                  <Droplets size={8} className="text-sky-400" />
                  {weather.humidity}%
                </span>
                <span className="text-gray-300 dark:text-gray-700">|</span>
                {/* مؤشر الرياح مع تدوير سهم الاتجاه تلقائياً */}
                <span className="flex items-center gap-0.5">
                  <Wind size={8} />
                  <span>{weather.windSpeed}</span>
                  <Navigation 
                    size={7} 
                    className="text-sys-light-primary fill-sys-light-primary dark:text-sys-dark-primary dark:fill-sys-dark-primary transition-transform duration-500"
                    style={{ transform: `rotate(${weather.windDir}deg)` }} 
                  />
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}