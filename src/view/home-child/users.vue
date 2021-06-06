<template>
    <div class="wel">
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>

    <el-card shadow="always" class="card">
    
  
            <!-- 搜索框 -->
 
       <el-row :gutter="20">
  <el-col :span="8">
       <el-input placeholder="请输入内容"  v-model="param.query"  clearable>
    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
  </el-input>
  </el-col>
  <el-col :span="6">   <el-button type="primary"  @click="dialogVisible = true">添加用户</el-button>
 </el-col>
</el-row>

        <!-- 添加用户对话框 -->
    <el-dialog
  title="添加用户"
  :visible.sync="dialogVisible"
  width="50%" @close='clear' >
  
        <!-- 对话框内容 -->

 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"  >
  
        <!-- 表单数据 -->

   <el-form-item label="用户名" prop="username">
         <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>

          <el-form-item label="密码" prop="password">
         <el-input v-model="ruleForm.password" ></el-input>
        </el-form-item>

         <el-form-item label="邮箱" prop="email">
         <el-input v-model="ruleForm.email" ></el-input>
        </el-form-item>

         <el-form-item label="电话" prop="mobile">
         <el-input v-model="ruleForm.mobile" ></el-input>
        </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="adduser">确 定</el-button>
  </span>
</el-dialog>
        <!-- 列表数据展示 -->

    <el-table
    :data="list"
    stripe
    style="width: 100%" border   class="table-le">
    <el-table-column type='index'></el-table-column>
    <el-table-column prop="username" label="用户名"  width="180"></el-table-column>
    <el-table-column  prop="email" label="邮箱"  width="180"></el-table-column>
    <el-table-column prop="mobile" label="电话"></el-table-column>
    <el-table-column prop="role_name" label="角色"></el-table-column>
    <el-table-column prop="mg_state" label="状态">
        <template slot-scope="scope">
        <el-switch
  v-model="scope.row.mg_state"  @change='changeSt(scope.row)'>
</el-switch>
      </template>
    </el-table-column>
    <el-table-column  label="操作">
        <template  slot-scope="scope">    
            
                 <!-- 编辑按钮 -->

            <el-tooltip class="item" effect="dark" content="编辑" placement="top"  :enterable="false"  >
     <el-button type="primary" icon="el-icon-edit" @click="bianji(scope.row.id)"></el-button>
    </el-tooltip>

                    <!-- 删除按钮 -->

           <el-tooltip class="item" effect="dark" content="删除" placement="top"  :enterable="false">
     <el-button type="danger" icon="el-icon-delete"  @click="removeUser(scope.row.id)"></el-button>
    </el-tooltip>

                        <!-- 分配角色 -->

           <el-tooltip class="item" effect="dark" content="分配角色" placement="top"  :enterable="false">
     <el-button type="warning" icon="el-icon-share"  @click="fenpeijuese(scope.row)"></el-button>
    </el-tooltip>
        </template>
    </el-table-column>
  </el-table>

     <!-- 分页内容 -->

 <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="param.pagenum"
      :page-sizes="[1,3,5,10]"
      :page-size="param.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>

            <!-- 分配角色对话框 -->

  <el-dialog
  title="分配角色"
  :visible.sync="fenpeishow"
  width="50%"  @close='getcloseSelect'>
            
      <div>
        <span>当前的用户：</span>
        <span>{{fenpeiForm.username}}</span>
      </div>

      <div class="dialog-center">
        <span>当前的角色：</span>
        <span>{{fenpeiForm.role_name}}</span>
      </div>
      
    

   分配新角色：   <el-select v-model="roleMessage" placeholder="请选择" >
    <el-option
      v-for="item in roleList"
      :key="item.id"
      :label="item.roleName"
      :value="item.id">
    </el-option>
  </el-select>

  <span slot="footer" class="dialog-footer">
    <el-button @click="fenpeishow = false">取 消</el-button>
    <el-button type="primary"  @click="addFen">确 定</el-button>
  </span>
</el-dialog>


            <!-- 修改用户数据对话框 -->

 <el-dialog
  title="修改用户数据"
  :visible.sync="xiugaidata"
  width="50%"  @close="xiugaiclose">
  
  <el-form v-model="editFrom" :rules="rules"  ref="editFormObj" label-width="100px" >
  
        <!-- 表单数据 -->

   <el-form-item label="用户名" >
         <el-input v-model="editFrom.username" disabled></el-input>
        </el-form-item>

         <el-form-item label="邮箱" prop="email">
         <el-input v-model="editFrom.email" ></el-input>
        </el-form-item>

         <el-form-item label="电话" prop="mobile">
         <el-input v-model="editFrom.mobile" ></el-input>
        </el-form-item>

 
</el-form>


  <span slot="footer" class="dialog-footer">
    <el-button @click="xiugaidata = false">取 消</el-button>
    <el-button type="primary" @click="consure">确 定</el-button>
  </span>
</el-dialog>


    </div>
</template>
<script>
import  {requestListdata, changestatus} from  '../../nextwork/request.js'


