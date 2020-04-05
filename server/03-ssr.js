// 传统web，网页内容在服务端渲染完成，一次性传输到浏览器。
// 属于服务端渲染，这里使用express演示传统页面渲染
const express = require('express')
const app = express()

// 获取绝对路径函数
const resolve = dir => require('path').resolve(__dirname, dir)

// 1.静态目录开放 dist/client
app.use(express.static(resolve('../dist/client'), { index: false }))

// 判断当前执行环境
const isDev = process.env.NODE_ENV === 'development'

// 2.获取bundleRenderer
const { createBundleRenderer } = require('vue-server-renderer')
let renderer

function createRenderer() {
  const bundle = resolve('../dist/server/vue-ssr-server-bundle.json')
  const renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    template: require('fs').readFileSync(resolve('../public/index.html'), 'utf-8'),
    clientManifest: require(resolve('../dist/client/vue-ssr-client-manifest.json'))
  })
  return renderer
}

// 如果当前执行环境是开发环境，则监控src目录变更
if (isDev) {
  const cp = require('child_process')
  // 创建一个bs实例用于将来浏览器同步操作
  const bs = require('browser-sync').create()
  // 导入chokidar监控src
  const chokidar = require('chokidar')
  const watcher = chokidar.watch('src/**/*.*')
  watcher.on('change', (path) => {
    console.log(path + '发生变化，正在重新编译，请稍后...');
    // 开启子进程执行构建命令
    cp.exec('npm run build', function (error, stdout) {
      if (error) {
        console.log(error.stack);
        return
      }
      // 构建信息输出到当前控制台
      console.log(stdout);
      console.log('编译完成，重新加载');

      // 浏览器同步
      bs.reload()
    })
  })

  // 创建一个代理
  bs.init({ proxy: 'http://localhost:3000' })
}

// 问题1不能交互
// 问题2不能同构开发
// 问题3路由处理问题
app.get('*', async function (req, res) {
  try {
    // 如果是开发模式或者还未存在renderer则创建
    if (isDev || !renderer) {
      renderer = createRenderer()
    }
    const html = await renderer.renderToString({
      url: req.url,
      title: 'ssr test'
    })

    // bundlerenderer.renderToString({url:req.url})
    // 将渲染html字符串返回给客户端
    res.send(html)
  } catch (error) {
    // 将错误信息返回给用户
    res.status(500).send('服务器渲染错误，请重试！')
  }

})

app.listen(3000)