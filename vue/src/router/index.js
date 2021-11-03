import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            meta: {title: '首页'},
            component: () => import('@/pages/index/index.vue')
        },
        {
            path: '/historyData',
            name: 'HistoryData',
            meta: {title: '历史数据'},
            component: () => import('@/pages/historyData/index.vue')
        }
    ]
})
