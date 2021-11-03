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
            <v-dialog
                v-model="dialogs.add_books.show"
                persistent
                max-width="600px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="deep-purple accent-4"
                    text
                    v-bind="attrs"
                    v-on="on">
                  录入图书
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">录入图书</span>
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
                              v-model="dialogs.add_books.codes.rfid"
                              :rules="dialogs.add_books.rules.rfid"
                              label="图书编码"
                              required
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="4"
                        >
                          <v-text-field
                              v-model="dialogs.add_books.codes.name"
                              :rules="dialogs.add_books.rules.name"
                              label="图书名称"
                              required
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="4"
                        >
                          <v-text-field
                              v-model="dialogs.add_books.codes.place"
                              :rules="dialogs.add_books.rules.place"
                              label="存放位置"
                              required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                      icon
                      color="red"
                      @click="dialogs.help.show = true"
                  >
                    <v-icon>mdi-help-circle</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="dialogs.add_books.show = false"
                  >
                    取消
                  </v-btn>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="addBooks"
                      :disabled="ifAdding===false"
                  >
                    录入
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog
                v-model="dialogs.add_users.show"
                persistent
                max-width="600px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="deep-purple accent-4"
                    text
                    v-bind="attrs"
                    v-on="on">
                  登记用户
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">登记用户</span>
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
                              v-model="dialogs.add_users.codes.rfid"
                              :rules="dialogs.add_users.rules.rfid"
                              label="用户编码"
                              required
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                        >
                          <v-text-field
                              v-model="dialogs.add_users.codes.name"
                              :rules="dialogs.add_users.rules.name"
                              label="用户姓名"
                              required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                      icon
                      color="red"
                      @click="dialogs.help.show = true"
                  >
                    <v-icon>mdi-help-circle</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="dialogs.add_users.show = false"
                  >
                    取消
                  </v-btn>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="addUsers"
                      :disabled="ifAdding===false"
                  >
                    录入
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog
                v-model="dialogs.borrow_books.show"
                persistent
                max-width="600px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="deep-purple accent-4"
                    text
                    v-bind="attrs"
                    v-on="on">
                  借阅图书
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">借阅图书</span>
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
                            sm="3"
                        >
                          <v-text-field
                              v-model="dialogs.borrow_books.codes.books.rfid"
                              :rules="dialogs.borrow_books.rules.books.rfid"
                              label="图书编码"
                              required
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="3"
                        >
                          <v-text-field
                              v-model="dialogs.borrow_books.codes.books.name"
                              :rules="dialogs.borrow_books.rules.books.name"
                              label="图书名称"
                              required
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="3"
                        >
                          <v-text-field
                              v-model="dialogs.borrow_books.codes.books.place"
                              :rules="dialogs.borrow_books.rules.books.place"
                              label="存放位置"
                              required
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="3"
                        >
                          <v-text-field
                              v-model="dialogs.borrow_books.codes.books.userid_now"
                              :rules="dialogs.borrow_books.rules.books.userid_now"
                              label="借阅状态"
                              required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                            cols="12"
                            sm="6"
                        >
                          <v-text-field
                              v-model="dialogs.borrow_books.codes.users.rfid"
                              :rules="dialogs.borrow_books.rules.users.rfid"
                              label="用户编码"
                              required
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                        >
                          <v-text-field
                              v-model="dialogs.borrow_books.codes.users.name"
                              :rules="dialogs.borrow_books.rules.users.name"
                              label="用户姓名"
                              required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                      icon
                      color="red"
                      @click="dialogs.help.show = true"
                  >
                    <v-icon>mdi-help-circle</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="dialogs.borrow_books.show = false"
                  >
                    取消
                  </v-btn>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="borrowBooks"
                      :disabled="ifBorrowingUsers===false || ifBorrowingBooks===false"
                  >
                    借阅
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
