<template>
    <div class="goods">
        <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="hander">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
  <el-breadcrumb-item>商品列表</el-breadcrumb-item>
</el-breadcrumb>

        <!-- 添加商品对话框 -->


<el-dialog
  title="添加商品"
  :visible.sync="dialogVisible"
  width="50%">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>


            <!-- 卡片内容 -->
    
    <el-card class="box-card">
    <el-input placeholder="请输入内容"  style="width:38%"  v-model="findGoods" clearable >
    <el-button slot="append" icon="el-icon-search" @click="clickFind"></el-button>
  </el-input>
                <!-- 添加商品按钮 -->
    <el-button type="primary" class="btn" @click="addGoods">添加商品</el-button>

      <el-table
      :data="goodsList"
      style="width: 100%" border  class="table">
      <el-table-column  type='index'></el-table-column>
      <el-table-column prop="goods_name" label="商品名称"   ></el-table-column>
      <el-table-column  prop="goods_price" label="商品价格(元)" width='120px'></el-table-column>
      <el-table-column  prop="goods_weight" label="商品重量" width='100px'></el-table-column>
      <el-table-column  prop="upd_time" label="创建时间" width='189px' >
            <template slot-scope="scope">
                {{scope.row.upd_time | dateForn}}
            </template>

      </el-table-column>
      <el-table-column   label="操作"  width='200px'>
<template  slot-scope="scope">
<el-button type="primary" icon="el-icon-edit"></el-button>
<el-button type="danger" icon="el-icon-delete" @click="clickDelete(scope.row)"></el-button>

          </template>
      </el-table-column>
    </el-table>
        <!-- 分页功能区域 -->

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="goodsListParams.pagenum"
      :page-sizes="[ 10, 20, 30, 50]"
      :page-size="goodsListParams.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

</el-card>

    </div>
</template>
<script>
export default {
    name:'goods',
    data(){
        return {
            // 商品列表
            goodsList:[],
            // 商品的参数的表达
            goodsListParams:{
                query:'',
                pagenum: 1 ,
                pagesize: 10
            },
            //商品总数
            total: 0 ,
            // 查找商品的关键字
            findGoods: '',
            dialogVisible:false 

        }
    },
    created(){

        this.getdata()
    },
    methods:{
        //获取数据
       async  getdata(){
             const   data =  await  this.$http.get('goods',{params:this.goodsListParams})

              if(data.data.meta.status !== 200) return  this.$message.error('获取数据失败')

           this.goodsList =    data.data.data.goods

             this.total = data.data.data.total
            },
        // 页码发送变化-->更改每页显示的条数
        handleSizeChange(num){

                 this.goodsListParams.pagesize = num

                 this.getdata()

        },
        //当前页码发生变化
        handleCurrentChange(currentnum){

               this.goodsListParams.pagenum = currentnum

               this.getdata()
        } ,
        //监听输入框旁边的查找图标的点击事件
        clickFind(){
            this.goodsListParams.query  = this.findGoods

             this.getdata()
        },
        //监听删除点击按钮
        clickDelete(data){

            this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
             this.$http.delete(`goods/ ${data.goods_id}`).then(res=>{

            if(res.data.meta.status !== 200)  return this.$message.error('删除商品失败')

            this.$message.success('删除商品成功')

            this.getdata()
        })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });


        },
        addGoods(){
       

            this.$router.push('/goods/add')
        }


    }

}
</script>
<style scoped>
.hander{
    margin-bottom: 20px;
}
.table{
    margin-top: 30px;
}
.btn{
    margin-left: 30px;
}
</style>