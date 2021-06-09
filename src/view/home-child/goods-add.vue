<template>
    <div>
                <!-- 面包屑 -->

            <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
  <el-breadcrumb-item>添加商品</el-breadcrumb-item>
</el-breadcrumb>

        <!-- 卡片区域 -->

        <el-card class="box-card">

            <!-- 文字提示 -->
  
    <el-alert
    title="添加商品信息"
    type="info"   show-icon  center>
  </el-alert>


            <!-- 步骤条 -->

<el-steps :space="200" :active="active-0" finish-status="success" class="steps">
  <el-step title="基本信息"></el-step>
  <el-step title="商品参数"></el-step>
  <el-step title="商品属性"></el-step>
      <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
</el-steps>


                <!-- tabbar -->

<el-form :model="addGoodsForm" :rules="rules"  ref="addGoodsForm" label-width="100px" class="demo-ruleForm">

      <el-tabs tab-position="left"   @tab-click='qiehuan' :before-leave='qiehuanTab'>
    <el-tab-pane label="基本信息" name='0'>

            
                <!-- 基本信息表单 -->
   
<el-form-item label="商品名称" prop="goods_name" class="item-Form">
    <el-input v-model="addGoodsForm.goods_name" ></el-input>
  </el-form-item>

  <el-form-item label="商品价格" prop="goods_price"  class="item-Form">
    <el-input v-model="addGoodsForm.goods_price"></el-input>
  </el-form-item>

    <el-form-item label="商品重量" prop="goods_weight"  class="item-Form">
    <el-input v-model="addGoodsForm.goods_weight"></el-input>
  </el-form-item>

  <el-form-item label="商品数量" prop="goods_number"  class="item-Form">
    <el-input v-model="addGoodsForm.goods_number"></el-input>
  </el-form-item>

  <el-form-item class="zuihou" label='商品分类'>
 <el-cascader
      :props="defaultParams"
      :options="options"
      v-model="selectedOptions"
      :clearable="true"
      style="width:300px"
      @change='xuanzeFenlei'
      expand-trigger='hover'
  ></el-cascader>
</el-form-item>
    </el-tab-pane  >
                <!-- 参数数据 -->

    <el-tab-pane label="商品参数"  name='1'>
       
       <el-form-item :label="item.attr_name" v-for=" (item,index) in cat_params" :key="index">

        <el-checkbox-group v-model="item.attr_vals">
    <el-checkbox  class='checkbox' :label= "item2" border  v-for="(item2,index2) in item.attr_vals" :key="index2"></el-checkbox>
  
  </el-checkbox-group>
  </el-form-item>
    </el-tab-pane>
    <el-tab-pane label="商品属性"  name='2'>
        
<el-form-item :label="item.attr_name"  v-for="(item,index) in cat_shuxing" :key="index"><br>
    <el-input  v-model="item.attr_vals"  >
    </el-input>
  </el-form-item>
    </el-tab-pane>
    
    <el-tab-pane label="商品内容"   name='4'>

         <quill-editor id="quill-editor"
    v-model="addGoodsForm.goods_introduce"
  />
  <el-button type="primary"  @click="add" class="anniu">添加商品</el-button>

    </el-tab-pane>
  </el-tabs>
</el-form>

</el-card>



    </div>