export default {
    name:'users',
    data(){

        return {    
              rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
           password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ],
           email:[
               { required: true, message: '请输入用户名', trigger: 'blur' },
           ],
           mobile:[
               { required: true, message: '请输入用户名', trigger: 'blur' },
           ]
        }  ,
            // 请求数据参数
            param:{
                // 当前页码
                pagenum: 1,
                // 每页条数
                pagesize: 2,
                query: ''
            },
            // 请求到的数据列表
            list:[],
            //  数据总数
            total: 0,
            // 对话框显示
            dialogVisible : false,
            // 用于对话框创建用户,对象
            ruleForm: {
                username:'',
                password:'',
                email:'',
                mobile:""
            },
            // 控制修改数据对话框
            xiugaidata:false,
            // 存放修改用户数据的数据
            editFrom : {},
            // 控制分配角色对话框是否显示i
             fenpeishow:false,
             //分配角色绑定的表单
              fenpeiForm:{
                id: '',
                role_name:'',
                username : ''
              },
              // 当前角色列表
              roleList:[],
              // 分配角色上传参数-->已经选中的角色id
              roleMessage:''     
        }
    },
    created(){
            this. getListdata()
    },
    methods:{
        //  发送请求获取列表数据
        getListdata(){

            requestListdata(this.param).then(res=>{

                if(res.data.meta.status !== 200 )  return   console.log('请求出错')
                
                this.list = res.data.data.users
                this.total = res.data.data.total

            })

        },
        // 监听 Pagesize 改变 : 每页条数  ---- 重新获取数据再渲染
        handleSizeChange(newsize){

                this.param.pagesize =newsize
               
               this.getListdata()

        },
        //监听currentPage 改变  : 当前页码    --> 重新获取数据,再渲染
        handleCurrentChange(num){

                this.param.pagenum =num

                this.getListdata()

        },
       changeSt(item){

                var par = `users/${item.id}/state/${item.mg_state}`
                
                
               changestatus(par).then(res=>{
                

                   if(res.data.meta.status  == 200 ){
                     this.$message.success('数据修改成功')
                   }else{
                        this.$message.success('数据修改失败成功')

                        // 回退状态

                        item.mg_state  = !item.mg_state
                   }
               })
                
                // console.log(`users/${item.id}/status/${item.mg_state}`)

                

                // users/:uId/state/:type
                

               
        },
        search(){
                this.getListdata()
        },
        clear(){
            this.$refs.ruleForm.resetFields()
        },
        adduser(){
            // this.dialogVisible = false

            this.$refs.ruleForm.validate((viod)=>{
                if(!viod)   return    

                //  效验通过后,发送请求,将数据推送到数据库中

                this.$http.post('users',this.ruleForm).then(res=>{
                        if(res.data.meta.status !== 201 ){

                            this.$message.success('用户数据已添加')

                        }else{
                                this.$message.warning('用户数据添加失败')
                        }
                })
            })

                    this.dialogVisible = false


        },
        bianji(id){
            
            // 获取用户数据，并展示在修改对话框中
            
              this.$http.get('users/'+id).then((res)=>{

                   if(res.data.meta.status !== 200)  return 

                   this.editFrom =  res.data.data
              })

            this.xiugaidata = true
            
        },
        consure(){

                var url = 'users/' + this.editFrom.id                 

                    this.$http.put(url,this.editFrom).then(res=>{
                    if(res.data.meta.status !==200) return

                    this.$message.success('用户数据修改成功')

                    this.xiugaidata = false
                })
             

        },
        xiugaiclose(){
            
        },
          //获取用户列表方法
          getUserList(){
                  this.$http.get('roles').then(res=> {

                        this.roleList  = res.data.data
                        console.log(this.roleList)
                  })
              },
      
        removeUser(id){
  
           this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

            this.$http.delete('users/'+id).then(res=>{
                
                 if(res.data.meta.status !==200)    return  this.$message.error('用户删除失败')

                this.$message.success('用户删除成功')

                this.getListdata()
             
            })
            
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        },
        // 监听分配角色按钮的点击事件 : 通过参数的方式获取到 scope.row 传过来的点击的用户的数据
        fenpeijuese(data){
          this.fenpeishow  = true

          console.log(data)
          
          this.fenpeiForm.id = data.id

        this.fenpeiForm.role_name = data.role_name
          
          this.fenpeiForm.username = data.username

            this.getUserList() 
         
        },
        //监听分配角色对话框的确定按钮
        addFen(){

            if(!this.roleMessage)  return this.$message.error('请选择要分配的角色')

              this.fenpeishow  = false

              this.$http.put(`users/${this.fenpeiForm.id}/role`,{rid:this.roleMessage}).then(res=>{

                  if(res.data.meta !== 200 ){ return this.$message.error('设置失败') }else{

                     this.$message.success('设置成功')
                  }

              })
        },
        // 关闭分配权限的对话框时，重置相关内容
        getcloseSelect(){
          this.roleMessage = ''
        }

    }

}
</script>
<style scoped>
.card{
    margin-top: 20px;
    box-shadow: 0 1xp 1px rgba(0,0, 0, 0.15)  !important;
}
.table-le{
    margin-top: 20px;
}
.dialog-center{
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>