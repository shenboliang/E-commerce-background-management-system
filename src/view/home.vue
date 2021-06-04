<template>
    <div class="home">

             <el-button type="info" plain  @click='tuichu'>退出</el-button>
     
    </div>
</template>
<script>
export default {
    name: 'home',
    methods:{
        // 退出登入
        tuichu(){

                // 1. 先清空登入状态标识 token

                //2. 跳转回去 login页面

                window.sessionStorage.clear()

                this.$router.push('/login')


        }
    }
    
}
</script>
<style scoped>

</style>