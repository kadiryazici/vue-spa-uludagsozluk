<template>
  <div @click.self="$emit('close')" class="search fixed-top w-100 text-center">
    <div class="w-100 d-flex search-wrapper align-items-center">
      <div style="margin-top:5rem" class="w-100 text-center">
        <input
          v-model="text"
          class="search-box"
          type="text"
          placeholder="Ara"
          ref="searchinput"
        />
      </div>
      <h3 class="position-relative">SONUÇLAR</h3>
      <div class="results">
        <div class="result-list">
          <div
            @click="openEntry(value)"
            v-for="value in results.aramasonuc"
            :key="value.basliklink"
            class="result"
          >
            {{ value.baslik }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      text: "",
      results: [],
    };
  },
  watch: {
    text(v) {
      let vueThis = this;
      this.$store.dispatch("fetchSearch", {
        text: v.toLocaleLowerCase("tr-TR"),
        callback(data) {
          vueThis.results = data;
        },
      });
    },
  },
  methods: {
    openEntry(v) {
      let windowValue = {
        type: "Entry",
        baslik: v.baslik,
        link: v.basliklink,
        sayfa: 1,
        toplamSayfa: 1,
      };
      this.$store.commit("addWindow", windowValue);
      this.$store.dispatch("changeState", {
        type: "Entry",
        baslik: v.baslik,
        basliklink: v.basliklink,
      });
      this.$emit("close");
    },
  },
  mounted() {
    this.$refs.searchinput.focus();
  },
};
</script>

<style scoped>
.search {
  height: calc(100vh - 32px);
  margin-top: 32px;
  background-color: rgba(0, 0, 0, 0.918);
  width: 100%;
  z-index: 999;
}

.search-wrapper {
  flex-direction: column;
  max-width: 700px;
  margin: 0 auto;
}

.results {
  color: white;
  min-width: 700px;
  width: 700px;
}

h3 {
  color: white;
  width: 700px;
  text-align: center;
  padding-top: 30px;
  margin-bottom: 20px;
}

h3::after {
  width: 100%;
  height: 1px;
  background-color: var(--uludag-theme);
  left: 0;
  position: absolute;
  bottom: -9px;
  content: "";
  box-shadow: 0px 4px 9px 1px var(--uludag-theme);
}

.result-list {
  overflow: hidden;
}

.result {
  width: 100%;
  text-align: left;
  padding: 20px 15px;
  margin: 5px 0px;
  background-color: var(--uludag-dark-purple);
  cursor: pointer;
  /* backdrop-filter: blur(10px); */
  position: relative;
}

.result::after {
  content: "";
  width: 100%;
  opacity: 0;
  height: 100%;
  left: 0px;
  pointer-events: none;
  position: absolute;
  top: 0;
  background: rgb(238, 129, 56);
  z-index: 0;
  background: var(--active-gradient);
}

.result:hover::after {
  opacity: 1;
}

.result:hover {
  background-color: rgb(22, 21, 21);
}

.search-box {
  padding: 15px 15px;
  min-width: 700px;
  outline: none;
  border-radius: 5px;
  background-color: var(--uludag-dark-purple);
  border: 2px solid;
  color: white;
  border-image-slice: 1;
  border-image-source: linear-gradient(to left, #743ad5, var(--uludag-theme));
  font-weight: bold;
}

.search-box:focus {
  box-shadow: 0px 0px 8px 1px rgb(119, 69, 126);
}

.results {
  max-height: calc(100vh - 300px);
  text-align: center;
  padding-right: 5px;
  margin-top: 1rem;
  overflow-y: auto;
}
</style>
