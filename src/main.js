import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import { Message} from  'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
require('./assets/css/base.css')
require('./assets/css/normalize.css')
require('./assets/css/fonts/iconfont.css')

Vue.use(ElementUI);

Vue.use(Message)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$message = Message

