<template>
  <v-container>
    <v-dialog
        v-model="dialogs.add_books.show"
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
                      v-model="dialogs.add_books.codes.head"
                      :rules="dialogs.add_books.rules.head"
                      label="图书编码"
                      required
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="4"
                >
                  <v-text-field
                      v-model="dialogs.add_books.codes.tail"
                      :rules="dialogs.add_books.rules.tail"
                      label="图书名称"
                      required
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="4"
                >
                  <v-text-field
                      v-model="dialogs.add_books.codes.obj"
                      :rules="dialogs.add_books.rules.obj"
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
  </v-container>
</template>
<script src="./index.js"></script>
<style src="./index.less" lang="less" scoped></style>
