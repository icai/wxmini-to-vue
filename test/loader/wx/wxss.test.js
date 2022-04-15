/*
 * @Author: bucai
 * @Date: 2021-02-04 17:24:29
 * @LastEditors: bucai<1450941858@qq.com>
 * @LastEditTime: 2021-11-03 15:17:48
 * @Description:
 */
const wxss = require('../../../src/loader/wx/wxss')

describe('loader/wx/wxss', () => {

  test('检测转换', () => {

    const code = wxss('view.t text image{ font-size: 12rpx; }')

    expect(typeof code).toBe('string')
    expect(/div/.test(code)).toBe(true)
    expect(/span/.test(code)).toBe(true)
    expect(/img/.test(code)).toBe(true)
    expect(/6px/.test(code)).toBe(true)

  });

});