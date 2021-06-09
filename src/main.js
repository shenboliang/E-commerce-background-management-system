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
import Treegrid  from 'vue-table-with-tree-grid'


import { MessageBox } from 'element-ui'

import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme


Vue.use(VueQuillEditor, /* { default global options } */)

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

Vue.component('tree-table',Treegrid)

// 定义一个全局的事件过滤器

Vue.filter('dateForn', function(Fdate){

    var dt = new  Date(Fdate)

    var  y = dt.getFullYear()

    var m  = (dt.getMonth()+1+'').padStart(2,'0')

    var d  = (dt.getDate()+'').padStart(2,'0')

    var hh  = (dt.getHours() + '').padStart(2,'0')

    var mm = (dt.getMinutes() +'').padStart(2,'0')

    var ss = (dt.getSeconds() + '').padStart(2,'0')

    return  `${y}-${m}-${d}   ${hh}:${mm}:${ss}`

})

