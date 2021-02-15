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
const updateValues = [
  // 块级背景
  { from: /#1f2d40/gi, to: 'var(--bg-30)' },
  // 边框
  { from: /#304562/gi, to: 'var(--border-10)' },
  { from: /#78909C/gi, to: 'var(--secondary)' },
]
const updatePropValue = [
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
  // { class: '.p-panelmenu .p-panelmenu-header > a', props: ['fontWeight', 'background'] },
]
const createOrUpdateProps = [
  { class: '.p-card .p-card-subtitle', props: { color: 'var(--text-130)' } },
  { class: '.p-avatar', props: { overflow: 'hidden' } },
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
