/*
 * @Author: bucai
 * @Date: 2021-02-04 15:05:58
 * @LastEditors: bucai<1450941858@qq.com>
 * @LastEditTime: 2021-11-03 17:56:23
 * @Description:
 */
const beautify = require('js-beautify');
const { readMyComponents, combination } = require('./utils');

const myjs = require('./myjs')
const axml = require('./axml')
const acss = require('./acss')

const transform = {
  myjs,
  axml,
  acss
};

/**
 * 小程序转换
 * @param {string} dir 组件目录
 * @param {object} options 配置
 * @returns {{name: string; code:string;}[]}
 */
module.exports = function (dir, options) {
  const components = readMyComponents(dir)
  return components.map(({ axml, myjs, acss, name }) => {
    const outputTemplate = transform.axml(axml || '', options);
    const outputJs = transform.myjs(myjs || '', options);
    const outputCss = transform.acss(acss || '', options);
    // TODO: 额外加一层避免多层情况，后续再改动
    const html = beautify.html(`<div>${outputTemplate}</div>`);
    const js = beautify.js(outputJs);
    const css = beautify.css(outputCss);
    const code = combination(html, js, css);
    return {
      name,
      code,
      other: {
        axml, myjs, acss
      }
    };
  });
}

module.exports.transform = transform;