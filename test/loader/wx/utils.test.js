/*
 * @Author: bucai<1450941858@qq.com>
 * @Date: 2021-11-03 17:20:53
 * @LastEditors: bucai<1450941858@qq.com>
 * @LastEditTime: 2021-11-03 17:35:21
 * @Description: 
 */
const { resolve } = require('path');
const utils = require('../../../src/loader/wx/utils')

describe('loader/wx/wxjs', () => {
  const mockPath = resolve(__dirname, '../../mock');

  test('检测 readWxComponents', () => {
    const list = utils.readWxComponents(resolve(mockPath, 'branch'));

    const oneComponent = list.find(item => item.name === 'branch');

    expect(list.length).toBe(1)
    expect(oneComponent).not.toBeUndefined()
    expect(oneComponent.name).toBe('branch')
    expect(oneComponent.wxml).not.toBeUndefined()
  });

  test('combination', () => {
    const text = utils.combination("mock-template", "mock-js", "mock-css");
    
    expect(text).toMatch(/mock-template/)
    expect(text).toMatch(/mock-js/)
    expect(text).toMatch(/mock-css/)
  });
});