/*
 * @Author: bucai<1450941858@qq.com>
 * @Date: 2021-11-03 17:21:48
 * @LastEditors: bucai<1450941858@qq.com>
 * @LastEditTime: 2021-11-03 17:21:48
 * @Description: 
 */
const fs = require('fs');
const path = require('path');

/**
 * 读取微信组件
 * @param {string} dir 入口目录
 */
 function readWxComponents (dir) {
  const stat = fs.statSync(dir)
  if (!stat.isDirectory()) throw new Error("该路径错误或不存在")

  const fileList = fs.readdirSync(dir);

  const componentNameList = fileList
    .filter(item => /\.wxml$/.test(item))
    .map(item => item.replace('.wxml', ''));

  return componentNameList.map(name => {
    // 检测 wxml
    // 检测 wxss
    // 检测 wxjs
    const [wxml, wxss, wxjs] = ['wxml', 'wxss', 'js'].map(type => {
      const filePath = path.join(dir, name + '.' + type);
      const stat = fs.statSync(filePath)
      if (!stat.isFile()) return null;
      const code = fs.readFileSync(filePath).toString('utf-8')
      return code
    });
    return {
      wxml,
      wxss,
      wxjs,
      name
    };
  }).filter(({ wxml }) => wxml);
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
  readWxComponents,
  combination
}