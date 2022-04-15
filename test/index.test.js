/*
 * @Author: bucai
 * @Date: 2021-02-04 15:59:38
 * @LastEditors: bucai<1450941858@qq.com>
 * @LastEditTime: 2021-11-03 21:13:34
 * @Description: 
 */
const path = require('path');

const fs = require('fs');
const defaultConfig = require('../src/config/default');


describe('主程序测试', () => {
  const T = require('../src')

  const mockPath = path.resolve(__dirname, './mock');
  const outputPath = path.resolve(__dirname, './output');

  test('编译测试', async () => {
    const componentPath = path.resolve(outputPath, 'agreement/agreement.vue')

    const t = new T()
    await t.transform(mockPath, outputPath)
    const stat = fs.statSync(componentPath)

    const fileTime = new Date(stat.mtime);

    expect(stat.isFile()).toBe(true)
    // 上下浮动不超过二十秒中
    expect(fileTime.getTime() > (Date.now() - 15000) && fileTime.getTime() < (Date.now() + 15000)).toBe(true)

  });

  test('options', () => {
    const options = {
      mock: true,
      exclude: ['mock'],
      cssUnitScale: 4,
    }
    const t = new T('mock', options)
    const t2 = new T(options)

    expect(t.type).toBe('mock');
    expect(t2.type).toBe('wx');
    expect(t.options).not.toBeNull()
    expect(t.options).not.toBeUndefined()
    expect(t2.options).not.toBeNull()
    expect(t2.options).not.toBeUndefined()
    expect(t.options.cssUnit).toBe(defaultConfig.cssUnit)
    expect(t.options.exclude).toBe(options.exclude)
    expect(t.options.mock).toBe(options.mock)
    expect(t.options.cssUnitScale).toBe(options.cssUnitScale)
  });
});