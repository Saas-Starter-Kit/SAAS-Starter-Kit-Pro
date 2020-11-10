const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px'
      // => @media (min-width: 1260px) { ... }
    }
  },
  plugins: [
    require('@tailwindcss/ui')({
      layout: 'sidebar'
    })
  ]
};
