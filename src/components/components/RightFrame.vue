<template>
  <div class="position-relative h-100 w-100">
    <transition-group
      enter-active-class="fadeInLeft"
      leave-active-class="fadeOutRight closing"
    >
      <div
        v-for="(value, index) in windows"
        :key="index + 5"
        :style="
          `z-index${index + 5};${
            index + 1 < windows.length ? 'pointer-events:none' : ''
          }`
        "
        class="window h-100 w-100"
        :class="{
          active: index == windows.length - 1,
        }"
      >
        <div
          v-if="index > 0"
          class="back-button"
        >
          <span
            @click="closeWindow"
            class="pt-2 pl-3 pb-2 icon material-icons"
          >arrow_back_ios</span>
          <p class="title">{{ value.baslik.split("-").join(" ") }}</p>
          <span class="ml-auto mr-3">
            <ulu-select
              class="select-none"
              :current="value.sayfa"
              :max="value.toplamSayfa"
              v-if="value.type == 'baslik'"
            />
          </span>
        </div>

        <div
          v-if="value.type == 'Main'"
          class="back-button"
        >
          <span
            style="visibility:hidden;pointer-events:none;margin-right:-43px"
            class="pt-2 pl-3 pb-2 icon material-icons"
          >arrow_back_ios</span>
          <p class="title">{{ "Tavsiyeler" }}</p>
        </div>

        <div
          style="color:white"
          class="h-100 windowContent"
        >
          <Entry
            v-if="value.type === 'baslik'"
            :entryData="value"
            :beginning="value.sayfa"
          />
          <main-page v-else-if="value.type === 'Main'" />
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      windows: "getOpenWindows"
    })
  },
  methods: {
    closeWindow() {
      this.$store.commit("setBack");
    }
  }
};
</script>

<style scoped>
.window.active {
  /* transform: translate3d(-50px, 0, 0); */
  margin-left: 0px;
  transition-delay: 0s;
}

.window:not(.active)::after {
  opacity: 0.8;
  pointer-events: all;
}

.icon {
  color: var(--uludag-theme);
  font-size: 25px;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  cursor: pointer;
  transition: transform 0.3s;
}

.icon:hover {
  color: rgb(20, 20, 20);
  transform: scale(1.2);
}

.back-button {
  background-color: var(--uludag-light);
  display: flex;
  align-items: center;
}

.title {
  font-weight: bold;
  font-size: 15px;
  padding: 0 15px;
  text-align: justify;
  margin: 0;
}

.window {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-height: 100%;
  position: absolute;
  margin-left: -200px;
}

.window {
  transition: margin-left ease 0.4s 0.2s;
}

.window.closing {
  transition: none;
  margin-left: 0px;
  transform: translateX(100%);
}

.window::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  transition: opacity 0.6s 0.1s;
  opacity: 0;
  pointer-events: none;
}

.windowContent {
  background-color: rgb(20, 20, 20);
  border: 3px solid rgb(20, 20, 20);
  border-right: 0px;
  padding: 5px;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
}
</style>
