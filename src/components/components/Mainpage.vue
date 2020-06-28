<template>
  <div class="position-relative w-100 h-100">
    <div @scroll="handleScroll" class="d-flex align-items-start w-100 h-100 main pr-2">
      <div :class="{ show: showRefresh == true }" class="refreshText">
        <small>
          <button @click="getHTML" class="button">Yenile</button>
        </small>
      </div>
      <button
        @click="getHTML"
        v-if="fetching == true"
        style="font-size:15px;height:fit-content"
        class="d-flex align-items-center mx-auto button"
      >
        {{ "Yükleniyor..." }}
        <span v-if="!fetching" class="ml-2 material-icons">refresh</span>
      </button>
      <div class="w-100">
        <entry-box
          v-for="(value, i) in entries"
          :key="i + 2"
          :entry="value"
          :beginning="1"
          main="main"
        ></entry-box>
      </div>
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
    showRefresh: false
  }),
  methods: {
    //getHTML to fetch HTML of Uludagsozluk
    getHTML() {
      if (!this.fetching) {
        this.fetching = true;
        this.entries = [];
        let testDiv = document.createElement("div");
        let vue = this;
        axios.get("https://uludag-api.herokuapp.com/").then(res => {
          vue.entries = res.data;
          vue.fetching = false;
        });
      }
    },
    handleScroll(e) {
      if (e.target.scrollTop >= 300) {
        this.showRefresh = true;
      } else {
        this.showRefresh = false;
      }
    }
  },
  mounted() {
    this.getHTML();
  }
};
</script>

<style scoped>
.main {
  overflow: hidden auto;
  flex-wrap: wrap;
}

.refreshText:hover {
  transform: rotate(calc(360deg * 2));
  /* animation: don 1s linear infinite; */
}

@keyframes don {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.refreshText {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: transparent;
  text-align: center;
  bottom: 40px;
  right: 20px;
  margin-bottom: -30px;
  transition: transform 0.6s ease;
  z-index: 0;
}

.refreshText button {
  width: 100%;
  background-color: transparent;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  background-color: var(--uludag-theme);
}
</style>
