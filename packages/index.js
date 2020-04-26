/**
 * 注册全局组件
 *
 * @param {*} Vue
 */
function registerComponents(Vue) {
  const requireComponent = require.context(
    // 其组件目录的相对路径
    "./components",
    // 是否查询其子目录
    true,
    // 匹配基础组件文件名的正则表达式
    /l-[A-Za-z\-]*\/index.js$/
  );
  requireComponent.keys().forEach(fileName => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName);
    const componentContext = componentConfig.default || componentConfig;
    Vue.use(componentContext);
  });
}

const install = function(Vue, opts = {}) {
  registerComponents(Vue);
};

export default {
  install
};
