<template>
  <div class="d-flex align-items-start w-100 h-100 main pr-2">
    <button
      @click="getHTML"
      style="font-size:15px;height:fit-content"
      class="d-flex align-items-center mx-auto button"
    >
      {{ fetching ? "Yükleniyor..." : "Yenile" }}
      <span v-if="!fetching" class="ml-2 material-icons">refresh</span>
    </button>
    <div>
      <entry-box
        v-for="(value, i) in entries"
        :key="i + 2"
        :entry="value"
        :beginning="1"
        main="main"
      ></entry-box>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    veri: "araba",
    entries: [],
    fetching: false,
  }),
  methods: {
    //getHTML to fetch HTML of Uludagsozluk
    getHTML() {
      if (!this.fetching) {
        this.fetching = true;
        this.entries = [];
        let testDiv = document.createElement("div");
        let vue = this;
        axios.get("https://uludag-api.herokuapp.com/").then((res) => {
          vue.entries = res.data;
          vue.fetching = false;
        });
      }
    },
  },
  mounted() {
    this.getHTML();
  },
};
</script>

<style scoped>
.main {
  overflow: hidden auto;
  flex-wrap: wrap;
}
</style>
