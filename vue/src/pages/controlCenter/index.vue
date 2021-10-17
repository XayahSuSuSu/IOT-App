<template>
  <v-container>
    <v-card class="v-card-common mt-10 mb-10">
      <v-card-title>终端控制</v-card-title>
      <v-data-table
          :headers="headers"
          :items="desserts"
          :items-per-page="5"
      ></v-data-table>
    </v-card>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            style="position: absolute;left:0;right: 0;bottom: 40px;margin:0 auto;"
            color="pink"
            fab
            v-bind="attrs"
            v-on="on"
            dark
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">添加控制指令</span>
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
                      v-model="objCode"
                      :rules="objRules"
                      label="控制对象代码"
                      required
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                >
                  <v-text-field
                      v-model="actionCode"
                      :rules="actionRules"
                      label="操作代码"
                      required
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                >
                  <v-text-field
                      v-model="paramCode"
                      :rules="paramRules"
                      label="参数代码"
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
              @click="dialog = false"
          >
            取消
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="addMyControlData"
          >
            添加
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script src="./index.js"></script>
<style src="./index.less" lang="less" scoped></style>
