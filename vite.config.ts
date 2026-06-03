import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'الموقع الشخصي - نظام التصميم الخاص بي',
        short_name: 'موقعي',
        description: 'موقعي الشخصي ومعرض أعمالي ببنية Material Design',
        theme_color: '#6750A4', // نفس اللون الأساسي (Primary)
        background_color: '#FEF7FF',
        display: 'standalone',
        orientation: 'portrait',
        dir: 'rtl', // لدعم اللغة العربية بشكل صحيح كتطبيق
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    }),
    tailwindcss(),
  ],
})
