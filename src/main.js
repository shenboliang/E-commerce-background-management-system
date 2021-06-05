import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import { Message} from  'element-ui'
import axios from  'axios'
import 'element-ui/lib/theme-chalk/index.css'
require('./assets/css/base.css')
require('./assets/css/normalize.css')
require('./assets/css/fonts/iconfont.css')

import { MessageBox } from 'element-ui'

Vue.use(ElementUI);

Vue.use(Message)

axios.defaults.baseURL = 'http://47.108.206.212:9999/api/private/v1/'

axios.interceptors.request.use(config=>{
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return  config
})

Vue.prototype.$http = axios 


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$message = Message

// 要通过挂载的方式才能使用，只是一种方法

Vue.prototype.$confirm = MessageBox.confirm

