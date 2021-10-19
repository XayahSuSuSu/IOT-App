<template>
  <v-container>
    <v-card class="v-card-common mt-10 mb-10">
      <v-card-title>历史数据</v-card-title>
      <v-data-table
          :headers="headers"
          :items="desserts"
          :items-per-page="10"
      ></v-data-table>
    </v-card>
  </v-container>
</template>
<script src="./index.js"></script>
<style src="./index.less" lang="less" scoped></style>
