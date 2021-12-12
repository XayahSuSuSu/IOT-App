<template>
  <v-container>
    <v-row>
      <v-col
          cols="12"
          md="4">
        <v-card class="v-card-common">
          <v-card-title>连接状态</v-card-title>
          <v-card-subtitle>上次更新: {{ stateData[2].total }}</v-card-subtitle>
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
                  md="4"
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
<!--            <v-dialog-->
<!--                v-model="dialog_box.show"-->
<!--                persistent-->
<!--                max-width="600px"-->
<!--            >-->
<!--              <template v-slot:activator="{ on, attrs }">-->
<!--                <v-btn-->
<!--                    color="deep-purple accent-4"-->
<!--                    text-->
<!--                    v-bind="attrs"-->
<!--                    v-on="on">-->
<!--                  设置储运箱-->
<!--                </v-btn>-->
<!--              </template>-->
<!--              <v-card>-->
<!--                <v-card-title>-->
<!--                  <span class="text-h5">设置储运箱</span>-->
<!--                </v-card-title>-->
<!--                <v-card-text>-->
<!--                  <v-container>-->
<!--                    <v-form-->
<!--                        ref="form"-->
<!--                        v-model="valid"-->
<!--                    >-->
<!--                      <v-row>-->
<!--                        <v-col-->
<!--                            cols="12"-->
<!--                            sm="3"-->
<!--                        >-->
<!--                          <v-text-field-->
<!--                              v-model="dialog_box.data.VID"-->
<!--                              label="储运箱编号"-->
<!--                              required-->
<!--                          ></v-text-field>-->
<!--                        </v-col>-->
<!--                        <v-col-->
<!--                            cols="12"-->
<!--                            sm="3"-->
<!--                        >-->
<!--                          <v-text-field-->
<!--                              v-model="dialog_box.data.TinDH"-->
<!--                              label="箱内上限温度"-->
<!--                              required-->
<!--                          ></v-text-field>-->
<!--                        </v-col>-->
<!--                        <v-col-->
<!--                            cols="12"-->
<!--                            sm="3"-->
<!--                        >-->
<!--                          <v-text-field-->
<!--                              v-model="dialog_box.data.TinDL"-->
<!--                              label="箱内下限温度"-->
<!--                              required-->
<!--                          ></v-text-field>-->
<!--                        </v-col>-->
<!--                        <v-col-->
<!--                            cols="12"-->
<!--                            sm="3"-->
<!--                        >-->
<!--                          <v-text-field-->
<!--                              v-model="dialog_box.data.TG"-->
<!--                              label="可利用温差"-->
<!--                              required-->
<!--                          ></v-text-field>-->
<!--                        </v-col>-->
<!--                      </v-row>-->
<!--                      <v-row>-->
<!--                        <v-col-->
<!--                            cols="12"-->
<!--                            sm="3"-->
<!--                        >-->
<!--                          <v-text-field-->
<!--                              v-model="dialog_box.data.LXD"-->
<!--                              label="光照阈值"-->
<!--                              required-->
<!--                          ></v-text-field>-->
<!--                        </v-col>-->
<!--                        <v-col-->
<!--                            cols="12"-->
<!--                            sm="3"-->
<!--                        >-->
<!--                          <v-text-field-->
<!--                              v-model="dialog_box.data.TBegin"-->
<!--                              label="起始时间"-->
<!--                              required-->
<!--                          ></v-text-field>-->
<!--                        </v-col>-->
<!--                        <v-col-->
<!--                            cols="12"-->
<!--                            sm="3"-->
<!--                        >-->
<!--                          <v-text-field-->
<!--                              v-model="dialog_box.data.TEnd"-->
<!--                              label="终止时间"-->
<!--                              required-->
<!--                          ></v-text-field>-->
<!--                        </v-col>-->
<!--                        <v-col-->
<!--                            cols="12"-->
<!--                            sm="3"-->
<!--                        >-->
<!--                          <v-text-field-->
<!--                              v-model="dialog_box.data.VStatus"-->
<!--                              label="储运箱状态"-->
<!--                              required-->
<!--                          ></v-text-field>-->
<!--                        </v-col>-->
<!--                      </v-row>-->
<!--                    </v-form>-->
<!--                  </v-container>-->
<!--                </v-card-text>-->
<!--                <v-card-actions>-->
<!--                  <v-spacer></v-spacer>-->
<!--                  <v-btn-->
<!--                      color="blue darken-1"-->
<!--                      text-->
<!--                      @click="dialog_box.show = false"-->
<!--                  >-->
<!--                    取消-->
<!--                  </v-btn>-->
<!--                  <v-btn-->
<!--                      color="blue darken-1"-->
<!--                      text-->
<!--                      @click="addBox"-->
<!--                  >-->
<!--                    录入-->
<!--                  </v-btn>-->
<!--                </v-card-actions>-->
<!--              </v-card>-->
<!--            </v-dialog>-->
            <v-dialog
                v-model="dialog_obj.show"
                persistent
                max-width="600px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="deep-purple accent-4"
                    text
                    v-bind="attrs"
                    v-on="on">
                  物品信息
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">物品信息</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-form
                        ref="form"
                        v-model="valid"
                    >
                      <v-row>
                        <v-col
                            cols="12"
                            sm="6"
                        >
                          <v-text-field
                              v-model="dialog_obj.data.VID"
                              label="储运箱编号"
                              required
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                        >
                          <v-text-field
                              v-model="dialog_obj.data.PID"
                              label="物品编号"
                              required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="dialog_obj.show = false"
                  >
                    确认
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog
                v-model="dialog_limit.show"
                persistent
                max-width="600px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="deep-purple accent-4"
                    text
                    v-bind="attrs"
                    v-on="on">
                  阈值管理
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">阈值管理</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-form
                        ref="form"
                        v-model="valid"
                    >
                      <v-row>
                        <v-col
                            cols="12"
                            sm="4"
                        >
                          <v-text-field
                              v-model="dialog_limit.data.TinDH"
                              label="温度上限"
                              required
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="4"
                        >
                          <v-text-field
                              v-model="dialog_limit.data.TinDL"
                              label="温度下限"
                              required
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="4"
                        >
                          <v-text-field
                              v-model="dialog_limit.data.TG"
                              label="温差"
                              required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                            cols="12"
                            sm="4"
                        >
                          <v-text-field
                              v-model="dialog_limit.data.LXD"
                              label="光照阈值"
                              required
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="4"
                        >
                          <v-text-field
                              v-model="dialog_limit.data.TBegin"
                              label="起始时间"
                              required
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="4"
                        >
                          <v-text-field
                              v-model="dialog_limit.data.TEnd"
                              label="结束时间"
                              required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="dialog_limit.show = false"
                  >
                    取消
                  </v-btn>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="addMyControlData"
                  >
                    修改
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
          cols="12"
          md="12">
        <v-card class="v-card-common mt-10 mb-10">
          <v-card-title>数据变化</v-card-title>
          <v-card-subtitle>
            <div>
              仅展示最新10条数据
            </div>
          </v-card-subtitle>
          <ve-line :data="chartData"></ve-line>
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
