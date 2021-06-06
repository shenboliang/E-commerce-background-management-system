<template>
    <div class="rights">
     
        <!-- 面包屑区域 -->

    <el-breadcrumb separator=">">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>权限管理</el-breadcrumb-item>
  <el-breadcrumb-item>角色列表</el-breadcrumb-item>
</el-breadcrumb>

        <!-- 添加角色对话框 -->

 <el-dialog
  title="添加角色"
  :visible.sync="dialogVisible"
  width="50%" @close='closeDialog'>
    
<el-form :model="addpersonForm" :rules="rules" ref="addpersonForm" label-width="100px" class="demo-ruleForm">

    <el-form-item label="角色名称" prop="roleName">
    <el-input v-model="addpersonForm.roleName"></el-input>
  </el-form-item>

  <el-form-item label="角色描述" prop="roleDesc">
    <el-input v-model="addpersonForm.roleDesc"></el-input>
  </el-form-item>

</el-form>


  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="commitForm">确 定</el-button>
  </span>
</el-dialog>

        <!-- 编辑角色信息对话框 -->

        <el-dialog
  title="编辑角色信息"
  :visible.sync="editshow"
  width="50%"  @close = 'editClose'>
    
<el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" >

<el-form-item label="角色Id" prop="id">
    <el-input v-model="editForm.id"  disabled></el-input>
  </el-form-item>

    <el-form-item label="角色名称" prop="roleName">
    <el-input v-model="editForm.roleName"></el-input>
  </el-form-item>

  <el-form-item label="角色描述" prop="roleDesc">
    <el-input v-model="editForm.roleDesc"></el-input>
  </el-form-item>

</el-form>


  <span slot="footer" class="dialog-footer">
    <el-button @click="editshow = false">取 消</el-button>
    <el-button type="primary" @click="editJuese">确 定</el-button>
  </span>
</el-dialog>


            <!-- 分配权限对话框 -->
        <el-dialog
  title="分配权限"
  :visible.sync="fenpeishow"
  width="50%"   @close='closeKuang'>
              <!-- 树状显示权限 -->
  <el-tree
  :data="treeList"
  show-checkbox
  node-key='id'
  :default-checked-keys='defaultArr'
  :props="defaultProps"  default-expand-all  ref="dialogs">
</el-tree>
    


  <span slot="footer" class="dialog-footer">
    <el-button @click="fenpeishow = false">取 消</el-button>
    <el-button type="primary"  @click="addFenpei">确 定</el-button>
  </span>
</el-dialog>





            <!-- 内容区域 -->

        <el-card class="box-card">
    <el-button type="primary"  @click="dialogVisible=true " class="addBtn">添加角色</el-button>

        <!-- table区域 -->


    <el-table  :data="list" stripe  style="width: 100%" border>

        <!-- 隐藏的信息,点击可以展示权限内容 -->

           <el-table-column   type="expand" width="50"> 

               <template slot-scope="scope">
                   
                    <el-row v-for="(item,index) in scope.row.children" :key="item.id"  :class="{'rowBo':true,'rowTop': index == 0,'yijixian':true}" >

                            <!-- 渲染一级权限 -->
                            <el-col  :span='5'  > 
                                <el-tag>{{item.authName}} </el-tag>
                                <li  class="el-icon-caret-right"></li>
                            </el-col>

                            <!-- 渲染二三级级权限 -->

                            <el-col :span='19'>
                                
                                <el-row v-for="(item1) in item.children" :key="item1.id" id="el-el-col"  class="yijixian" >


                                <el-col  :span='6'>
                                
                                 <el-tag type='success'>{{item1.authName}} </el-tag>
                                <li  class="el-icon-caret-right"></li>
                                
                                </el-col>

                            <el-col  :span='18' >
                                
                                 <el-tag v-for="item2 in item1.children"  :key="item2.id"  type='warning'  class="margin"  closable   @close="handleClose(scope.row,item2.id)">{{item2.authName}} </el-tag>
                    
                                </el-col>
                                </el-row>
                            </el-col>
                    </el-row>
               </template>
           </el-table-column>

            <!-- 索引列 -->
      <el-table-column   type="index" width="50"> </el-table-column>

        <el-table-column
      prop="roleName"
      label="角色名称">
    </el-table-column>

      <el-table-column
      prop="roleDesc"
      label="角色描述">
    </el-table-column>

      <el-table-column
      prop="authName"
      label="操作">

            <template slot-scope="scope">    

<el-button type="primary" icon="el-icon-share"  size='mini' @click="edit(scope.row.id)">编辑</el-button>
<el-button type="danger" icon="el-icon-delete"  size='mini' @click="deletePerson(scope.row.id)">删除</el-button>
<el-button type="warning" icon="el-icon-setting" size='mini' @click="fenpei(scope.row)">分配权限</el-button>


        </template>


    </el-table-column>

  </el-table>

</el-card>


    </div>
</template>
<script>
    import {requestjuese} from '../../nextwork/requestQuan.js'


