<template>
<div class="goods">
  <!-- 搜索区域 -->
<div class="header">
  <!-- 失去焦点触发，enter或点击按钮 -->
  <!-- <el-input-number v-model="inputIndex" :min="0" :max="200" @change="handleChange" /> -->
  <el-input class="input_container" v-model="inputIndex" placeholder="请输入编号查询数据" @keyup.esc="inputIndex=''" @change="searchInput"/>
  <el-button type="primary" @click="getUser" >查询</el-button>
  <el-button type="primary" @click="handleDialogValue">添加</el-button>
</div>
<!-- 表格区域 -->
    <div class="table">
      <el-table :data="tableData"  style="height:480px">
      <el-table-column type="selection" width="55" />
       <el-table-column v-for="item in tableLabel" :key="item.prop" :label="item.label" :prop="item.prop" :width="item.width?item.width:125"/>
       <!-- 操作 -->
    <el-table-column prop="address" label="操作" >
      <el-button size="small" @click="handleEdit(scope.$index, scope.row)" >编辑</el-button >
      <el-button size="small" type="danger"  @click="handleDelete(scope.$index, scope.row)"  >删除</el-button>
        </el-table-column>
  </el-table>
   
    </div>
     <!-- 分页区域 -->
    <div class="page">
      <el-pagination small background layout="prev, pager, next,jumper" :total="config.total" :page-size="config.pageSize" 
        @current-change="changePage" />
    </div>
    <!-- form表单 -->
   
    <el-dialog :model-value ="dialogVisible" :title="dialogTitle"   width="40%"  @close="handleCloseDialog">
    <el-form ref="formRef" :model="form" label-width="70px">
    <el-form-item label="编号" prop="index">
      <el-input v-model="form.index" />
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model="form.age" />
    </el-form-item>
    <el-form-item label="性别" prop="sexLabel">
      <el-input v-model="form.sexLabel" />
    </el-form-item>
    <el-form-item label="出生日期" prop="birth">
      <el-input v-model="form.birth" />
    </el-form-item>
    <el-form-item label="地址" prop="addr">
      <el-input v-model="form.addr" />
    </el-form-item>
  </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCloseDialog">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
          
        
      </span>
    </template>
  </el-dialog>
</div>

</template>  
          
         
         
     <script>
import {defineComponent,getCurrentInstance,onMounted,reactive,ref } from 'vue'

  
  export default defineComponent({
    setup() {
      const {proxy}=getCurrentInstance()
      const tableData=ref([])
      const tableLabel=reactive([
        {prop:"index",label:"编号"},
        {prop:"name",label:"姓名"},
        {prop:"age",label:"年龄"},
        {prop:"sexLabel",label:"性别"},
        {prop:"birth",label:"出生日期",width:200},
        {prop:"addr",label:"地址",width:320},
      ])
      // 控制分页
      const config=reactive({
        total:200,
        pageSize:10,
        page:1
      })
      
	      onMounted(()=>{
	        getUserData(config)
	        
	      })
      
      //得到列表数据并渲染get
      const getUserData=async(config,pageNum)=>{
       let res= await proxy.$axios.getUserData(config);
      config.total=res.total
      config.pageSize=res.pageSize
      config.page=pageNum||1
      const newList=res.list.filter((item,index)=>{
        return index>=(config.page-1)*config.pageSize&&index<config.page*config.pageSize
})
     
      //console.log(newList);
      tableData.value=newList
        tableData.value=newList.map((item)=>{
          item.sexLabel=item.sex===0?'女':'男'
          return item 
       })  
       }
       const changePage=(pageNum)=>{
       // console.log(pageNum);
        config.page=pageNum
        getUserData(config,pageNum)
        
       }

       //添加用户
       const dialogVisible=ref(false)
       const dialogTitle=ref('')
       const handleDialogValue=()=>{
        dialogTitle.value='添加用户'
        dialogVisible.value=true
       }   
        const handleCloseDialog=()=>{
         dialogVisible.value=false
      }
 
         const handleConfirm=()=>{
          postUserData(form.value)
          handleCloseDialog()
      }
      const formRef=ref(null)
      const form=ref({
          index:'',
          name:'',
          age:'',
          sexLabel:'',
          birth:'',
          addr:''
      })
      //添加列表数据
      const postUserData=async(data)=>{
        let res=await proxy.$axios.postUserData(data)
        proxy.$message.success('数据添加成功！')
        // data.value=''
        //tableData.unshift(data.index,data.name,data.age,data.sexLabel,data.birth,data.addr)
      }
       //查询
       /* const inputIndex
       const getUser=()=>{
          tableData.value=tableData.value.filter(item=>item.index==inputIndex)
       } */
       //添加列表数据
      /*  const createUser=(input)=>{
         
        //unshift将元素添加到数组开头
        tableData.unshift({
            index:total,
            id: Mock.Random.guid(),
            name: name,
            addr: addr,
            age: age,
            birth: birth,
            sex: sex
        })
        total++
       } */
       
        return{
        tableLabel,config,tableData,dialogVisible,formRef,form,dialogTitle,
        getUserData,changePage,handleDialogValue,handleConfirm,handleCloseDialog
      } 
        }
       
       
      
    
    
  })
</script> 
         




  
<style lang="less" scoped>
 .goods{
  margin: 20px;
 }
 .header{
  display: flex;
  .input_container{
    width: 50%;
  }
  button{
    margin-left: 20px;
  }
 }
 .table{
  margin: 20px 0;
 }
/*  .page{
    
 } */
</style>