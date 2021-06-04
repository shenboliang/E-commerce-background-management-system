import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../view/login.vue'


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:"/login",
    component: login
  },
  {
    path:'/home',
    component:()=>import("../view/home.vue")
  } 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


  // 拦截路由导航守卫

  router.beforeEach((to,from,next)=>{

      //  to  表示将要访问的路径
      // from 代表从哪个路径调过来

      // next() 一个函数，表示放行正常跳转

      //  next()  放行      next('login)  强制跳转

       
      //弱国用户访问login本身，放行

      if(to.path === '/login' ) return  next()

      //获取到token

      const  tokenStr = window.sessionStorage.getItem('token')

      if(!tokenStr)  return next('/login')

      next()


      console.log(to,from )
    


  })





export default router
