<template>
    <div class="repot">

            <!-- 面包屑区域 -->

   <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>数据统计</el-breadcrumb-item>
  <el-breadcrumb-item>数据报表</el-breadcrumb-item>
</el-breadcrumb>

                <!-- 卡片区域 -->

        <el-card class="box-card">
                 <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
             <div id="main" style="width: 800px;height:600px;"></div>
  
</el-card>


    </div>
</template>
<script>
import echarts from "echarts"
import _ from 'lodash'


export default {
    name:'reportss',
 async   mounted(){
      // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

         // 指定图表的配置项和数据
        const data = await this.$http.get('reports/type/1')

      const result =  _.merge(this.options,data.data.data)

      console.log(result)

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(result);

       
    },
   
    data(){
        return {
            options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
        }
    }

}
</script>
<style scoped>
.box-card{
    margin-top: 20px;
}
</style>