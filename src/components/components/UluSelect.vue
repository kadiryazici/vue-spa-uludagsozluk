<template>
  <span class="d-flex">
    <span
      @click="changePage('left')"
      class="justify-content-center material-icons d-flex align-items-center"
      :class="{deactive: currentPage == 1}"
    >arrow_back_ios</span>
    <div ref="select_element" tabindex="5" class="select-wrapper">
      <div class="view-area">
        <span style="color:var(--uludag-theme)">{{ currentPage }}</span>
        <span>&nbsp;/&nbsp;</span>
        <span>{{ max }}</span>
      </div>
      <div class="options">
        <div style="max-height:275px;overflow:auto;" class="h-100 w-100">
          <div
            @click="changePage(value)"
            :class="{ selected: value == current }"
            v-for="value in parseInt(max)"
            :key="value + 1"
            class="option"
          >{{ value }}</div>
        </div>
      </div>
    </div>
    <span
      @click="changePage('right')"
      class="pl-1 justify-content-center material-icons d-flex align-items-center"
      :class="{deactive: currentPage == max}"
    >arrow_forward_ios</span>
  </span>
</template>

<script>
export default {
  props: ["current", "max"],
  data: () => ({
    currentPage: 1
  }),
  methods: {
    /**
     * @description Page navigation.
     * @param {Number} value
     */
    changePage(value) {
      let useValue;

      if (typeof value == "string") {
        if (value === "left") {
          if (parseInt(this.currentPage) == 1) {
            return;
          } else {
            useValue = parseInt(this.currentPage) - 1;
          }
        } else {
          if (parseInt(this.currentPage) == this.max) {
            return;
          } else {
            useValue = parseInt(this.currentPage) + 1;
          }
        }
      } else {
        useValue = value;
      }

      this.$store.commit("changePage", useValue);
      this.currentPage = useValue;

      this.$refs.select_element.blur();
      this.$store.dispatch("changeState", {
        replace: true
      });
    }
  },
  created() {
    this.currentPage = this.current;
  }
};
</script>

<style scoped>
.material-icons {
  font-size: 16px;
  cursor: pointer;
  padding: 0 2px;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
}
.material-icons.deactive {
  cursor: default;
  color: rgb(102, 102, 102);
}
.view-area {
  background-color: var(--uludag-dark);
  color: #fff;
  padding: 4px;
  border-radius: 5px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  font-weight: bold;
}

@keyframes clipPath {
  from {
    clip-path: circle(0% at 50% 0);
  }
  to {
    clip-path: circle(200% at 50% 0);
  }
}

.select-wrapper:focus .options,
.select-wrapper:focus-within .options {
  display: block;
  animation: 0.3s clipPath;
}

.select-wrapper {
  position: relative;
  outline: none !important;
  cursor: pointer;
  box-shadow: 0px 3px 9px -1px black;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.options {
  position: absolute;
  top: 100%;
  left: 0;
  display: none;
  max-height: 275px;
  width: 100%;
  box-sizing: border-box;
  overflow: auto;
  text-align: center;
  background-color: var(--uludag-dark);
  color: #fff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  font-weight: bold;
  box-shadow: 0px 10px 16px -3px black;
}

.option.selected {
  background-color: var(--uludag-dark-purple);
  color: #fff;
  background-color: var(--uludag-theme);
  cursor: default;
}

.option {
  padding: 3px 3px;
  cursor: pointer;
}

.option:hover:not(.selected) {
  background-color: var(--uludag-dark-purple);
  color: var(--uludag-theme);
}
</style>
