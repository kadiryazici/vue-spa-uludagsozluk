<template>
  <div class="pb-1 pt-0 left-wrapper">
    <h6
      style="z-index:50"
      class="left-header sticky-top d-flex align-items-center m-0"
    >
      <span style="padding-bottom:6px">Gündem</span>
      <span
        tabindex="0"
        @click="$store.dispatch('fetchGundem')"
        class="mb-1 refresh ml-auto material-icons"
      >refresh</span>
    </h6>
    <div
      class="h-100"
      style="overflow-x:hidden;overflow-y:auto;"
    >
      <h6
        v-if="basliklar.bugun == undefined"
        class="m-0 p-3 text-center"
        style="font-size:15px;font-weight:bold;color:white"
      >Yükleniyor..</h6>
      <transition-group enter-active-class="fadeInLeft">
        <div
          @click="addEntryWindow(value, value.bugunki_sayisi)"
          v-for="(value, i) in basliklar.bugun"
          :key="i + 5"
          class="baslik"
          :class="{
            active: value.basliklink == winFilter(value.basliklink)[0].link,
            current: value.basliklink == currentWindow.link,
          }"
        >
          <a
            class="d-block"
            style="padding:15px;text-decoration:none;color:inherit"
            @click.prevent.self
            :href="`/?type=baslik\&link=${value.basliklink}`"
          >
            {{ value.baslik }}
            <span class="number">{{ value.bugunki_sayisi }}</span>
          </a>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    basliklar() {
      return this.$store.getters.getLeft;
    },
    currentWindow() {
      return this.$store.getters.getCurrentWindow;
    }
  },
  watch: {},
  methods: {
    /**
     * @description Creates new window and changes the url.
     * @param {Object} value
     * @param {String} value.baslik
     * @param {String} value.basliklink
     */
    addEntryWindow(value, i) {
      let entry = this.$store.getters.getCurrentWindow;
      let gundem = parseInt(i);
      if (entry.baslik != value.baslik) {
        this.$store.commit("addWindow", {
          type: "baslik",
          baslik: value.baslik,
          link: value.basliklink,
          sayfa: 1,
          toplamSayfa: 1,
          gundemSayfa: Math.ceil(20 / gundem)
        });
        this.$store.dispatch("changeState", { type: "baslik", ...value });
      }
    },
    winFilter(link) {
      let wins = this.$store.getters.getOpenWindows;
      let results = wins.filter(value => value.link == link);

      return results.length > 0 ? results : [{ link: null }];
    }
  }
};
</script>

<style scoped>
.left-header {
  background-color: var(--uludag-light);
  font-size: 15px;
  font-weight: bold;
  height: 41px;
  padding: 10px 2px 2px 14px;
}
.baslik {
  color: white;
  width: 100%;
  font-size: 15px;
  max-height: 100%;
  overflow: auto;
  position: relative;
}

.baslik:hover {
  background-color: var(--uludag-dark-purple);
  cursor: pointer;
}

.baslik.active::after {
  content: "";
  width: 100%;
  height: 100%;
  left: 0px;
  pointer-events: none;
  position: absolute;
  top: 0;
  background: rgb(238, 129, 56);
  z-index: 0;
  background: var(--active-gradient);
}

.baslik.active.current::after {
  background: var(--current-gradient);
}

.left-wrapper {
  background-color: rgb(20, 20, 20);
  height: 100%;
  overflow: hidden;
  border-radius: 5px;
  padding-bottom: 2.7rem !important;
}

.number {
  font-size: 11px;
  color: var(--uludag-theme);
}

.refresh {
  cursor: pointer;
  transition: all 0.5s;
  font-size: 29px;
  padding-bottom: 2px;
  padding-right: 2px;
  margin-right: 5px;
  transform-origin: center;
}
.refresh:hover {
  color: var(--uludag-dark);
  transform: rotate(180deg);
  transform-origin: center;
}
.refresh:focus {
  outline: none;
}
</style>
