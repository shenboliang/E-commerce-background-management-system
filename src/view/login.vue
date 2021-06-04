<template>
  <div class="login">

        <div class="zhong">      
                <div class="img_box">
                    <img src="../assets/logo.png" alt="">
                </div>

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"  class="form_zong">

          <el-form-item label="账号" prop="username">
         <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>

          <el-form-item label="密码" prop="password">
         <el-input v-model="ruleForm.password" type='password'></el-input>
        </el-form-item>

        <el-form-item  class="btn-item">
         <el-button type="primary" @click='login'>登入</el-button>
           <el-button type="info" @click='reset'>重置</el-button>
        </el-form-item>


            </el-form>
            
         
   </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {requestLogin}  from '../nextwork/request.js'

export default {
  name: 'login',
  components: {

   
  },
  data(){
    return {
         ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户账号', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
           password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ],
        }       
    }
  },
   methods: {
       reset(){
           this.$refs.ruleForm.resetFields()
       },
       login(){
            this.$refs.ruleForm.validate(  (viod)=>{
                if(!viod) return ;

                requestLogin('login',this.ruleForm).then(  res=>{
                   
                      const data = res.data.meta 

                      if(data.status == 200){
                         this.$message.success('登入成功')
                       
                      }else{
                         this.$message.error('登入失败')
                      }

                 // 1. 将登入成功后，返回的token保存到客户端的session中（应为session缓存在网页关闭就已经销毁） ----> tonken 作为登入标识

                 //  2.项目中除了登入接口，其他的api接口只有在登入状态下才能访问并请求到数据 （即拿到token）

                 // token只在当前打开的网页中生效，所有把token保存到  session中

                 // 使用session本地缓存保存token

                 window.sessionStorage.setItem('token',res.data.data.token)

                 this.$router.push('/home')
                   



                })


            })
       }
    }
}
</script>
<style scoped>
.login{
    height: 100%;
    height: 100vh;
    background-color: #2b4b6b;
}
.zhong{
    width: 600px;
    height: 300px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

}
.img_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px;
    position: absolute;
    left: 50%;
    top: 0;
    transform:translate(-50%,-50%);
    background-color: #fff;
}
.img_box img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
}
.btn-item{
   display: flex;
   justify-content: flex-end;
}
.form_zong{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 50px;
    box-sizing: border-box;
}
</style>