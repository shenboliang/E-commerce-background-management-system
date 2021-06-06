<template>
    <div class="roles">
        
        <!-- 面包屑区域 -->

    <el-breadcrumb separator=">">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>权限管理</el-breadcrumb-item>
  <el-breadcrumb-item>权限列表</el-breadcrumb-item>
</el-breadcrumb>

        <!-- 列表内容 -->

 <el-card class="box-card" >
 <el-table  :data="list" stripe  style="width: 100%" border>
      <el-table-column   type="index" width="50"> </el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径">
    </el-table-column>
    <el-table-column
      prop="level"
      label="权限等级">
    <template slot-scope="scope">
<el-tag v-if="scope.row.level == '0' " >等级一</el-tag>
<el-tag type="success" v-else-if="scope.row.level=='1'">等级二</el-tag>
<el-tag type="warning" v-else>等级三</el-tag>
    </template>
    </el-table-column>
  </el-table>
</el-card>
</div>
</template>
<script>
import {requestList} from '../../nextwork/requestQuan.js'

export default {
    name:'roles',
    created(){

        this.getList()


    },
    data(){
        return {
            //  存放全部列表数据

            list:[]
        }
    },
    methods:{
        // 获取列表信息方法
        getList(){
              requestList().then(res=>{
                  if(res.data.meta.status !== 200 )  return             
                    this.list = res.data.data          
                    
     })
        }
    }
}
</script>
<style scoped>

.box-card{
    margin-top: 40px;
}

</style>