export default {
    name:'rights',
    data(){
        return {
             rules: {
          roleName:[
              { required: true, message: '请输入角色名称', trigger: 'blur' },
             { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
           roleDesc:[
             { min: 2, max: 15, message: '长度在  2 到 15 个字符', trigger: 'blur' }
          ],
        

        }  ,
            list:[],
            // 控制添加角色对话框
            dialogVisible:false,
            // 添加角色的参数对象
            addpersonForm : {
                roleName:'',
                roleDesc:''
            },
            // 编辑表单
            editForm:{
                id:'',
                roleName: '',
                roleDesc:''
            },
            //监听编辑角色信息的对话框显示
            editshow:false,
            // 监听分配权限对话框显示
            fenpeishow: false,
            // 请求到的树状list---> tree-list : 用于分配角色对话框的树状展示
             treeList : [],
            // 分配权限提示框树状显示
            defaultProps: {
          children: 'children',
          label: 'authName'
        },
        // 分配权限对话框tree的默认勾选数组: 由 node-key值决定
        defaultArr:[],
        //  点击分配权限对话框时,需要的rolesId
         rolesId: 0
        }
    },
    created(){
       // 初始化时,获取数据
       this.getlist()
    },
    methods:{
        // 获取数据的方法
        getlist(){
            requestjuese().then(res=>{
         
                if(res.data.meta.status !== 200) return

                this.list = res.data.data
               
            })
        },
        //监听对话框关闭,重置表单
        closeDialog(){
            this.$refs.addpersonForm.resetFields()
        },
        //监听对话框中,确定按钮的点击: 1.先预效验表单中的input 是否符合, 2.提交请求
        commitForm(){
            this.$refs.addpersonForm.validate(viod=>{
                  if(!viod)  return this.$message.warning('请输入正确的信息')

                  // 将表单发送到后台
                
                this.$http.post('roles',this.addpersonForm).then(res=>{

                    console.log(res)
                        if(res.data.meta.status !== 201 ) return  this.$message.error('添加角色失败')

                        this.$message.success('添加用户成功')

                        this.getlist()

                        this.dialogVisible =  false

                })



            })
        },
        //监听编辑按钮
        edit(id){
            this.editForm.id = id
            this.editshow =true
        },
        // 监听删除按钮
        deletePerson(id){
            this.$http.delete('roles/'+id).then(res=>{
                if(res.data.meta.status !== 200)  return this.$message.error('角色删除失败')

                this.$message.success('角色删除成功')

                this.getlist()
            })
            
        },
        // 监听编辑对话框中的确定按钮 --> 1.先进行预效验 2. 再发送数据到后台
        editJuese(){

                this.$refs.editForm.validate(viod=>{
                    if(!viod)  return this.$message.warning('请输入正确的修改信息')

                    this.$http.put('roles/'+this.editForm.id,this.editForm).then(res=>{
                        if(res.data.meta.status !== 200)  return this.$message.error('修改角色信息失败')

                        this.$message.success('修改已完成')

                        this.getlist()

                        this.editshow = false

                    })


                })


        },
        // 监听用户点击删除权限按钮
        handleClose(data,id){

     this.$confirm('此操作将永久取消该角色权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

             this.$http.delete('roles/'+data.id+'/rights/'+id).then(res=>{
                console.log(res)
                if(res.data.meta.status !== 200)  return 
                 this.$message.success('已取消该权限')

                // 重新赋值一下权限-->即给 data 赋值 ,不能直接重新获取数据,这样会导致页面刷新

                //  可以通过回调函数传递参数的形式,反向赋值 : 页面中绑定了 data.children , 当 vue 的双向绑定原理监听到数据变化, 页面就会响应,进行局部刷新

                   data.children = res.data.data 
            })
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消此操作'
          })          
        })
               
        },
        // 监听点击分配角色按钮,显示对话框,并请求内容展示
        fenpei(data){

                this.$http.get('rights/tree').then(res=>{
                    
                    if(res.data.meta.status !== 200)  return

                    this.rolesId = data.id

                    this.treeList = res.data.data

                                data.children.map(item=>{
                                    item.children.map(item1=>{
                                        this.defaultArr.push(item1.id)
                                    })
                                })
                })

            this.fenpeishow = true
        },
        // 监听对话框关闭事件
        closeKuang(){
            this.defaultArr =[]
        },
        // 监听分配权限对话框的确定按钮,点击时,提交请求
        addFenpei(){

              // thi.$http.post('roles/:roleId/rights')

            var  arr =  [ ...this.$refs.dialogs.getCheckedKeys() , ...this.$refs.dialogs.getHalfCheckedKeys()]

            var param = arr.join(',')
           
           this.$http.post('roles/' + this.rolesId +'/rights',{rids:param}).then(res=>{
             console.log(res)
             if(res.data.meta.status !== 200 )  return this.$message.error('分配权限失败')

             this.$message.success('分配权限成功')

             this. fenpeishow  = false

             this.getlist()
           })
             
        },
        // 关闭编辑对话框时，重置input
        editClose(){
            this.$refs.editForm.resetFields()
        }



    }
}
</script>
<style scoped>

.box-card{
    margin-top: 40px;
}
.addBtn{
    margin-top: 10px;
    margin-bottom: 30px;
}
.rowBo{
    border-bottom: 1px solid #eee;
}
.rowTop{
    border-top: 1px solid #eee;
}

#el-el-col{
    margin-top: 20px;
}

.yijixian{
    display: flex;
    align-items: center;
}
.margin{
    margin-left: 15px;
}

</style>