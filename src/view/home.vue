<template>
    
     <el-container class="home">

         <!-- 头部区域 -->
  <el-header>
      

        <el-button class="btn" type="info" plain  @click='tuichu'>退出</el-button>
      <div class="title">
          <img src="../assets/heima.png" alt="">
       <span class="span_title" >电商管理系统</span>
      </div>
  </el-header>

      
  <el-container>
<!-- 左边区域 -->

    <el-aside :width="isshow ? '64px': '200px'  ">
        <div class="target_btn" @click="shouqi">|||</div>

    <el-menu background-color="#333744"  text-color="#fff"  active-text-color="#409Eff" unique-opened  :collapse='isshow' class="bord" router 
    :default-active='this.$route.path'> 
        <!-- 一级菜单 -->
      <el-submenu :index="item.id+''"  v-for="item  in  menuLeft" :key="item.id">


          <!-- 菜单标题 -->
        <template slot="title">
            <!-- 图标 -->
          <i :class="icon_biao[item.id]" ></i>
          <!-- title -->
          <span class="font_title">{{item.authName}}</span>
        </template>

        <!-- 二级菜单 -->
      <el-menu-item :index="'/'+child.path" v-for="child in item.children" :key="child.id">
         
<i    class="el-icon-menu"></i>
    {{child.authName}}
       
      </el-menu-item>
      </el-submenu>
     
     
    </el-menu>
    </el-aside>

    <!-- 右边区域 -->
    <el-main>
            <!-- 放一个 router-view 标签，让home中的子路由显示在该位置上 -->

            <router-view/>

    </el-main>
  </el-container>
</el-container>
    
</template>
<script>
import {requestMenuLeft} from '../nextwork/request.js'

export default {
    name: 'home',
    created(){
          this.getMenudata()

         
    
    },
    methods:{
        // 退出登入
        tuichu(){

                // 1. 先清空登入状态标识 token

                //2. 跳转回去 login页面

                window.sessionStorage.clear()

                // this.$router.push()

                 this.$router.push('/login')
        },
        // 获取左侧菜单数据
        getMenudata(){

            requestMenuLeft().then(res=>{
      
            if(res.data.meta.status !== 200)  return  res.data.meta

           this.menuLeft = res.data.data

       
              
            })


        },
        shouqi(){
              
              this.isshow = !this.isshow
        }
    },
    data(){
        return{
            menuLeft: [],
            icon_biao:{
                '125' : 'iconfont  icon-users',
                '103' :  'iconfont  icon-tijikongjian',
                '101' :'iconfont icon-shangpin ',
                '102' : 'iconfont  icon-danju',
                '145' : 'iconfont icon-baobiao'
            },
            // 判断是否收起左侧菜单
            isshow: false 
        }
    }
    
}
</script>
<style scoped>
.home{
    width: 100%;
    height: 100vh;
}
.el-header{
    background-color: #373D41;
}
.el-aside{
    background-color: #333744;
}
.el-main{
    background-color: #EAEDF1;
}
.span_title{
    color: white;
    margin-left: 10px;
    font-size: 20px;
}
.btn{
    margin-top: 10px;
    float: right;
    margin-right: 20px;
}
.title{
    height: 100%;
    margin-left: 20px;
    display: flex;
    align-items: center;
}
.font_title{
    margin-left: 20px;
}
.target_btn{
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
}
.bord{
    border: none;
}

</style>