/*
 * @Author: bucai
 * @Date: 2021-02-04 10:34:52
 * @LastEditors: bucai<1450941858@qq.com>
 * @LastEditTime: 2021-11-03 17:51:09
 * @Description:
 */
const fs = require('fs')
const path = require('path')
const { traverseDir, mkdirSync } = require("./utils/index");
const defaultConfig = require('./config/default');
const wxTransform = require('./loader/wx')
const myTransform = require('./loader/my')
module.exports = class {
  /**
   * @param {string|object} type 转换的类型 小程序为 wx 目前只有wx
   * @param {object} options 配置
   */
  constructor(type = 'wx', options = defaultConfig) {
    if (typeof type === 'object') {
      type = 'wx';
      options = type;
    }
    this.type = type;
    this.options = Object.assign({}, defaultConfig, options);
    this.loader = {
      wx: wxTransform,
      my: myTransform
    }[type];
  }

  /**
   * 转换
   * @param {string} entry 入口
   * @param {string} output 出口
   */
  transform (entry, output) {
    const list = this._getDirList(path.resolve(entry))

    const tasks = list.map(inputPath => {
      // loader 执行的
      const result = this.loader(inputPath, this.options);
      return Promise
        .resolve(result)
        .then(components => {
          if (!components) return;
          if (!Array.isArray(components)) {
            components = [components]
          }
          components.forEach(component => {
            const { code, name } = component;
            const baseUrl = path.join(output, inputPath.replace(entry, ''))
            // 同步创建目录
            mkdirSync(baseUrl);
            const outputPath = path.join(baseUrl, name + '.vue');
            // 写入文件
            this._toFile(outputPath, code)
          });
        });
    });
    return Promise.all(tasks)
  }

  /**
   * 写入文件
   * @param {string} path
   * @param {string} str
   */
  _toFile (path, str) {
    fs.writeFileSync(path, str);
  }

  /**
   * 获取目录列表
   * @param {string} entry 入口
   * @returns {Array<string>}
   */
  _getDirList (entry) {
    return traverseDir(entry)
      .filter(item => {
        return !(new RegExp(this.options.exclude.join('|')).test(item));
      });
  }
}