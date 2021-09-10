<template>
  <v-container>
    <v-card class="v-card-common mt-10">
      <v-card-title>实时状态</v-card-title>
      <v-card-subtitle>更新频率:2s</v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col
              v-for="data in stateData"
              :key="data.title"
              cols="6"
              md="3"
              class="d-flex align-center">
            <v-avatar
                size="44"
                :color="data.color"
                rounded
                class="elevation-1">
              <v-icon
                  dark
                  color="white"
                  size="30">
                {{ data.icon }}
              </v-icon>
            </v-avatar>
            <div class="ms-3">
              <p class="text-xs mb-0">
                {{ data.title }}
              </p>
              <h3 class="text-xl font-weight-semibold">
                {{ data.total }}
              </h3>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
            color="deep-purple accent-4"
            text>
          刷新
        </v-btn>
        <v-btn
            color="deep-purple accent-4"
            text>
          查看历史数据
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="v-card-common mt-10 mb-10">
      <v-card-title>数据变化</v-card-title>
      <v-card-subtitle>上次更新: 30秒前</v-card-subtitle>
      <v-sparkline
          :value="sparklines.value"
          :gradient="sparklines.gradient"
          :smooth="sparklines.radius || false"
          :line-width="sparklines.width"
          auto-draw
      >
        <template v-slot:label="item">
          {{ item.value }}
        </template>
      </v-sparkline>
      <v-card-actions style="margin-top: 20px">
        <v-btn
            color="deep-purple accent-4"
            text>
          刷新
        </v-btn>
        <v-btn
            color="deep-purple accent-4"
            text>
          查看历史数据
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script src="./index.js"></script>
<style src="./index.less" lang="less" scoped></style>
