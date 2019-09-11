const path = require("path");
const bodyParser = require("body-parser"); // post参数转换

const port = 7070;
const title = "vue最佳实践";

function resolve(dir) {
  // 拼接当前文件所在目录和dir
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    port,
    proxy: {
      // 代理 /dev-api/user/login 到 http://127.0.0.1:3000/user/login
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:3000/`,
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: "" // /dev-api/user/login  => /user/login
        }
      }
    },
    // before: app => {
    //   app.use(bodyParser.json()); // 处理post参数

    //   app.post("/dev-api/user/login", (req, res) => {
    //     const { username } = req.body;

    //     if (username === "admin" || username === "jerry") {
    //       res.json({
    //         code: 1,
    //         data: username,
    //       });
    //     } else {
    //       res.json({
    //         code: 10204,
    //         message: "用户名或密码错误",
    //       });
    //     }
    //   });

    //   app.get("/dev-api/user/info", (req, res) => {
    //     const auth = req.headers["authorization"];
    //     const roles = auth.split(" ")[1] === "admin" ? ["admin"] : ["editor"];
    //     res.json({
    //       code: 1,
    //       data: roles,
    //     });
    //   });
    // },
  },
  configureWebpack: {
    name: title,
  },
  chainWebpack(config) {
    // 1.修改svg规则，排除icons目录下的svg文件
    config.module.rule("svg").exclude.add(resolve("src/icons"));
    // 2.新增icons规则，仅打包icons目录下的svg文件
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" })
      .end();
  },
};
