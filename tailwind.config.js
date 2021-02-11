module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,css}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    boxShadow: {
      DEFAULT: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12),0 1px 5px 0 rgba(0,0,0,.20)',
    },
    extend: {
      flex: {
        256: '0 0 256px',
        80: '0 0 80px',
      },
      textColor: {
        primary: 'var(--text-color)',
      },
      backgroundColor: {
        app: 'var(--app-background)',
        component: 'var(--component-background)',
        'component-header': 'var(--component-header-background)',
        'component-body': 'var(--component-body-background)',
        'component-footer': 'var(--component-footer-background)',
      },
      borderColor: {
        split: 'var(--border-split)',
      },
      transitionProperty: {
        width: 'width',
        spacing: 'margin, padding',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
