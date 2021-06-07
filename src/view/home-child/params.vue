<template>
    <div class="params">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
  <el-breadcrumb-item>商品参数</el-breadcrumb-item>
</el-breadcrumb>

       <!-- 内容区域 -->

  <el-card class="box-card">
       <el-alert
    title="注意：只允许为第三级部分设置相关参数"
    type="warning"
    show-icon >
  </el-alert>

    <div class="row-cals">

        <!-- 头部选中内容 -->

    <div  class="content">
     <span>选中商品分类：</span>

    <el-cascader
                style="width:35%"
                v-model="selectedKeys"
                :options="list"
                :props="cascaderProps"
                @change='xuanzeoption'
                clearable></el-cascader>
    </div> 

              <!-- table内容 -->

     <el-tabs v-model="activeName" class="content" @tab-click='qiehuan_tab' >
    <el-tab-pane label="动态参数" name="many">

<el-button type="primary" :disabled='isBoxactive' @click="clickone">添加参数</el-button>

            <!-- 绘制动态参数的表格 -->
    
    <el-table :data="manyparamsList" style="width: 100%" border> 
        
                   <!-- 展开行 -->
        <el-table-column type='expand' >
               <template slot-scope="scope">
                   <el-tag v-for=" (elem,index) in  scope.row.attr_vals" :key="elem.attr_id" class="item-margin" closable
                  @close="deleteKexuan(scope.row,index)" >
                       {{elem}}
                   </el-tag>

                    <!-- 添加文本框 -->
    <el-input
  v-if="scope.row.inputVisible"
  v-model="scope.row.inputValue"
  ref="saveTagInput"
  size="small"
  @keyup.enter.native="handleInputConfirm(scope.row)"
  @blur="handleInputConfirm(scope.row)"
  style="width:120px"
>
</el-input>
<el-button v-else  size="small" @click="showInput(scope.row)" >+ New Tag</el-button>  
        </template> 
        </el-table-column>
                    <!-- 索引 -->
            <el-table-column type='index' ></el-table-column>

         <el-table-column :span='6' prop="attr_name" label="参数名称" ></el-table-column>

        <el-table-column  :span='18'  label="操作" >

            <template  slot-scope="scope">
<el-button type="primary" icon="el-icon-edit"  @click="editParamsdong(scope.row)">编辑</el-button>
<el-button type="danger" icon="el-icon-delete" @click="deleteParamsD(scope.row)">删除</el-button>
            </template>

        </el-table-column>
    </el-table>
    </el-tab-pane>

    <el-tab-pane label="静态参数" name="only"  >
<el-button type="primary"  :disabled='isBoxactive' @click="clicktwo" >添加参数</el-button>

       <el-table :data="onlyparamsList" style="width: 100%" border> 
        
                   <!-- 展开行 -->
       <el-table-column type='expand' >
               <template slot-scope="scope">
                   <el-tag v-for=" (elem,index) in  scope.row.attr_vals" :key="elem.attr_id" class="item-margin" closable
                  @close="deleteKexuan(scope.row,index)" >
                       {{elem}}
                   </el-tag>

                    <!-- 添加文本框 -->
    <el-input
  v-if="scope.row.inputVisible"
  v-model="scope.row.inputValue"
  ref="saveTagInput"
  size="small"
  @keyup.enter.native="handleInputConfirm(scope.row)"
  @blur="handleInputConfirm(scope.row)"
  style="width:120px"
>
</el-input>
<el-button v-else  size="small" @click="showInput(scope.row)" >+ New Tag</el-button>  
        </template> 
        </el-table-column>
                    <!-- 索引 -->
            <el-table-column type='index' ></el-table-column>

         <el-table-column :span='6' prop="attr_name" label="属性名称" ></el-table-column>

        <el-table-column  :span='18'  label="操作" >

            <template slot-scope="scope">
<el-button type="primary" icon="el-icon-edit"  @click="editParamsjing(scope.row)">编辑</el-button>
<el-button type="danger" icon="el-icon-delete" @click='deleteParamsJ(scope.row)'>删除</el-button>
            </template>

        </el-table-column>
    </el-table>


    </el-tab-pane>
  </el-tabs>
 


    </div>
  </el-card>


        <!-- 添加参数对话框 -->

<el-dialog
  :title="'添加'+canshu"
  :visible.sync="dialogavalue"
  width="50%" @close='closeTianjia'>
 
        <!-- 添加动态参数表单 -->

    <el-form :model="allForm" :rules="rules" ref="allForm" label-width="100px"   
    >
     <el-form-item label="动态参数" prop="attr_name" v-if="activeName=='many'">
    <el-input v-model="allForm.attr_name"></el-input>
  </el-form-item>

            <!-- 添加静态属性 -->

