<template>
  <v-container>
    <v-card class="v-card-common mt-10 mb-10">
      <v-card-title>
        储运箱数据
        <v-spacer></v-spacer>
        <v-text-field
            v-model="books.search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
          :headers="books.headers"
          :items="books.desserts"
          :items-per-page="10"
          :search="books.search"
      ></v-data-table>
    </v-card>
  </v-container>
</template>
<script src="./index.js"></script>
<style src="./index.less" lang="less" scoped></style>
