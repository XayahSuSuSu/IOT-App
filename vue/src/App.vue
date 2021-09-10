<template>
  <v-app>
    <v-main class="v-main-root">
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
                智慧大棚
              </h2>
            </v-slide-x-transition>
          </div>
        </v-sheet>
        <v-list expand shaped class="pr-5">
          <v-list-item-group
              v-model="selected"
              color="primary">
            <v-list-item
                v-for="[icon, text] in links"
                :key="icon"
                link>
              <v-list-item-icon>
                <v-icon>{{ icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      drawer: null,
      selected: 0,
      links: [
        ['mdi-database', '实时数据'],
        ['mdi-file', '控制中心'],
      ],
    }
  },
}
</script>
<style lang="less" scoped>
.v-main-root {
  background: #f4f5fa;
}
</style>
