import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../view/login.vue'
import welcome from '../view/home-child/welcome.vue'

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
    component:()=>import("../view/home.vue"),
    // 进入该组件后，自动重定向到  welcome 组件
    redirect :'/welcome',
    // home 页面下面的组件
    children:[
      {
        path:'/welcome',
        component: welcome
      },
      {
        path : '/users',
        component:()=>import('../view/home-child/users.vue')
      },
      {
        path:'/roles',
        component:()=> import('../view/home-child/roles.vue')
      },
      {
        path:'/rights',
        component:()=>import('../view/home-child/rights.vue')
      },
      {
        path:'/reports',
        component:()=>import('../view/home-child/repot.vue')
      },
      {
        path:'/params',
        component:()=>import('../view/home-child/params.vue')
      },
      {
        path:'/orders',
        component:()=>import('../view/home-child/orders.vue')
      },
      {
        path:'/goods',
        component:()=>import('../view/home-child/goods.vue'),
      
      },
      {
        path:'/categories',
        component:()=>import('../view/home-child/categories.vue')
      },

      {path:'/goods/add',
      component:()=>import('../view/home-child/goods-add.vue')
  }


    ]
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


  })





export default router
