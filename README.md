# 小程序页面（组件）转Vue组件

☄️一个微信, 支付宝小程序页面组件转为Vue组件的库

<p>
    <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/notbucai/wxmini-to-vue">
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/notbucai/wxmini-to-vue">
    <img alt="GitHub" src="https://img.shields.io/github/license/notbucai/wxmini-to-vue">
    <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/notbucai/wxmini-to-vue">
</p>


## 🤪 Installing

### NPM

```bash
$ npm install wxmini-to-vue
```
### Yarn

```bash
$ yarn add wxmini-to-vue
```

## 😵 Usage

```javascript
const path = require('path')
// 导入 wxmini-to-vue
const WTV = require('wxmini-to-vue')

// 配置项
const options = {
    // ... 参考 Options
}
// 实例化
const wtv = new WTV(options)
// 入口路径
const entryPath = path.resolve(__dirname, './path')
// 存放位置
const outputPath = path.resolve(__dirname, './o/path')
// 执行转换
wtv.transform(entryPath, outputPath)
// 执行完成后会在 [outputPath] 中存放
```
## 🌚 Options

> 注意：Options 暂时不做二级对象的合并只做替换，如果需要修改子对象请完整替换。
```javascript
{
  type: 'wx', // 微信 wx, 支付宝 alipay
  // 小程序css单位视图 如 12rpx 2倍图 后 转换成 6px
  cssUnitScale: 2,
  // 单位 如需 自适应 可改为 rem 但是后续大小可能需要额外处理
  cssUnit: 'px',
  // 排除的文件夹
  exclude: ['node_modules', 'npm', '.git', '.vscode', 'dist']
  // 元素映射
  elementMap: {
    text: 'span',
    view: 'div',
    image: 'img',
    block: 'template'
  },
  // api 映射
  wxApiMap: {
    showToast: '$toast',
    getStorageSync: '$store2', 
    setStorageSync: '$store2',
    showLoading: '$toast.loading',
    hideLoading: '$toast.clear',
    navigateTo: '$router.push',
    showModal: '$dialog',
    request: '$http'
  },
    // 支付宝
  myApiMap: {
    showToast: '$toast',
    getStorageSync: '$store2',
    setStorageSync: '$store2',
    showLoading: '$toast.loading',
    hideLoading: '$toast.clear',
    navigateTo: '$router.push',
    showModal: '$dialog',
    request: '$http'
  },
}
```

## Api

**wtv.transform(entryPath, outputPath)**

```javascript
// 入口路径
const entryPath = path.resolve(__dirname, './path')
// 存放位置
const outputPath = path.resolve(__dirname, './o/path')
// 执行转换
wtv.transform(entryPath, outputPath)
```

## 🥳 Introduce

### 小程序js -> script
```
babel code to ast

1. 将wxApi替换成 一些自定义的方式
    例如：
    wx.showToast => this.$toast
    wx.getStorageSync => this.$store2
    wx.setStorageSync => this.$store2

2. ..其他处理 暂不细说
```
### 小程序wxml -> template
```
使用 htmlparser2 将code 转换成 ast

1. 标签转换
2. 模版转换
```
### 小程序wxss -> style
```
使用 csstree 将code 转换成 ast

1. 标签转换
2. 单位转换
```
## License


 Apache License