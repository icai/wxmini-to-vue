/*
 * @Author: bucai
 * @Date: 2021-02-04 16:23:18
 * @LastEditors: bucai<1450941858@qq.com>
 * @LastEditTime: 2021-11-03 17:20:21
 * @Description:
 */
const { statSync } = require('fs');
const { resolve } = require('path');
const utils = require('../../src/utils')

describe('utils/index.js', () => {

  const mockPath = resolve(__dirname, '../mock');
  const outputPath = resolve(__dirname, '../output');

  test('检测 traverseDir', () => {

    const list = utils.traverseDir(mockPath)
    const containPath = resolve(mockPath, 'agreement')

    expect(list.length).toBeGreaterThan(1)
    expect(list).toContain(containPath)

  });

  test('检测mkdirSync', () => {
    const _path = resolve(outputPath, './test/test/111');
    utils.mkdirSync(_path);

    expect(() => {
      statSync(_path)
    }).not.toThrowError()

    expect(statSync(_path).isDirectory()).toBe(true)
  });

});