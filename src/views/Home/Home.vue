<template>
  <el-row class="home" :gutter="20">
  <!-- gutter为分栏的间隔 -->
  <el-col :span="8" style="margin-top:20px">
  <!-- span为行数 -->
  <!-- 左侧 -->
  <!-- 左上 -->
  <el-card shadow="hover">
    <div class="user">
      <img src="../../assets/user.jpg" alt="">
      <div class="userInfo">
        <p class="name">李光光</p>
        <p class="role">超级管理员</p>
      </div>
    </div>
    <div class="login-info">
      <p>上次登录时间:<span>2022-08-09</span></p>
      <p>上次登录地点:<span>武汉</span></p>
    </div>
  </el-card>
  <!-- 左下 -->
   <el-card shadow="hover" style="margin-top:60px" height="450px">
    
      <el-table :data="tableData">
      <el-table-column v-for="(val,key) in tableLabel" :key="key" :prop="key" :label="val">

      </el-table-column>
      </el-table>
  </el-card>
  </el-col>
  <!-- 右侧 -->
 
   <el-col :span="16"  style="margin-top:20px"> 
    <!-- 右上 -->
   <div class="num">
    <el-card shadow="hover" :body-style="{display:'flex',padding:0}" v-for="item in countData" :key="item.name">
      <component class="icons" :is="item.icon" :style="{background:item.color}"></component>
      <div class="details">
        <p class="num">￥{{item.value}}</p>
        <p class="txt">{{item.name}}</p>
      </div>
    </el-card>
   </div>
   <!-- 右下ECharts -->
   <el-card style="height:280px" shadow="hover">
    <div ref="echart" style="height:280px" ></div>
  </el-card>
  <div class="graph">
    <!-- 柱状图 -->
    <el-card style="height:260px" shadow="hover">
    <div ref="userechart" style="height:220px" ></div>
    </el-card>
    <!-- 饼状图 -->
    <el-card style="height:260px" shadow="hover">
    <div ref="videoechart" style="height:220px" > </div>
    </el-card>
  </div>
   </el-col>
    

  </el-row>
</template>

<script>
import { defineComponent,getCurrentInstance,onMounted,reactive,ref} from 'vue'
import * as echarts from 'echarts'

export default defineComponent({
  
   setup(){
        const {proxy} =getCurrentInstance();
         const tableData =ref([])
         const countData =ref([])
      const tableLabel={
        name:'手机',
        todayBuy:'今日购买',
        monthBuy:'本月购买',
        totalBuy:'总购买'
      }
   
      const getTableList=async ()=>{
        //proxy相当于this
       let res= await proxy.$axios.getTableData();
       //console.log(res);
       tableData.value=res
      }
      //获取首页count数据
      const getCountData=async ()=>{
        let res=await proxy.$axios.getCountData();
        countData.value=res
      }
      //echarts表格的配置
      let xOptions=reactive({
        // 图例文字颜色
      textStyle: {
        color: "#333",
      },
     grid: {
      left: "20%",
    },
    // 提示框
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category", // 类目轴
      data: [],
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
      axisLabel: {
        interval: 0,
        color: "#333",
      },
    },
    yAxis: [
      {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
      },
    ],
    color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
    series: [],
   
      })
     let pieOptions=reactive({
       tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [],
     })
     let userData=reactive({
      xData:[],
      series:[],
     })
     let videoData=reactive({
      series:[],
     })
     let orderData=reactive({
        xData:[],
        series:[],
      })
      //获取数据
      const getChartsData=async ()=>{
        let res=await proxy.$axios.getEchartsData()
        //console.log(res);
        let orderRes=res.orderData
        let userRes=res.userData
        let videoRes=res.videoData
        orderData.xData=orderRes.date
        const keyArray=Object.keys(orderRes.data[0])
        const series=[]
        keyArray.forEach((key)=>{
          series.push({
            name:key,
            data:orderRes.data.map(item=>item[key]),
            type:'line',
          })
        })
        orderData.series=series;
        xOptions.xAxis.data=orderData.xData
        xOptions.series=orderData.series
        //userData进行渲染
        let hEcharts=echarts.init(proxy.$refs['echart'])
        hEcharts.setOption(xOptions);
        //柱状图
        userData.xData=userRes.map(item=>item.date)
        userData.series=[
          {
            name:'新增用户',
            data:userRes.map(item=>item.new),
            type:'bar',
          },
           {
            name:'活跃用户',
            data:userRes.map(item=>item.active),
            type:'bar',
          },
        ]
         xOptions.xAxis.data=userData.xData
        xOptions.series=userData.series
         let uhEcharts=echarts.init(proxy.$refs['userechart'])
        uhEcharts.setOption(xOptions);
        //饼状图
        videoData.series=[
          {
            data:videoRes,
            type:'pie',
          },
        ]
        pieOptions.series=videoData.series
        let vhEcharts=echarts.init(proxy.$refs['videoechart'])
        vhEcharts.setOption(pieOptions);
      }
      onMounted(()=>{
        getTableList()
         getCountData()
         getChartsData()
      })
      return{
        tableData,tableLabel,countData,
      }
   }
     
    
})

</script>

<style lang="less" scoped>
.home{
  .user{
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    img{
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right:40px ;
    }
    .userInfo{
      .role{
        color: red;
        font-size: 18px;
      }
    }
    p{
      line-height: 30px;
    }
  }
  
    .login-info{
      p{
        line-height: 30px;
        font-size: 12px;
        color: #999;
        span{
          color: #666;
          margin-left: 70px;
        }
      }
    }
}
.num{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-card{
    width: 32%;
    margin-bottom: 20px;
  }
  .icons{
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .details{
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .num{
      font-size: 30px;
      margin-bottom: 10px;
    }
    .txt{
      font-size: 14px;
      text-align: center;
      color: #999;
    }
  }
}
.graph{
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card{
    width: 48%;
  }
}
</style>