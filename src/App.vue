<template>
  <div id="app">
    <navbar />
    <div class="content">
      <div class="left">
        <leftFrame />
      </div>
      <div class="right">
        <rightFrame />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    /**
     * @description When user enters website if the user has type,link query parameters in url
     *              redirect user to that spesific page.
     *
     */
    urlFunc() {
      let params = new URL(decodeURI(window.location.href));
      let param = new URLSearchParams(params.search.slice(1));
      let type = param.get("type");
      let link = param.get("link");
      if (type && link) {
        let windowValue = {
          type,
          baslik: link.replace(/-/gim, " "),
          link: link,
          sayfa: 1,
          toplamSayfa: 1,
        };
        window.history.pushState("", "", "/");

        this.$store.commit("addWindow", windowValue);
        this.$store.dispatch("changeState", {
          type: windowValue.type,
          basliklink: windowValue.link,
          baslik: windowValue.baslik,
        });
      }
    },
    /**
     * @description Handles navigation.
     */
    popState() {
      window.onpopstate = (e) => {
        if (e.state == null || e.state == "") {
          //if user goes to main page.
          document.title = "Vuedag";
          this.$store.commit("closeWindowsByRange", {
            from: 1,
            to: this.windowCount,
          });
        } else {
          //if user doesnt go to first page.
          if (this.windowCount <= e.state.i) {
            let { type, link, baslik } = e.state;
            this.$store.commit("addWindow", {
              type,
              baslik,
              link,
              sayfa: 1,
              toplamSayfa: 1,
            });
          } else {
            //if user wants to go backward
            this.$store.commit("closeWindowsByRange", {
              from: e.state.i,
              to: this.windowCount,
            });
          }
        }
      };
    },
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
    },
  },
  watch: {
    isBack() {
      window.history.back();
    },
  },
};
</script>

<style>
@import url("./assets/bootstrap.css");
@import url("./assets/roboto.css");
@import url("./assets/icons.css");
@import url("./assets/animations.css");

* {
  scrollbar-width: thin;
  font-family: "Roboto", sans-serif;
}

::placeholder {
  color: #fff;
}

body {
  font-family: "Roboto", sans-serif;
  padding-top: 50px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: rgb(39, 39, 39);
  min-height: 100vh;
  min-width: 850px;
  margin: 0px;
}

.content {
  display: flex;
  flex-wrap: nowrap;
  max-height: calc(100vh - 65px);
  height: calc(100vh - 65px);
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
  background-color: rgb(39, 39, 39);
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
  background-color: rgb(53, 53, 53);
}

::-webkit-scrollbar-thumb {
  background-clip: padding-box;
  background-color: var(--uludag-scroll);
  cursor: pointer;
}

:root {
  --uludag-theme: #546fa1;
  --uludag-dark-purple: rgb(45, 45, 57);
  --uludag-dark: rgb(20, 20, 20);
  --uludag-dark-purple-shadow: 0px 0px 8px -1px rgba(41, 42, 58, 0.438);
  --uludag-light: rgb(230, 230, 230);
  --uludag-scroll: rgb(155, 168, 179);
  --active-gradient: linear-gradient(
    90deg,
    #546fa181 0%,
    rgba(84, 111, 161, 0) 100%
  );
  --current-gradient: linear-gradient(
    90deg,
    rgba(238, 129, 56, 0.534) 0%,
    rgba(84, 111, 161, 0) 100%
  );
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

.button:hover {
  box-shadow: 0px 0px 20px -6px #fff;
}

.button:active {
  color: var(--uludag-theme);
}
</style>
