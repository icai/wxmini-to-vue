/*
 * @Author: bucai
 * @Date: 2021-02-04 17:24:25
 * @LastEditors: bucai<1450941858@qq.com>
 * @LastEditTime: 2021-11-03 15:17:44
 * @Description:
 */
const wxml = require('../../../src/loader/wx/wxml')

describe('loader/wx/wxml', () => {

  test('检测转换', () => {

    const code = wxml('<view><text>111</text></view>')
    expect(typeof code).toBe('string')
    expect( /div/.test(code)).toBe(true)
    expect( /span/.test(code)).toBe(true)

  });

});