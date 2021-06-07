<template>
    <div class="categories">
        <!-- 面包屑区域 -->
   <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
  <el-breadcrumb-item>商品分类</el-breadcrumb-item>
</el-breadcrumb>

            <!-- 添加分类对话框 -->
<el-dialog
  title="添加分类"
  :visible.sync="dialogVisible"
  width="50%"
  @close='addFenleiClose'
 >
    <el-form   v-model="fenleiForm" ref="ruleForm" label-width="100px" >

  <el-form-item label="分类名称:" prop="cat_name">
    <el-input v-model="fenleiForm.cat_name" ></el-input>
  </el-form-item>


<el-form-item label="父级分类"  >
        <!-- options指定资源项 -->
 <!-- :prop ='addvalue' -->
    <el-cascader class="el-cascade"
                v-model="selectedKeys"
                :options=" dialogsFenpei"
                :props="cascaderProps"
                @change="parentCateChange" 
                clearable></el-cascader>

</el-form-item>

</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="fenleiAdd">确 定</el-button>
  </span>
</el-dialog>

            <!-- 编辑按钮控制的对话框 -->

<el-dialog
  title="编辑"
  :visible.sync="editshow"
  width="50%"
  @close = 'closeEditform'
 >
<el-form  v-model="editForm"  ref="editForm" label-width="100px" >
    
<el-form-item label="分类名称" >
    <el-input v-model="editForm.cat_name"></el-input>
  </el-form-item>

</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editshow = false">取 消</el-button>
    <el-button type="primary" @click=" editClickadd">确 定</el-button>
  </span>
</el-dialog>

  



    <el-card class="box-card">
         <el-button type="primary" @click="addfenlei">添加分类</el-button>

         <tree-table :data='list'  :columns='columns' class="margin"  :selection-type="false" :expand-type='false' show-index  index-text='#'  border :show-row-hover='false'
         >
            <!-- 通过slot的方式选中自定义列，进行编辑 -->

            <!-- 第二列数据的模板 -->
            <template  slot ='iosk'  slot-scope="scope">

            <li class="el-icon-error"  v-if="scope.row.cat_deleted == false" style="color:lightred"  ></li>
                <li class="el-icon-success" v-else  style="color:lightgreen"></li>
            </template>

            <!-- 第三列数据的模板 -->

        <template  slot='paixu' slot-scope="scope">

            <el-tag  v-if="scope.row.cat_level == 0">一级</el-tag> 
            <el-tag type="success"  v-else-if="scope.row.cat_level == 1">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
        </template>


            <!-- 第四列数据的模板————操作 -->

<template slot = 'anniu' slot-scope="scope" >
<el-button type="primary" icon="el-icon-edit"  @click="editclick(scope.row)">编辑</el-button>
<el-button type="danger" icon="el-icon-delete" @click="deleteclick(scope.row)">删除</el-button>
            </template>
         </tree-table>

    <el-pagination
      :current-page="page.pagenum"
      :page-sizes="[2, 5, 8, 10]"
      :page-size="page.pagesize"
      @size-change='handlepagesize'
      @current-change ='handlecurrentChange'
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</el-card>

    </div>
