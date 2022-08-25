import { ITEM_RENDER_EVT } from 'element-plus/es/components/virtual-list/src/defaults'
import { createStore } from 'vuex'
// import { user } from './user'
export default createStore({
    // modules: { user },
    state: {
        isCollapse: true,
        currentMenu: null,
        tabsList: [{
            path: '/',
            name: 'home',
            label: '首页',
            icon: 'home-filled'
        }]

    },
    mutations: {
        updateIsCollapse(state) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val) {
            //判断

            if (val.name == 'home') {
                state.currentMenu = null
            } else {
                //判断左侧点击的是否在导航栏打开，如果没有就将其打开
                state.currentMenu = val
                let result = state.tabsList.findIndex(item => item.name === val.name)
                result == -1 ? state.tabsList.push(val) : ''
            }
        },
        closeTab(state, val) {
            // 如果点击的tag的name能够在tabList找到，就在tabList删除这一项
            let res = state.tabsList.findIndex(item => item.name == val.name)
            state.tabsList.splice(res, 1) //从res处开始删除，删除长度为1
        }
    }
})