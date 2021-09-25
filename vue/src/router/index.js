import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {path: '/', name: 'Index', component: () => import('@/pages/index/index.vue')},
        {path: '/historyData', name: 'HistoryData', component: () => import('@/pages/historyData/index.vue')},
    ]
})
