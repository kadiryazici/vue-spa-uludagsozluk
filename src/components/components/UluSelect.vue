<template>
  <div ref="select_element" tabindex="5" class="select-wrapper">
    <div class="view-area">
      <span style="color:var(--uludag-theme)">{{ currentPage }}</span
      >/<span>{{ max }}</span>
    </div>
    <div class="options">
      <div style="max-height:275px;overflow:auto;" class="h-100 w-100">
        <div
          @click="changePage(value - 1)"
          :class="{ selected: value == current }"
          v-for="value in parseInt(max)"
          :key="value + 1"
          class="option"
        >
          {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["current", "max"],
  data: () => ({
    currentPage: 1,
  }),
  methods: {
    /**
     * @description Page navigation.
     * @param {Number} value
     */
    changePage(value) {
      this.$store.commit("changePage", value + 1);
      this.currentPage = value + 1;

      this.$refs.select_element.blur();
    },
  },
  created() {
    this.currentPage = this.current;
  },
};
</script>

<style scoped>
.view-area {
  background-color: var(--uludag-dark);
  color: #fff;
  padding: 4px;
  border-radius: 5px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  font-weight: bold;
}

.select-wrapper:focus .options,
.select-wrapper:focus-within.options {
  display: block;
}

.select-wrapper {
  position: relative;
  outline: none !important;
  cursor: pointer;
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
  box-shadow: 0px 4px 16px -1px var(--uludag-theme);
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
