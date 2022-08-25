<template>
 <el-header>
    <div class="l-content">
        <!-- 图标 -->
        <el-button size="small" @click="handleCollapse">
            <el-icon :size="20">
                <Menu />
            </el-icon>
        </el-button>
        
        <el-breadcrumb separator="/" class="bread">
            <!-- 首页是一定存在的直接写死 -->
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
     <el-breadcrumb-item :to=" current.path" v-if="current">{{current.label}}</el-breadcrumb-item>
   
  </el-breadcrumb>
    </div>
    <div class="r-content">
        <el-dropdown>
    <span class="el-dropdown-link">
     <img class="user" :src="getImgSrc('user')" alt="">
      
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="toHome">个人中心</el-dropdown-item>
        <el-dropdown-item @click="onLogout">退出</el-dropdown-item>
       
       
        
      </el-dropdown-menu>
    </template>
  </el-dropdown>
    </div>
 </el-header>
</template>

<script>
import { computed } from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
    export default {
        setup(){
            const getImgSrc= (user) =>{
               //import.meta.url
               //new URL('../assets/user.jpg',import.meta.url)
               //${user}
                return new URL('../assets/user.jpg',import.meta.url).href
            }
            let store=useStore()
            let handleCollapse =()=>{
                //调用vuex中的mutations
                store.commit('updateIsCollapse')
            }
            //计算属性
            const current=computed(()=>{
                return store.state.currentMenu
            })
            //退出到登录页
            const router=useRouter()
            const onLogout=()=>{
                localStorage.removeItem('token')
                router.push('/login')
            }
            //到个人中心即首页
            const toHome=()=>{
                router.push('/home')
            }
            return{
                getImgSrc,handleCollapse,current,onLogout,toHome
            }
        }
    }
</script>

<style lang="less" scoped>
header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: #333;
}
.r-content{
    .user{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
.l-content{
    display: flex;
     align-items: center;
     .el-button{
        margin-right: 20px;
     }
     h3{
        color: #fff;
     }
}
/* .bread /deep/ span{
    color: #fff !important;
    cursor: pointer !important;
} */
:deep(.bread span){
    color: #fff !important;
    cursor: pointer !important;
}
</style>