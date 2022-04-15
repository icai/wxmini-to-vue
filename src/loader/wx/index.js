/*
 * @Author: bucai
 * @Date: 2021-02-04 15:05:58
 * @LastEditors: bucai<1450941858@qq.com>
 * @LastEditTime: 2021-11-03 17:56:23
 * @Description:
 */
const beautify = require('js-beautify');
const { readWxComponents, combination } = require('./utils');

const wxjs = require('./wxjs')
const wxml = require('./wxml')
const wxss = require('./wxss')

const transform = {
  wxjs,
  wxml,
  wxss
};

/**
 * 小程序转换
 * @param {string} dir 组件目录
 * @param {object} options 配置
 * @returns {{name: string; code:string;}[]}
 */
module.exports = function (dir, options) {
  const components = readWxComponents(dir)
  return components.map(({ wxml, wxjs, wxss, name }) => {
    const outputTemplate = transform.wxml(wxml || '', options);
    const outputJs = transform.wxjs(wxjs || '', options);
    const outputCss = transform.wxss(wxss || '', options);
    // TODO: 额外加一层避免多层情况，后续再改动
    const html = beautify.html(`<div>${outputTemplate}</div>`);
    const js = beautify.js(outputJs);
    const css = beautify.css(outputCss);
    const code = combination(html, js, css);
    return {
      name,
      code,
      other: {
        wxml, wxjs, wxss
      }
    };
  });
}

module.exports.transform = transform;