import Vue from "vue"
import App from "./App.vue"
import eCharts from "echarts"
import components from "./../packages"

Vue.prototype.$eCharts = eCharts;
Vue.use(components)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount("#app")
