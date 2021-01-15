module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        primary: 'var(--text-color)',
      },
      backgroundColor: {
        app: 'var(--app-background)',
        component: 'var(--component-background)',
      },
      transitionProperty: {
        width: 'width',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
