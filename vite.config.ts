import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

const repoName = '';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      injectRegister: 'inline', // تضمين كود التسجيل مباشرة داخل الـ HTML لضمان قراءته
      // 2. ضبط المسارات لـ GitHub Pages
      base: repoName,
      manifest: {
        name: 'الموقع الشخصي - نظام التصميم الخاص بي',
        short_name: 'فؤاد المهاوش',
        description: 'موقع شخصي يعرض أعمالي ومشاريعي باستخدام نظام التصميم الخاص بي.',
        theme_color: '#6750A4', // نفس اللون الأساسي (Primary)
        background_color: '#FEF7FF',
        display: 'standalone',
        orientation: 'portrait',
        dir: 'rtl', // لدعم اللغة العربية بشكل صحيح كتطبيق
        icons: [
          {
            src: `${repoName}android-chrome-192x192.png`,
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: `${repoName}android-chrome-512x512.png`,
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      // 3. إعدادات العمل بدون إنترنت (Workbox)
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'], // الملفات التي سيتم حفظها في الكاش
        navigateFallback: `${repoName}index.html`, // لضمان عمل الـ Routing عند تحديث الصفحة

        skipWaiting: false, // نتركها false لأننا نستخدم prompt، ولكن سنفعلها عبر الكود
        clientsClaim: true, // نريد أن يسيطر الـ Service Worker على كل الـ Clients فور التثبيت
      }
    }),
    tailwindcss(),
  ],
})
