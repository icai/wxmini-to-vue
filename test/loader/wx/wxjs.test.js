/*
 * @Author: bucai
 * @Date: 2021-02-04 17:24:15
 * @LastEditors: bucai<1450941858@qq.com>
 * @LastEditTime: 2021-11-03 17:33:06
 * @Description:
 */
const wxjs = require('../../../src/loader/wx/wxjs')

describe('loader/wx/wxjs', () => {

  test('检测转换', () => {
    const outputCode1 = wxjs('Page({})')
    expect(typeof outputCode1).toBe('string')
    expect(/export default/.test(outputCode1)).toBe(true)
    const outputCode2 = wxjs('Page({onLoad(){ console.log(1) }})')
    expect(/created/.test(outputCode2)).toBe(true)
  });

});