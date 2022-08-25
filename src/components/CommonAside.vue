<template>
     <el-aside width="$store.state.isCollapse ?'200px':'64px'">
      
        <!-- collapse-transition为折叠动画 -->
        <el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" :collapse="!$store.state.isCollapse" :collapse-transition="true">
        <h3 v-show="$store.state.isCollapse" style="font-size:14px">后台管理</h3>
        <h3 v-show="!$store.state.isCollapse" style="font-size:14px">后台</h3>
              <el-menu-item :index="item.path" v-for="item in noChildren()" :key="item.path" @click="clickMenu(item)">
          
          <component class="icons" :is="item.icon"></component>
          <span>{{item.label}}</span>
        </el-menu-item>

        <el-sub-menu :index="item.label" v-for="item in hasChildren()" :key="item.path" >
          <template #title>
            <component class="icons" :is="item.icon"></component>
          <span>{{item.label}}</span>
         </template>
          <el-menu-item-group >
            <el-menu-item :index="subItem.path" v-for="(subItem,subIndex) in item.children" :key="subIndex" @click="clickMenu(subItem)">

            <component class="icons" :is="subItem.icon"></component>
          <span>{{subItem.label}}</span>
            </el-menu-item>
           </el-menu-item-group>
           
        </el-sub-menu>
        </el-menu> 
       
     </el-aside>
       
</template>

<script>
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
export default{
  
    
    setup(){
        const store=useStore()
        const list=[
            {path:'/',name:'home',label:'首页',icon:'home-filled',url:'Home/Home'},
            {path:'/mall',name:'mall',label:'商品管理',icon:'video-play',url:'MallManage/MallManage'},
            {path:'/user',name:'user',label:'用户管理',icon:'user',url:'UserManage/UserManage'},
            {label:'其他',icon:'location',path:'/other',children:[
                {path:'/page1',name:'page1',label:'页面1',icon:'setting',url:'Other/PageOne'},
                 {path:'/page2',name:'page2',label:'页面2',icon:'setting',url:'Other/PageTwo'},
            ]},
        ]
        const router=useRouter()
        // console.log(list.filter(item=>!item.children))
        //console.log(list.filter(item=>item.children));

        //console.log(list[0]);
        //console.log(list[1]);
       //console.log(list[3]);
      const noChildren=()=>{
       // return list[0]
    //    过滤得到无children的
        return list.filter(item=>!item.children)
      }
         const hasChildren =()=>{
            //过滤得到有children的
            
            return list.filter(item=>item.children)
            //return list[1]
        }
        const clickMenu=(item)=>{
            router.push({
                name:item.name,
            })
            //vuex 来管理
            store.commit('selectMenu',item)
        }
        return{
            noChildren,hasChildren,clickMenu,
        }
    }
}

</script>

<style lang="less" scoped>
    .icons{
        width: 18px;
        height: 18px;
        margin-right: 5px;
    }
    .el-menu{
        border-right: none;
        h3{
            line-height: 48px;
            color: #fff;
            text-align: center;
        }
    }
</style>