</template>
<script>
export default {
    name:'categories',
    created(){
        this.getList()
    },
    methods:{
        // 获取分类列表数据方法
        getList(){


            this.$http.get('categories', {params: this.page}).then(res=>{
                  if(res.data.meta.status !== 200)  return  

                this.list =  res.data.data.result

                this.total = res.data.data.total    
            })    
        },
        //监听页码变化事件
        handlecurrentChange(newPagenum){
           this.page.pagenum = newPagenum
           this.getList()
        },
        //监听pageSize变化事件
        handlepagesize(newsize){
                this.page.pagesize = newsize
                this.page.pagenum = 1
                this.getList()

        },
        // 获取对话框的分类数据
        getFenpeiList(){
             this.$http.get('categories',{ params:{ type: 2}}).then(res=>{
                    if(res.data.meta.status !== 200)  return 

                    this.dialogsFenpei = res.data.data

                    console.log(this.dialogsFenpei)
            })
        },
        //监听添加分类的点击按钮
        addfenlei(){
            this.dialogVisible = true

            this.getFenpeiList()
        },

        //监听选中选项变化
       parentCateChange(){
           if(this.selectedKeys.length > 0 ){
              
                this.fenleiForm.cat_pid  = this.selectedKeys[this.selectedKeys.length - 1]

                this.fenleiForm.cat_level  = this.selectedKeys.length

                console.log(this.fenleiForm)

                return

           }
           //else{
        //        this.fenleiForm.cat_pid = 0
        //        this.fenleiForm.cat_level= 0 
        //    }

        
        },
        //监听添加分类对话框的确定按钮
        fenleiAdd(){

            if(!this.fenleiForm.cat_name){
                return  this.$message.warning('请输入分类名称')
            }else{
                    this.$http.post('categories',this.fenleiForm).then(res=>{
                        if(res.data.meta.status !== 201)  return  this.$message.error('添加失败')

                        this.$message.success('添加成功')

                        this.getFenpeiList()

                        this.dialogVisible =false
                    })
                    
                    
                    }
            // dialogVisible = false
        },

            // 监听对话框关闭事件
        addFenleiClose(){

            this.selectedKeys = []
            
            this.fenleiForm.cat_pid  = 0

            this.fenleiForm.cat_name = ''

            this.fenleiForm.cat_level = 0
        },
        //监听点击编辑按钮
        editclick(data){
           
            this.editForm.cat_id = data.cat_id

            this.editshow = true
        },
        // 监听编辑对话框关闭事件 ---> 重置表单
        closeEditform(){

           this.editForm.cat_name = ''
            
        },
        // 监听编辑对话框的确定按钮
        editClickadd(){

            if(this.editForm.cat_name == '')  return this.$message.warning('请输入编辑内容')

            this.$http.put('categories/'+this.editForm.cat_id,{cat_name:this.editForm.cat_name}).then(res=>{
                
                if(res.data.meta.status !== 200)  return this.$message.error('修改失败')

                this.$message.success('更新成功')

                this.editshow = false 

               this.getList()
            })
        },
        //监听删除按钮的点击
        deleteclick(data){

         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         
            this.$http.delete('categories/'+data.cat_id).then(re=>{
                 if(re.data.meta.status !== 200) return this.$message.error('删除失败')

                 this.$message.success('删除成功')

                 this.getList()
            })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })        
        })  
        }



           
        
    },
    data(){
        return {
            //存放分类列表数据
            list:[],
             // 总页数
            total:0 ,
            page:{
            // 当前页码
            pagenum: 1 ,
            // 每页显示的条数
            pagesize: 5,
            type:3
            },
            // 指定tree-table每一列的内容数组
            columns:[{
                // 第一列绑定的数组中每个对象的属性值
                prop:'cat_name',
                label:'分类名称'
            },

            //第二列数据
            {   //该列的表头
                label: '是否有效',
                //表示将该列最为自定义列
                type:'template',
                template:'iosk'
            },
            //第三列数据
            {
                //该列的表头名称
                label: '排序',
                type:'template',
                template:'paixu'
            },
            //定义第四列
            {
                 label:'操作',
                 type:'template',
                 template: 'anniu'
            }
            ],
            // 监听添加分类对话框的显示
            dialogVisible:false,
          // 分类表单
          fenleiForm:{
            cat_name:'',
            cat_pid:0,
            //分类等级，默认添加1级分类
            cat_level: 0
          },
          // 添加分类对话框的选项数据
          dialogsFenpei:[],
          // 绑定class联级的value
          cascaderProps:{

				//可以选中一级内容
				checkStrictly:true,
                //指定触发方式
                expandTrigger: 'hover',
				//数据源parantList中的cat_id做数据绑定
				value:'cat_id',
				//数据源parantList的cat_name渲染出来的内容
				label:'cat_name',
				//数据源parantList的children做嵌套
				children:'children'
			},	
          selectedKeys:[],

            // 监听编辑对话框的显示
            editshow : false,
            //编辑表单
            editForm: {
                cat_id : 0,
                cat_name : ''
            }





        }
    } 

}
</script>
<style scoped>
.el-cascade{
    width: 100% !important;
}

.margin{
    margin-top: 20px;
}
.box-card{
    margin-top: 20px;
}
</style>