</template>
<script>
import _ from 'lodash'
export default {
    name : 'goodAdd',
    methods:{
        // 切换tabs触发事件
        qiehuan(a){
            // 发送请求,请求参数数据
            if(a.index =='1'){
                    this.$http.get(`categories/${this.cate_id}/attributes`,{params:{sel:'many'}}).then(
                        res=>{
                            if(res.data.meta.status !==200)  return this.$message.error('获取参数失败!')


                    res.data.data.forEach(item=>{
                        if(item.attr_vals.length ==0 ){
                            item.attr_vals = []
                        }else{
                            item.attr_vals =   item.attr_vals.split(',')
                        }
                       
                    })
                            this.cat_params = res.data.data
                        }
                    )
            }

            if(a.index == '2'){
                
            this.$http.get(`categories/${this.cate_id}/attributes`,{params:{sel:'only'}}).then(res=>{
        

                if(res.data.meta.status !== 200)  return

                //   res.data.data.forEach(item=>{
                //         if(item.attr_vals.length ==0 ){
                //             item.attr_vals = []
                //         }else{
                //             item.attr_vals =   item.attr_vals.split(',')
                //         }
                       
                //     })

                this.cat_shuxing = res.data.data
        
            })    


            }


        },
        xuanzeFenlei(){
    
 if(this.selectedOptions.length !== 3) return this.selectedOptions = []
           
             this.cate_id =  this.selectedOptions[2]
            this.addGoodsForm.goods_cat = this.selectedOptions
           },
            //切换 tabs的钩子
            qiehuanTab(activeName, oldActiveName){

             if(oldActiveName == '0' && this.selectedOptions.length !== 3 ){

                this.$message.warning('请选择商品分类')

                 return false

             }else{
           
                 this.active = activeName


             }
          
            },
            //监听点击添加商品按钮
            add(){
                this.$refs.addGoodsForm.validate(viod=>{
        if(!viod) return this.$message.warning('请填写必要的内容！')


                var addGoods = _.cloneDeep(this.addGoodsForm)

          addGoods.goods_cat   =    addGoods.goods_cat.join(',')

    
                this.cat_params.forEach(item=>{

                         
                         const newinfo = {attr_id: item.attr_id, 
                         
                         attr_vals: item.attr_vals.join(',') }
                   
                        this.addGoodsForm.attrs.push(newinfo)
                   })


                    this.cat_shuxing.forEach(item=>{
                        const info = {
                            attr_id : item.attr_id , 
                            attr_vals:item.attr_vals
                        }

                        this.addGoodsForm.attrs.push(info)
                    })



        addGoods.attrs = this.addGoodsForm.attrs

                    // 将内容上传到后台服务器种
                    this.$http.post('goods',addGoods).then(res=>{

                        console.log(res.data)
                        if(res.data.meta.status !== 201) return this.$message.error(res.data.meta.message)
                        
                        this.$message.success('添加商品成功！')

                        this.$router.push('/goods')

                    })
                })
            }
          
    },
        
    created(){
        //获取分类列表数据
        this.$http.get('categories').then(res=>{
            if(res.data.meta.status !== 200) return 

            this.options = res.data.data
        })
    },
    data(){
        return {
        // 步骤条
        active: '0',
        // 添加商品表单
        addGoodsForm:{
            goods_name:"",
            goods_cat:[],
            goods_price:'',
            goods_number:'',
            goods_weight:'',
            goods_introduce:'',
            attrs:[]
        },
        rules: {
          goods_name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
          ],
           goods_price: [
            { required: true, message: '请输入商品家价格', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1到 10 个字符', trigger: 'blur' }
          ],
           goods_weight: [
            { required: true, message: '请输入商品重量', trigger: 'blur' },
            { min: 1, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
           goods_number: [
            { required: true, message: '请输入商品数量', trigger: 'blur' },
            { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
          ],
        },
            //级联选择器源数据
          options:[],
        selectedOptions: [],
        // 级联选择器绑定规则
       defaultParams: {
         label: 'cat_name',
         value: 'cat_id',
         children: 'children'
     },
         // 分类的id
         cate_id : 0,
         // 分类参数
         cat_params:[],
         //静态属性
         cat_shuxing :[],
         // 接口
         headerstou : {
            Authorization: window.sessionStorage.getItem('token')
         }
        
        }
    
    }
    }

</script>
<style scoped>

.item-Form{
    margin-top: 60px;
}
.font-fenlei{
    font-size: 14px;
    margin-right: 10px;
}
.zuihou{
    margin-top: 60px;

}
.chexkbox{
    margin-right: 5px;
}
#quill-editor{
 height: 300px; 
}
.anniu{
    margin-top: 100px;
}
.steps{
    margin-top: 40px;

}
.demo-ruleForm{
    margin-top: 40px;
}
</style>