import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/index'
import VCharts from 'v-charts'

Vue.config.productionTip = false

Vue.use(VCharts)

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

new Vue({
  vuetify,
  render: h => h(App),
  router
}).$mount('#app')
