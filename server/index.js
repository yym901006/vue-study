const express = require("express");
const Vue = require("vue");

// express实例
const app = express();

// 创建vue实例
const vm = new Vue({
  data: { count: 1 },
  template: `
        <div>{{count}}</div>
    `
});

// 创建渲染器
const renderer = require("vue-server-renderer").createRenderer();

// 服务端路由声明
app.get("*", async function(req, res) {
  try {
    const html = await renderer.renderToString(vm);
    res.send(html);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
    console.log('渲染服务器启动成功');
    
})