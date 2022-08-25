//路由文件
import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login/login.vue'

const routes = [{
        path: '/',
        name: 'Main',
        component: () =>
            import ('../views/Main.vue'),
        redirect: '/login',

        children: [{
                path: '/home',
                name: 'home',
                component: () =>
                    import ('../views/Home/Home.vue'),
            },
            {
                path: '/mall',
                name: 'mall',
                component: () =>
                    import ('../views/Mall/Mall.vue'),
            },
            {
                path: '/user',
                name: 'user',
                component: () =>
                    import ('../views/User/User.vue'),
            },
            {
                path: '/page1',
                name: 'page1',
                component: () =>
                    import ('../views/Others/Page1.vue'),
            },
            {
                path: '/page2',
                name: 'page2',
                component: () =>
                    import ('../views/Others/Page2.vue'),
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/Login/login.vue')
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next()
    const tokenStr = localStorage.getItem('token')
    if (!tokenStr) {
        next('/login')
    } else {
        next()
    }
})
export default router