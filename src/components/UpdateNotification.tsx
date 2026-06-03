// src/components/UpdateNotification.tsx
import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react'
import { RefreshCw} from 'lucide-react';

export default function UpdateNotification(): React.JSX.Element | null {
  // استخدام خطاف PWA لاكتشاف النسخ الجديدة
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ', r);
    },
    onRegisterError(error) {
      console.error('SW Registration error: ', error);
    },
  });

  // إذا لم يكن هناك تحديث جديد، لا تظهر شيئاً
  if (!needRefresh) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-50 
                    p-4 bg-sys-light-surface dark:bg-sys-dark-surface 
                    border-2 border-sys-light-primary/20 dark:border-sys-dark-primary/20 
                    rounded-m3-lg shadow-xl flex flex-col gap-3 animate-fade-in" dir="rtl">
      
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-m3-md bg-sys-light-primary/10 text-sys-light-primary dark:text-sys-dark-primary">
          <RefreshCw size={20} className="animate-spin-slow" />
        </div>
        <div>
          <h4 className="text-sm font-bold">يتوفر تحديث جديد!</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            قمت بإجراء بعض التحسينات، يرجى تحديث التطبيق للحصول على النسخة الأخيرة.
          </p>
        </div>
      </div>

      {/* أزرار تفاعلية بحواف M3 */}
      <div className="flex justify-end gap-2 text-xs font-medium">
        <button 
          onClick={() => setNeedRefresh(false)}
          className="px-3 py-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-m3-full transition"
        >
          تجاهل
        </button>
        <button 
          onClick={() => updateServiceWorker(true)}
          className="px-4 py-2 bg-sys-light-primary dark:bg-sys-dark-primary text-sys-light-on-primary dark:text-sys-dark-on-primary rounded-m3-full shadow-sm hover:opacity-90 transition"
        >
          تحديث الآن
        </button>
      </div>
    </div>
  );
}