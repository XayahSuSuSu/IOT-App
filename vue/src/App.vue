<template>
  <v-app>
    <v-app-bar
        app
        flat
        absolute
        color="transparent">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-show="!drawer">智慧生鲜品储运系统</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app>
      <v-sheet class="pa-4 text-center">
        <div class="vertical-nav-header d-flex items-center ps-6 pe-5 pt-5 pb-2">
          <v-img
              :src="require('@/assets/logo.svg')"
              max-height="30px"
              max-width="30px"
              alt="logo"
              contain
              eager
              class="app-logo me-3"></v-img>
          <v-slide-x-transition>
            <h2 class="app-title text--primary">
              智慧储运
            </h2>
          </v-slide-x-transition>
        </div>
      </v-sheet>
      <v-list expand shaped class="pr-5">
        <v-list-item-group
            v-model="selected"
            color="primary">
          <v-list-item
              to="/"
              link>
            <v-list-item-icon>
              <v-icon>mdi-database</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>实时数据</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
              to="/historyData"
              link>
            <v-list-item-icon>
              <v-icon>mdi-history</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>历史记录</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
              to="/controlCenter"
              link>
            <v-list-item-icon>
              <v-icon>mdi-file</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>控制中心</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main class="v-main-root">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      selected: 0,
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.v-main-root {
  background: #f4f5fa;
}
</style>
