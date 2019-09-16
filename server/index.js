const express = require("express");
const Vue = require("vue");

// 创建express实例
const app = express();
// 创建渲染器函数
const renderer = require("vue-server-renderer").createRenderer();

// 声明路由监听
app.get("/:page", async (req, res) => {
  // 获取page参数
  // 创建vue实例
  const template = require("fs")
    .readFileSync("./tmpl/" + req.params.page + "-page.html")
    .toString();
  const page = new Vue({
    data: { foo: "foo" },
    template,
  });

  const html = await renderer.renderToString(page);
  res.send(html);
});

app.listen(3000, () => {
  console.log("渲染服务器启动成功！");
});
