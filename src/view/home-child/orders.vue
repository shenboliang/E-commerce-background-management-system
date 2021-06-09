<template>
    <div class="orders">
    
    <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>订单管理</el-breadcrumb-item>
  <el-breadcrumb-item>订单列表</el-breadcrumb-item>
</el-breadcrumb>
         
            <!-- card区域 -->

<el-card class="box-card">

                    <!-- 搜索框 -->
  
     <el-input placeholder="请输入内容" v-model="orderParams.query"  class="input-with-select" style="width:40%">
    <el-button slot="append" icon="el-icon-search" @click="reach"></el-button>
  </el-input>


       <el-table :data="list"  style="width: 100%" border class="table">
    <el-table-column  type='index'  ></el-table-column>
    <el-table-column  prop="order_number"  label="订单号"   ></el-table-column>
     <el-table-column  prop="order_price"  label="订单价格" width='150px'></el-table-column>
    <el-table-column  prop="order_pay"  label="是否付款"  width='100px'>
        <template  slot-scope="scope">

                <el-tag type="danger" v-if="scope.row.order_pay == '0'">未付款</el-tag>
                <el-tag type="success" v-else>已付款</el-tag>
        </template>
    </el-table-column>
    <el-table-column  prop="is_send"  label="是否发货" width='80px'></el-table-column>
    <el-table-column  prop="create_time"  label="下单时间" width='200px'>
            <template slot-scope="scope">

                {{scope.row.create_time | dateForn}}
            </template>

    </el-table-column>
    <el-table-column  prop="date"  label="操作"  width='250px'>
        <template>
<el-button type="primary" icon="el-icon-edit"  @click="changeAddress"></el-button>
<el-button type="success" icon="el-icon-location-outline" @click="timelineclick"></el-button>
        </template>

    </el-table-column>
 </el-table>
        <!-- 分页区域 -->

  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="orderParams.pagenum"
      :page-sizes="[5, 10, 15, 25]"
      :page-size="orderParams.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total" class="pagination">
    </el-pagination>
</el-card>

            <!-- 编辑地址对话框 -->

<el-dialog
  title="修改地址"
  :visible.sync="dialogVisible"
  width="50%" @close='handleChange'>
<el-form :model="addressForm" :rules="rules" ref="addressForm" label-width="100px">

         <el-form-item label="省市区/县" prop="address1">
         
              <el-cascader
    v-model="addressForm.address1"
    :options="cityData"
    :props="{ expandTrigger: 'hover' }"
      style="width:300px" ></el-cascader>

         </el-form-item>

         <el-form-item label="详细地址" prop="address2">
            <el-input v-model="addressForm.address2"></el-input>
         </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>


                <!-- 查看时间进度对话框 -->

<el-dialog
  title="查看进度"
  :visible.sync="timeline"
  width="50%">

 <!-- <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :timestamp="activity.timestamp">
      {{activity.content}}
    </el-timeline-item>
  </el-timeline> -->

  <span slot="footer" class="dialog-footer">
    <el-button @click=" timeline = false">取 消</el-button>
    <el-button type="primary" @click=" timeline = false">确 定</el-button>
  </span>
</el-dialog>


    </div>
</template>
<script>
import cityData from './citydata.js'

export default {
    name:'orders',
    created(){
        this.getorderData()
    },
    methods:{
        // 获取订单数据
        getorderData(){
            this.$http.get('orders',{params:this.orderParams}).then(res=>{
                if(res.data.meta.status !== 200 )  return  this.$message.warning('获取不到订单数据！')

                this.list = res.data.data.goods

              this.total =  res.data.data.total

                //   this.total = this.list.total  
            })
        },
        // 监听搜索按钮的点击事件
        reach(){
            if(this.orderParams.query.length == 0 ) return this.$message.warning('请输入要查询的订单！')
          this.getorderData()

            console.log(this.list)
        },
        // 监听分页的每页显示条数变化
        handleSizeChange(num){

                this.orderParams.pagesize = num

                this.getorderData()

        },
        //监听当前页发生变化
        handleCurrentChange(n){
            this.orderParams.pagenum = n

            this.getorderData()

        },
        //点击修改按钮
        changeAddress(){
            this.dialogVisible = true
        },
        // 监听修改地址对话框的关闭事件
        handleChange(){
            this.$refs.addressForm.resetFields()
          
        },
        // 监听查看进度点击事件
         timelineclick(){
            //  this.timeline = true

             this.$message.error('不好意思，后端接口出现问题，暂时无法查看物流信息！')

            //  this.$http.get('kuaidi/1106975712662').then(res=>{

            //         console.log(res)

            //  })
         }
    },
    data(){
        return {
            //获取数据的参数
            orderParams:{
                query:'',
                //当前页面
                pagenum:  1 ,
                //显示的页数
                pagesize : 5 ,
                },
                list:[],
                //总条数
                total: 0 ,
                //监听修改地址对话框的显示
                dialogVisible:false,
                //地址表单
                addressForm : {
                    address1:[],
                    address2:''

                },
                //表单验证
                rules:{
                    address2:[
                { required: true, message: '请输入详细地址', trigger: 'blur' },
                    ],

                    address1:[
            { required: true, message: '请选择省份或者市区', trigger: 'blur' },
           
                    ]
                } ,
                //地址区域数据
                cityData:cityData , 
                // 进度时间线对话框
                timeline: false,
                //查看物流信息数据
                wuliuList:[]

        }
    }

}
</script>
<style scoped>
.box-card{
    margin-top: 40px;
}
.nput-with-select{
    margin-top: 40px;
}
.table{
    margin-top: 40px;
}
.pagination{
    margin-top: 20px;
}
</style>