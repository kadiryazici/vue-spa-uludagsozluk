<template>
  <div class="position-relative w-100 h-100">
    <div class="d-flex align-items-start w-100 h-100 main pr-2">
      <div class="refreshText">
        <small>
          <button @click="getHTML" class="button">
            <span
              class="material-icons"
              style="display: flex;align-items: center;justify-content: center;"
            >refresh</span>
          </button>
        </small>
      </div>
      <button
        v-if="fetching == true"
        style="font-size:15px;height:fit-content"
        class="d-flex align-items-center mx-auto button"
      >{{ "Yükleniyor..." }}</button>
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
    fetching: false
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
    }
  },
  mounted() {
    this.getHTML();
  }
};
</script>

<style scoped>
.refreshText {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: transparent;
  text-align: center;
  bottom: 40px;
  right: 20px;
  margin-bottom: -30px;
  transition: transform 0.6s ease, box-shadow 0.6s ease;
  z-index: 0;
  border-radius: 50%;
}

.main {
  overflow: hidden auto;
  flex-wrap: wrap;
}

.refreshText:hover button {
  transform: rotate(calc(360deg * 2));
  /* animation: don 1s linear infinite; */
}
.refreshText button {
  transition: 0.6s ease;
}

.refreshText:hover {
  transform: scale(1.1);
  box-shadow: 0px 0px 14px 1px #0e0e0e;
}

@keyframes don {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
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
