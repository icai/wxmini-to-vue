/*
 * @Author: bucai
 * @Date: 2021-02-04 10:40:39
 * @LastEditors: bucai<1450941858@qq.com>
 * @LastEditTime: 2021-11-03 16:57:53
 * @Description:
 */
const fs = require('fs')
const path = require('path')

/**
 * 遍历目录并返回目录列表
 * @param {string} entry 开始的目录
 * @returns {Array<string>}
 */
const traverseDir = (entry) => {
  const dirList = [entry]
  const list = fs.readdirSync(entry)
  list.forEach(name => {
    const _path = path.join(entry, name)
    const stat = fs.statSync(_path)
    if (stat.isDirectory()) {
      dirList.push(...traverseDir(_path))
    }
  });
  return dirList;
};

exports.traverseDir = traverseDir;

/**
 * 创建目录
 * @param {string} dirname 目录名
 * @returns {boolean} 是否创建成功
 */
function mkdirSync (dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}
exports.mkdirSync = mkdirSync;