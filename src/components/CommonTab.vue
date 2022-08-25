<template>
  <div class="tags">
    <el-tag :key="tag.name" v-for="tag in tags" :closable="tag.name!=='home'" 
    :effect="$route.name===tag.name? 'dark':'plain'" @click="changeMenu(tag)" @close="handleClose(tag,index)">
    <!-- @close关闭tag标签时触发 -->
    {{tag.label}}
    </el-tag>
  </div>
</template>

<script>
import {useRouter,useRoute} from 'vue-router'
import {useStore} from 'vuex'
export default {
    setup(){
        const store=useStore()
        const router=useRouter()
        const route=useRoute()
        const tags=store.state.tabsList
        //点击切换导航栏
        const changeMenu=(item)=>{
          router.push({name:item.name})
        }
        //删除tag标签
        const handleClose=(tag,index)=>{
          console.log(tags);//proxy
          console.log(tag);
          
          //console.log(proxy.target[1]);
          let length=tags.length-1
          //处理vuex中的tablist
          store.commit('closeTab',tag)
          // 做第一个判断点击关闭的tag不是路由到的tag
          if(tag.name!==route.name) return
          // 关闭最后一个路由到的tag，路由跳转到前一个tag
          //error找不到tags[index-1].name，属性未定义
          if(index===length){
            console.log(tags[index-1],index);
            router.push({
              name:tags[index-1].name
              
            })
            //console.log(1,tags[index-1].name);
          }else{
            router.push({
              name:tags[index].name
              
            })
           //console.log(tags[index-1].name);
          }
        }
        return{
            tags,changeMenu,handleClose
        }
    }
}
</script>

<style lang="less" scoped>
.tags{
  padding: 30px;
  width: 100%;
  height: 50px;
  .el-tag{
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>