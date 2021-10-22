const path = require('path')
// 导入 wxmini-to-vue
const WTV = require('./src/index')
// 实例化

// @ts-ignore
const wtv = new WTV({ type: 'alipay' })

function pathResolve(url, dir = __dirname) {
 return path.resolve(dir, '../../MiniProjects', url);
}

// 入口路径
const entryPath = pathResolve('./todoApp')
// 存放位置
const outputPath = pathResolve('./out/todoApp')

console.log(entryPath, outputPath)
// 执行转换
wtv.transform(entryPath, outputPath)