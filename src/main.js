import Vue from 'vue'
import App from './App.vue'
// 导入 router
import router from './router'
// 导入 router
import store from './store'
// 导入 normalize.css
import 'normalize.css'
// 导入flexible 动态设置rem大小
import 'amfe-flexible'
// 整合vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 字体图标
// import './style/font.less'
// 导入自己的预制样式
import './style/base.less'
// 导入全局过滤器
import './filters'

Vue.use(Vant)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  // 挂载 router
  router,
  // 挂载 store
  store
}).$mount('#app')
