/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: '640px',   // الموبايل الكبير
      md: '768px',   // التابلت
      lg: '1024px',  // اللاب الصغير
      xl: '1280px',  // اللاب الكبير
      '2xl': '1536px', // الشاشات الكبيرة جدًا
    },
  },
  plugins: [],
}
