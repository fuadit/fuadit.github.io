import React, { useState, useEffect } from 'react';
import { Sun, CloudSun, CloudRain, Snowflake, Wind, MapPin, Search, Cloud, Navigation, Droplets } from 'lucide-react';

interface WeatherData {
  temp: number;
  weatherCode: number; // حفظ الكود الأصلي للتحقق الديناميكي
  condition: string;
  windSpeed: number;
  windDir: number;   // زاوية اتجاه الرياح بالدرجات
  humidity: number;  // نسبة الرطوبة المئوية
}

// دالة مساعدة لترجمة أكواد الطقس (WMO) إلى نصوص، أيقونات، وألوان مخصصة
const getWeatherDetails = (code: number) => {
  switch (code) {
    case 0:
      return { text: 'مشمس / صافي', icon: Sun, color: 'text-amber-500' };
    case 1:
    case 2:
      return { text: 'غائم جزئياً', icon: CloudSun, color: 'text-gray-400 dark:text-gray-300' };
    case 3:
      return { text: 'غائم', icon: Cloud, color: 'text-gray-500' };
    case 45:
    case 48:
      return { text: 'ضبابي', icon: Wind, color: 'text-slate-400' };
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return { text: 'رذاذ مطر', icon: CloudRain, color: 'text-blue-300' };
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
      return { text: 'أمطار', icon: CloudRain, color: 'text-blue-500' };
    case 71:
    case 73:
    case 75:
    case 77:
      return { text: 'ثلوج', icon: Snowflake, color: 'text-sky-300' };
    case 80:
    case 81:
    case 82:
      return { text: 'زخات مطرية', icon: CloudRain, color: 'text-sky-500' };
    case 85:
    case 86:
      return { text: 'زخات ثلجية', icon: Snowflake, color: 'text-sky-400' };
    case 95:
    case 96:
    case 99:
      return { text: 'عواصف رعدية', icon: CloudRain, color: 'text-purple-500' };
    default:
      return { text: 'مستقر', icon: Sun, color: 'text-amber-500' };
  }
};

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

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code`
      );
      const weatherData = await weatherRes.json();
      if (!weatherData.current) throw new Error('خطأ بالبيانات');
      
      const current = weatherData.current;
      const weatherDetails = getWeatherDetails(current.weather_code);

      setWeather({
        temp: Math.round(current.temperature_2m),
        weatherCode: current.weather_code,
        condition: weatherDetails.text,
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

  // جلب تفاصيل الأيقونة الحالية ديناميكيًا بناءً على البيانات المخزنة
  const { icon: WeatherIcon, color: iconColor } = weather 
    ? getWeatherDetails(weather.weatherCode) 
    : { icon: Sun, color: 'text-amber-500' };

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
          {/* الجانب الأيمن: تفاصيل المدينة والأيقونة الديناميكية */}
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            <div className="flex items-center justify-center bg-sys-light-background dark:bg-sys-dark-background p-1 sm:p-1.5 rounded-m3-md border border-gray-200/20 dark:border-gray-700/30 shrink-0">
              <WeatherIcon className={iconColor} size={16} />
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

          {/* الجانب الأيسر: الحرارة والمؤشرات الفرعية */}
          {weather && (
            <div className="flex flex-col items-end shrink-0 pl-0.5 min-w-0">
              {/* درجة الحرارة الحالية */}
              <div className="font-mono text-left direction-ltr leading-none mb-1">
                <span className="text-base sm:text-xl font-black text-sys-light-primary dark:text-sys-dark-primary tracking-tighter">{weather.temp}°C</span>
              </div>
              
              {/* شريط المؤشرات المصغر */}
              <div className="flex items-center gap-1.5 text-[8px] sm:text-[9px] text-gray-400 dark:text-gray-500 font-sans leading-none">
                {/* مؤشر الرطوبة */}
                <span className="flex items-center gap-0.5">
                  <Droplets size={8} className="text-sky-400" />
                  {weather.humidity}%
                </span>
                <span className="text-gray-300 dark:text-gray-700">|</span>
                {/* مؤشر الرياح */}
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