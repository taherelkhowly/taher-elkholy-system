/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0a0a0a',     // أسود داكن خلفية
          card: '#141414',     // أسود كروت
          gold: '#d4af37',     // ذهبي رئيسي
          goldHover: '#f3e5ab',// ذهبي فاتح
          border: '#2a2415'   // حدود ذهبية خفيفة
        }
      }
    },
  },
  plugins: [],
}