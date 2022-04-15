const fs = require('fs');
const path = require('path');

/**
 * 读取支付宝组件
 * @param {string} dir 入口目录
 */
 function readMyComponents (dir) {
  const stat = fs.statSync(dir)
  if (!stat.isDirectory()) throw new Error("该路径错误或不存在")

  const fileList = fs.readdirSync(dir);

  const componentNameList = fileList
    .filter(item => /\.axml$/.test(item))
    .map(item => item.replace('.axml', ''));

  return componentNameList.map(name => {
    // 检测 axml
    // 检测 acss
    // 检测 myjs
    const [axml, acss, myjs] = ['axml', 'acss', 'js'].map(type => {
      const filePath = path.join(dir, name + '.' + type);
      const stat = fs.statSync(filePath)
      if (!stat.isFile()) return null;
      const code = fs.readFileSync(filePath).toString('utf-8')
      return code
    });
    return {
      axml,
      acss,
      myjs,
      name
    };
  }).filter(({ axml }) => axml);
};

/**
 * 组装
 * @param {string} template
 * @param {string} js
 * @param {string} css
 */
function combination (template, js, css) {
  const code = `<template>\n${template}\n</template>\n<script>\n${js}\n</script>\n<style lang="scss" scoped>\n${css}\n</style>\n`;
  return code;
}


module.exports = {
  readMyComponents,
  combination
}