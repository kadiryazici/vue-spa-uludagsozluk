<template>
  <div id="app">
    <Navbar />
    <div
      @mousedown="contextmenu = false"
      :class="{ blurry: $store.getters['getSearchBox'] === true }"
      class="content"
    >
      <div class="left">
        <left-frame />
      </div>
      <div
        @contextmenu.prevent="handler"
        @wheel="contextmenu = false"
        class="right"
      >
        <right-frame />
      </div>
    </div>
    <ContextMenu
      @click.stop
      :event="target"
      :style="style"
      v-if="contextmenu"
      @selected="contextmenu = false"
      :key="key"
    />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      contextmenu: false,
      style: {
        top: 0,
        left: 0
      },
      target: null,
      key: 'selamlar'
    }
  },
  components: {
    ContextMenu: () => import('./components/components/ContextMenu')
  },
  methods: {
    handler(e) {
      this.target = e;
      this.key = Math.random().toString();
      this.contextmenu = true;
    },
    urlFunc() {
      let param = new URLSearchParams(window.location.search);
      let type = param.get("type");
      let link = param.get("link");
      let sayfa = param.get("sayfa");
      if (sayfa < 1) {
        sayfa = 1;
      }
      if (type && link) {
        let windowValue = {
          type,
          baslik: link.replace(/-/gim, " "),
          link: link,
          sayfa: sayfa || 1,
          toplamSayfa: 9999
        };
        window.history.pushState("", "", "/");

        this.$store.commit("addWindow", windowValue);
        this.$store.dispatch("changeState", {
          type: windowValue.type,
          basliklink: windowValue.link,
          baslik: windowValue.baslik
        });
      }
    },

    popState() {
      window.onpopstate = e => {
        if (e.state == null || e.state === "") {
          //if user goes to main page.
          document.title = "Vuedag";
          this.$store.commit("closeWindowsByRange", {
            from: 1,
            to: this.windowCount
          });
        } else {
          //if user doesnt go to first page.
          if (this.windowCount <= e.state.i) {
            let { type, link, baslik, sayfa } = e.state;
            this.$store.commit("addWindow", {
              type,
              baslik,
              link,
              sayfa: sayfa || 1,
              toplamSayfa: 1
            });
          } else {
            //if user wants to go backward
            this.$store.commit("closeWindowsByRange", {
              from: e.state.i,
              to: this.windowCount
            });
          }
        }
      };
    }
  },
  mounted() {
    this.$store.dispatch("fetchGundem");
    this.urlFunc();
    this.popState();
  },

  computed: {
    getCurrentWindow() {
      return this.$store.getters.getCurrentWindow;
    },

    windowCount() {
      return this.$store.getters.getOpenWindows.length;
    },

    isBack() {
      return this.$store.getters.getBack;
    }
  },

  watch: {
    isBack() {
      window.history.back();
    }
  }
};
</script>

<style>
@import url("./assets/bootstrap.css");
@import url("./assets/roboto.css");
@import url("./assets/icons.css");
@import url("./assets/animations.css");

.material-icons {
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

* {
  outline: none;
  font-family: "Roboto", sans-serif;
}

::placeholder {
  color: #fff;
}

body {
  font-family: "Roboto", sans-serif;
  padding-top: 50px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: var(--uludag-background);
  min-height: 100vh;
  min-width: 850px;
  overflow: hidden;
  margin: 0;
}

.content {
  display: flex;
  /*transition: filter 0.3s, -webkit-filter 0.3s;*/
  flex-wrap: nowrap;
  max-height: calc(100vh - 65px);
  height: calc(100vh - 65px);
}

.content.blurry {
  -webkit-filter: blur(10px);
  filter: blur(10px);
}

.left {
  min-width: 300px;
  max-width: 300px;
  max-height: 100%;
  overflow: hidden;
}

.right {
  width: 100%;
  margin-left: 10px;
  border-radius: 5px;
  overflow: hidden;
  max-height: 100%;
}

::-webkit-scrollbar {
  width: 5px;
  border-radius: 5px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-clip: padding-box;
  background-color: var(--uludag-scroll);
  cursor: pointer;
}

:root {
  --uludag-theme: #a12e68;
  --uludag-dark-purple: rgb(45, 45, 57);
  --uludag-dark-purple-opacity: rgba(61, 53, 73, 0.479);
  --uludag-dark: #0e0d0d;
  --uludag-entry-background: #2e3242d2;
  --uludag-background: #2f3033;
  --uludag-dark-purple-shadow: 0px 0px 8px -1px rgba(41, 42, 58, 0.438);
  --uludag-light: #d4d9e4;
  --uludag-scroll: rgb(155, 168, 179);
  --uludag-section-background: rgb(39, 39, 39);
  --active-gradient: rgba(78, 78, 158, 0);
  --current-gradient: #a12e6736;
}

.button {
  border: none;
  border-radius: 5px;
  padding: 10px 9px;
  font-size: 9pt;
  background-color: var(--uludag-dark-purple);
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  box-shadow: var(--uludag-dark-purple-shadow);
  transition: box-shadow 0.3s;
}

.button:focus {
  outline: none;
}

.button:active {
  color: var(--uludag-dark);
}
</style>
