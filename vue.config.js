const { resolve } = require("path")

// 该入口是用于打包组件展示项目
module.exports = {
  chainWebpack:
    config => {
      config.externals({ "vue": "Vue" })
      config.resolve.alias.set("packages", resolve("packages"))
    },
  configureWebpack: { devtool: "source-map" },
  publicPath: "/components",
  // 构建时开启多进程处理 babel 编译
  parallel: require("os").cpus().length > 1
}
