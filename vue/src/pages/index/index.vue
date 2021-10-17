<template>
  <v-container>
    <v-row>
      <v-col
          cols="12"
          md="4">
        <v-card class="v-card-common">
          <v-card-title>连接状态</v-card-title>
          <v-card-subtitle>上次更新: {{ stateData[3].total }}</v-card-subtitle>
          <v-switch
              style="position: absolute;right: 0;top: 0"
              v-show="false"
              v-model="stateSwitcher"
              inset
          ></v-switch>
          <v-card-text>
            <v-row>
              <v-col
                  v-for="data in serverData"
                  :key="data.title"
                  cols="6"
                  md="6"
                  class="d-flex align-center">
                <v-avatar
                    size="44"
                    :color="data.color"
                    rounded>
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
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
          cols="12"
          md="8">
        <v-card class="v-card-common">
          <v-card-title>实时状态</v-card-title>
          <v-card-subtitle>更新频率: {{ refreshTime / 1000 }}s</v-card-subtitle>
          <v-switch
              style="position: absolute;right: 0;top: 0"
              v-model="stateSwitcher"
              inset
          ></v-switch>
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
                    rounded>
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
                @click="goToHistoryData"
                text>
              查看历史数据
            </v-btn>
            <v-btn
                color="deep-purple accent-4"
                @click="goToControlCenter"
                text>
              控制终端
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
          cols="12"
          md="4">
        <v-card class="v-card-common mt-10 mb-10">
          <v-card-title>数据变化 - {{ sparklines.typeCN[0] }}</v-card-title>
          <v-card-subtitle>
            <div>
              仅展示最新10条数据
            </div>
          </v-card-subtitle>
          <v-sparkline
              :value="sparklines.value[sparklines.type[0]]"
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
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
          cols="12"
          md="4">
        <v-card class="v-card-common mt-10 mb-10">
          <v-card-title>数据变化 - {{ sparklines.typeCN[1] }}</v-card-title>
          <v-card-subtitle>
            <div>
              仅展示最新10条数据
            </div>
          </v-card-subtitle>
          <v-sparkline
              :value="sparklines.value[sparklines.type[1]]"
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
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
          cols="12"
          md="4">
        <v-card class="v-card-common mt-10 mb-10">
          <v-card-title>数据变化 - {{ sparklines.typeCN[2] }}</v-card-title>
          <v-card-subtitle>
            <div>
              仅展示最新10条数据
            </div>
          </v-card-subtitle>
          <v-sparkline
              :value="sparklines.value[sparklines.type[2]]"
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
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script src="./index.js"></script>
<style src="./index.less" lang="less" scoped></style>
