const postcss = require('postcss')
const postcssJs = require('postcss-js')
const path = require('path')
const fs = require('fs')

fs.readFile(
  path.join(__dirname, './../node_modules/primevue/resources/themes/vela-orange/theme.css'),
  'utf-8',
  (err, data) => {
    if (err) {
      return console.error(err)
    }
    const root = postcss.parse(data.replace(/@charset "UTF-8";/gi, ''))
    const themeObject = postcssJs.objectify(root)
    const newTheme = replaceContent(themeObject)
    postcss()
      .process(newTheme, { parser: postcssJs })
      .then((result) => {
        fs.writeFile(
          path.join(__dirname, './../src/assets/css/yoho/theme.css'),
          result.css,
          () => true
        )
      })
  }
)
/**
 * PrimeVue - Theme - Vela-orange
 *
 * @Primary #ffd54f
 * Hover: #ffcd2e darken 10%
 * Active: #ffc50c darken 20%
 * Focus： #ffe284 lighten 16%
 *
 * @Secondary #78909C
 * Hover: #69838f darken 10%
 * Active: #5d747f darken 20%
 * Focus: #a1b1ba lighten 26% #A1B2BA
 *
 * 有背景色的文字色 #121212
 */
const updateValues = [
  // 块级背景
  { from: /#1f2d40/gi, to: 'var(--dark-30)' },
  // 边框
  { from: /#304562/gi, to: 'var(--gray-30)' },
  // primary
  { from: /#ffd54f/gi, to: 'var(--primary)' },
  { from: /#ffcd2e/gi, to: 'var(--primary-hover)' },
  { from: /#ffc50c/gi, to: 'var(--primary-active)' },
  { from: /#ffe284/gi, to: 'var(--primary-focus)' },
  // secondary
  { from: /#78909C/gi, to: 'var(--secondary)' },
  { from: /#69838f/gi, to: 'var(--secondary-hover)' },
  { from: /#5d747f/gi, to: 'var(--secondary-active)' },
  { from: /#a1b1ba/gi, to: 'var(--secondary-focus)' },
  // 其他颜色
  { from: /#121212/gi, to: 'var(--dark-70)' },
  { from: /#ffffff/gi, to: 'var(--gray-30)' },
  { from: /#212529/gi, to: 'var(--dark-40)' },
  { from: /rgba(255, 213, 79, 0.16)/gi, to: 'var(--dark-30)' },
  
]
const updatePropValue = [
  { prop: 'color', from: 'rgba(255, 255, 255, 0.87)', to: 'var(--gray-130)' },
  { prop: 'color', from: 'rgba(255, 255, 255, 0.6)', to: 'var(--gray-150)' },
  { prop: 'borderRadius', from: '3px', to: '.375rem' },
  { prop: 'borderBottomRightRadius', from: '3px', to: '.375rem' },
  { prop: 'borderBottomLeftRadius', from: '3px', to: '.375rem' },
  { prop: 'borderTopRightRadius', from: '3px', to: '.375rem' },
  { prop: 'borderTopLeftRadius', from: '3px', to: '.375rem' },
]
const removeProps = [
  { class: '.p-card', props: ['boxShadow'] },
  { class: '.p-card .p-card-subtitle', props: ['fontWeight'] },
  { class: '.p-breadcrumb', props: ['background', 'border', 'borderRadius'] },
  { class: '.p-toolbar', props: ['background', 'border', 'borderRadius'] },
  { class: '.p-breadcrumb ul li .p-menuitem-link:focus', props: ['boxShadow'] },
]
const createOrUpdateProps = [
  { class: '.p-breadcrumb', props: { padding: '0 1rem' } },
  { class: '.p-avatar', props: { overflow: 'hidden' } },
  { class: '.p-inputtext', props: { border: '1px solid var(--dark-40)' } },
]

function replaceContent(obj) {
  delete obj[':root']
  delete obj['*']

  // 移除 属性
  removeProps.forEach((e) => {
    e.props.forEach((k) => delete obj[e.class][k])
  })

  Object.keys(obj).forEach((key) => {
    for (let prop in obj[key]) {
      // 移除字体
      if (prop === 'fontFamily' && key.startsWith('.p-')) delete obj[key][prop]

      // 修改属性
      const modifyFound = updatePropValue.filter(
        (e) => prop === e.prop && obj[key][prop] === e.from
      )
      modifyFound.forEach((e) => (obj[key][prop] = e.to))

      // 替换值
      if (typeof obj[key][prop] === 'string') {
        const valuesFound = updateValues.filter((e) => obj[key][prop].search(e.from) > -1)
        valuesFound.forEach((e) => (obj[key][prop] = obj[key][prop].replace(e.from, e.to)))
        // obj[key][prop] = obj[key][prop].replace()
      }
    }
    // else replaceContent(obj[key], value, newValue)
  })

  createOrUpdateProps.forEach((e) =>
    Object.keys(e.props).forEach((p) => (obj[e.class][p] = e.props[p]))
  )
  return obj
}
