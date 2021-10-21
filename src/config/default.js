/*
 * @Author: bucai
 * @Date: 2021-02-04 11:03:05
 * @LastEditors: bucai
 * @LastEditTime: 2021-02-04 13:53:56
 * @Description: 默认配置文件
 */

module.exports = {
  // 小程序css单位视图 如 12rpx 2倍图 后 转换成 6px
  type: 'wx', // 微信 wx, 支付宝 alipay

  cssUnitScale: 2,
  cssUnit: 'px',
  // 排除的文件夹
  exclude: ['node_modules', 'npm', '.git', '.vscode', 'dist'],
  // 元素映射
  elementMap: {
    text: 'span',
    view: 'div',
    image: 'img',
    block: 'template',
  },
  // 微信
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

  /**
   *
   * @param {string} name argsKeyName
   * @param {Node} node Node
   */
  wxApiArgsFun: (node) => {

  }
}