import Vue from "vue";
import Vuex from "vuex";

let apiKey = process.env.VUE_APP_KEY;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchBox: false,
    isBack: "",
    loadPage: false,
    leftFrame: [],
    openWindows: [
      {
        type: "Main",
      },
    ],
  },
  /*-----------------------------------------------------*/
  getters: {
    getLeft(state) {
      return state.leftFrame;
    },
    getRight(state) {
      return state.rightFrame;
    },
    getOpenWindows(state) {
      return state.openWindows;
    },
    getCurrentWindow(state) {
      return state.openWindows[state.openWindows.length - 1];
    },
    getBack(state) {
      return state.isBack;
    },
    getSearchBox(state) {
      return state.searchBox;
    },
  },
  /*-----------------------------------------------------*/
  mutations: {
    setLeft(state, payload) {
      state.leftFrame = payload;
    },
    addWindow(state, payload) {
      state.openWindows.push(payload);
    },
    deleteWindow(state) {
      state.openWindows.pop();
    },
    changePage(state, payload) {
      state.openWindows[state.openWindows.length - 1].sayfa = payload;
    },
    setBack(state) {
      state.isBack = Math.random().toString();
    },
    closeWindowsByRange(state, payload) {
      state.openWindows.splice(payload.from, payload.to);
    },
    closeWindows(state) {
      if (state.openWindows.length > 1) {
        let a = state.openWindows.length - 1;
        window.history.go(-a);
        state.arrowTime = 0;
      }
    },
    setSearchBox(state, payload) {
      state.searchBox = payload;
    },
  },
  /*-----------------------------------------------------*/

  actions: {
    /**
     *
     * @description Fetches the flow of the day for Left Content to list.
     * @param {Vuex} param0
     *
     */
    async fetchGundem({ commit }) {
      await commit("setLeft", {});
      fetch(
        `https://www.uludagsozluk.com/api/?a=${apiKey}&n=gundem&ls=0&le=40&desc=1`
      )
        .then((value) => {
          return value.json();
        })
        .then((data) => {
          commit("setLeft", data);
        });
    },

    /**
     * @description
     * @param {Vuex} param0
     * @param {Object} payload
     * @param {String} payload.link Entry link to fetch.
     * @param {Number} payload.ba Entry value to fetch next 20 entries from it.
     * @param {Function} payload.callback The function that will pass parameters and be executed after fetching;
     */
    async fetchEntry({ state }, payload) {
      await fetch(
        `https://www.uludagsozluk.com/api/?a=${apiKey}&n=baslik&b=${
          payload.link
        }&ls=${payload.ba * 20 - 20}&le=20&desc=1`
      )
        .then((result) => {
          return result.json();
        })
        .then((data) => {
          payload.callback(data);
        })
        .catch((_) => {
          payload.callback("error");
        });
    },
    /**
     * @param {Vuex} param0
     * @param {Object} payload
     * @param {String} payload.text
     * @param {Function} payload.callback The function that will pass parameters and be executed after fetching;
     */
    async fetchSearch({}, payload) {
      await fetch(
        `https://www.uludagsozluk.com/api/?a=${apiKey}&n=arama&k=${payload.text}&ls=0&le=15&desc=1`
      )
        .then((result) => {
          return result.json();
        })
        .then((data) => {
          payload.callback(data);
        })
        .catch((_) => {
          payload.callback("error");
        });
    },

    /**
     * @description Navigating to another page.
     * @param {Vuex} param0
     * @param {Object} payload
     * @param {String} payload.baslik
     * @param {String} payload.basliklink
     * @param {String} payload.type
     */
    changeState({ state }, payload) {
      let useObject = {
        baslik: state.openWindows[state.openWindows.length - 1].baslik,
        type: state.openWindows[state.openWindows.length - 1].type,
        link: state.openWindows[state.openWindows.length - 1].link,
        i: state.openWindows.length,
        sayfa: state.openWindows[state.openWindows.length - 1].sayfa,
      };
      if (!payload.replace) {
        window.history.pushState(
          useObject,
          "",
          `?type=${useObject.type}&link=${useObject.link}${
            useObject.type == "baslik" ? `&sayfa=${useObject.sayfa}` : ""
          }`
        );
        document.title = useObject.baslik + " | Vuedag";
      } else {
        window.history.replaceState(
          useObject,
          "",
          `?type=${useObject.type}&link=${useObject.link}${
            useObject.type == "baslik" ? `&sayfa=${useObject.sayfa}` : ""
          }`
        );
      }
    },
  },
});
