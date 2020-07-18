<template>
  <nav class="fixed-top navbar">
    <keep-alive>
      <entry-search
        @close="$store.commit('setSearchBox', false)"
        v-if="$store.getters['getSearchBox']"
      />
    </keep-alive>
    <div class="position-relative title-bar">
      <small class="info-title position-absolute title w-100 h-100 d-flex align-items-center justify-content-center">{{ "ULUDAĞ SÖZLÜK" }}</small>
      <div class="search">
        <button
          @click="
            $store.commit('setSearchBox', !$store.getters['getSearchBox'])
          "
          class="min"
        >
          <span
            style="font-size:21px"
            class="material-icons pr-2"
          >search</span>
          Arama
        </button>
        <button
          @click="$store.commit('closeWindows')"
          class="min"
        >
          <span
            style="font-size:21px"
            class="material-icons pr-2"
          >close</span>
          Tüm Pencereleri Kapat
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    search: false
  })
};
</script>

<style scoped>
.title-bar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
  height: 32px;
  background-color: var(--uludag-theme);
  width: 100%;
}

.info-title {
  color: white;
  -webkit-user-select: none;
  -webkit-app-region: drag;
  z-index: 0;
}

.material-icons {
  font-size: 16px;
}

.title-bar *:not(.info-title) {
  -webkit-app-region: none;
}

.min-max-exit {
  height: 32px;
  margin-left: auto;
  width: fit-content;
  z-index: 5;
  position: relative;
}

.title-bar button {
  height: 32px;
  width: 32px;
  border-radius: 0px;
  border: none;
  outline: none;
  background: transparent;
  color: white;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  cursor: pointer;
}

.title-bar button:not(.exit):hover {
  background-color: rgba(255, 255, 255, 0.329);
}

.title-bar button.exit:hover {
  background-color: rgb(252, 29, 29);
}

.navbar {
  width: 100%;
  /* height: 60px; */
  z-index: 3;
  background-color: var(--uludag-dark);
  /* display: flex; */
  align-items: center;
  z-index: 800;
}

.search {
  display: inline;
  position: absolute;
  left: 0;
}
.search button {
  width: auto;
  padding-left: 20px;
  padding-right: 20px;
}

input:focus {
  outline: none;
}

h3 {
  color: white;
  margin: 0px;
  font-size: 25px;
}
</style>