<el-form-item label="静态属性" prop="attr_name" v-else>
    <el-input v-model="allForm.attr_name"></el-input>
  </el-form-item>
    </el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogavalue = false">取 消</el-button>
    <el-button type="primary" @click="tianjiaParams">确 定</el-button>
  </span>
</el-dialog>

            <!-- 编辑参数对话框 -->

<el-dialog
  :title="editTai"
  :visible.sync="editParamsshow"
  width="50%" @close="closeEditParams"
>

     <el-form :model="editParamsForm" :rules="rules" ref="editParamsForm" label-width="100px"   
    >
     <el-form-item :label="canshu" prop="attr_name" >
    <el-input v-model="editParamsForm.attr_name"></el-input>
  </el-form-item>

     </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editParamsshow = false">取 消</el-button>
    <el-button type="primary" @click="editParamsclick">确 定</el-button>
  </span>
</el-dialog>



    </div>
</template>
<script>
export default {
    name:'params',
    created(){
        // 获取所有的商品分类
        this.getList()
    },
    computed:{
            // 判断添加参数对话框是动态还是静态
            canshu(){
                if(this.activeName == 'only'){
                    return  '静态参数'
                }else{
                    return  '动态参数'
                }
            },
            // 拿到分类的 id 
            cateId(){
                return  this.selectedKeys[2]
            },
            // 判断编辑的对话框的状态
            editTai(){

              if(this.activeName == 'many'){
                  return  '编辑动态参数'
              }else{
                  return  '编辑静态参数'
              }
            }

        },
    methods:{
        // 获取所有商品的数据
        getList(){
            this.$http.get('categories').then(res=>{
                    if(res.data.meta.status !==200)  return 

                    this.list = res.data.data

            })
        },
        // 监听用户选中的options
        xuanzeoption(){
           
            // 选中的不是三级分类
            if(this.selectedKeys.length !== 3){

                this.selectedKeys = []

                this.isBoxactive = true

                return
            }else{
               

    this.$http.get(`categories/${this.selectedKeys[2]}/attributes`,{params:{sel:this.activeName}}).then(res=>{


              res.data.data.forEach(element => {
                  element.attr_vals = element.attr_vals ? element.attr_vals.split(',') : []

        // 下拉可选项的添加的文本和按钮控制
            element.inputVisible = false
            // 文本框内容
            element.inputValue = ''
              });


            if(res.data.meta.status !== 200)  return this.$message.error('获取数据失败')

            this.$message.success('获取数据成功')

            if(this.activeName == 'many'){

                     this.manyparamsList = res.data.data

                        }else{
                            this.onlyparamsList =res.data.data
                        }

    })
                 this.isBoxactive =  false 
            }
        },
        // 点击动态参数的添加按钮
        clickone(){
            this.dialogavalue =true
        },
        //点击静态参数的添加按钮
        clicktwo(){
            this.dialogavalue =true
        },
        // 点击tab切换时,触发事件
        qiehuan_tab(){
           
            if(this.selectedKeys.length == 3){

                this.$http.get(`categories/${this.selectedKeys[2]}/attributes`,{params:{sel:this.activeName}}).then(res=>{

                    if(res.data.meta.status !== 200)   return  this.$message.error('获取数据失败')

                        if(this.activeName == 'many'){

                     this.manyparamsList = res.data.data

                        console.log(11)

                        }else{
                            this.onlyparamsList =res.data.data
                        }
                    
                })
            }

        },
        //监听添加参数对话框关闭事件
        closeTianjia(){
            this.$refs.allForm.resetFields()

// 每次关闭对话框时，重置一下内部的属性，因为静态属性添加时也是使用该对象，防止不必要的干扰

            this.allForm.attr_name = ''

            this.attr_vals  = ''
        },
        //点击添加参数确定按钮时，提交请求（不用进一步判断，动态还是静态都可以使用一个请求，发送不同参数）
   tianjiaParams(){

            //进行预效验

            this.$refs.allForm.validate(async  viod=> {

        if(!viod)  return 
    const data = await  this.$http.post(`categories/${this.cateId}/attributes`,{
              attr_name :  this.allForm.attr_name, 
              attr_sel: this.activeName,
        })
          
        if(data.data.meta.status !== 201)  return  this.$message.error('添加参数失败')

        this.$message.success('添加参数成功')

        this.dialogavalue = false

        // 刷新列表

        this.qiehuan_tab()

        })
        },
        // 监听静态编辑按钮的点击事件
        editParamsjing(data){

            this.editParamsshow =true

            this.editParamsForm.attrId = data.attr_id
            
        },
        // 监听动态编辑按钮的点击事件
        editParamsdong(data){

                this.editParamsForm.attrId = data.attr_id

                this.editParamsshow  =true
        },
        //监听点击编辑对话框的关闭
        closeEditParams(){

            this.$refs.editParamsForm.resetFields()

            this.editParamsForm.ttr_name = ''

            this.editParamsForm.attrId = 0
        },
        //监听编辑对话框的点击按钮
        editParamsclick(){
            
            this.$refs.editParamsForm.validate(async viod=>{

                    if(!viod) return

const  data  = await this.$http.put(`categories/${this.cateId}/attributes/${this.editParamsForm.attrId}`,{attr_name: this.editParamsForm.attr_name , attr_sel: this.activeName}
)
     if(data.data.meta.status !==  200)  return  this.$message.error('修改参数失败')

     this.$message.success('修改参数成功')

     this. qiehuan_tab()

     this.editParamsshow =false

            })

        } ,
        //监听点击删除按钮 --> 动态
        deleteParamsD(data){

        this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
    const  par = await this.$http.delete(`categories/${this.cateId}/attributes/${data.attr_id}`)

            if(par.data.meta.status !== 200) return this.$message('删除参数失败')

            this.$message.success('成功删除该参数')

            this.qiehuan_tab()

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });   

        },
        // 静态删除按钮
        deleteParamsJ(data){
             this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
    const  par = await this.$http.delete(`categories/${this.cateId}/attributes/${data.attr_id}`)

            if(par.data.meta.status !== 200) return this.$message('删除参数失败')

            this.$message.success('成功删除该参数')

            this.qiehuan_tab()

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });   
        },
        // 监听下拉项的添加类的事件
        handleInputConfirm(data){
            
                if(data.inputValue.trim().length == 0){
                    data.inputValue = ''
                    data.inputVisible = false 

                    return
             }

             data.attr_vals.push(data.inputValue)

             data.inputValue = ''

     this.$http.put(`categories/${this.cateId}/attributes/${data.attr_id}`,{
          attr_sel: data.attr_sel,
          attr_name:data.attr_name,
          attr_vals : data.attr_vals.join(',')
     }).then(res=>{

            if(res.data.meta.status !== 200) return  this.$message.error('添加可选项失败')

            this.$message.success('添加可选项成功！')

            })   
 

            

        },
        // 监听下拉项的按钮形式的点击
         showInput(data){
             data.inputVisible =true

              this.$nextTick(()=> {
          this.$refs.saveTagInput.$refs.input.focus();
        })
         },
         //监听可选项的删除按钮
         deleteKexuan(data,index){
             data.attr_vals.splice(index,1)

     this.$http.put(`categories/${this.cateId}/attributes/${data.attr_id}`,{
          attr_sel: data.attr_sel,
          attr_name:data.attr_name,
          attr_vals : data.attr_vals.join(',')
     }).then(res=>{

            if(res.data.meta.status !== 200) return  this.$message.error('删除可选项失败')

            this.$message.success('删除可选项成功！')

            })   
             
         }
    },
    data(){
        return {
            list : [],
            //选中项的cat_id数组
			selectedKeys:[],
            //表单匹配规则
             rules: {
          attr_name: [
            { required: true, message: '请输入参数', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10个字符', trigger: 'blur' }
          ]},
			//数据的配置信息
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
				children:'children',
			},
             // 绑定table活跃状态
            activeName: 'many',
            //监听按钮的禁用状态
            isBoxactive: true,
            // 选中商品之后展示的参数-->动态
            manyparamsList : [],
            // 静态
            onlyparamsList :[],
            // 控制对话框的展示--->添加参数
            dialogavalue:false,
            // 添加动态参数表单
            allForm:{
                attr_name:'',
                attr_sel : '',
            },
            // 编辑参数的对话框
            editParamsshow: false,
            // 编辑参数对话框绑定的表单
            editParamsForm:{
                attr_name:'',
                attrId:0 
            },

        }
    }

}
</script>
<style scoped>
.box-card{
    margin-top: 20px;
}
.row-cals{
        margin-top: 20px;
}
.content{
    margin-top: 20px;
}
.context{
    margin-top: 10px;
}
.item-margin{
    margin-right: 20px;
}
</style>