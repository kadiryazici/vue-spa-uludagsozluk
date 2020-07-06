<template>
  <a @click.prevent="bkzWindow" :href="linkBkz">
    <template v-if="quote">{{bkz}}</template>
    <template v-else>(bkz: {{bkz}})</template>
  </a>
</template>

<script>
export default {
  props: {
    bkz: String,
    quote: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    linkBkz() {
      return (
        `${window.location.origin}/?type=baslik&link=` +
        this.bkz
          .trim()
          .replace(/<br>/g, "")
          .replace(/\s/g, "-")
      );
    }
  },

  methods: {
    bkzWindow() {
      let windowValue = {
        type: "baslik",
        baslik: this.bkz,
        link: this.bkz.trim().replace(/\s/g, "-"),
        sayfa: 1,
        toplamSayfa: 1
      };
      this.$store.commit("addWindow", windowValue);
      this.$store.dispatch("changeState", {
        type: "baslik",
        baslik: windowValue.baslik,
        basliklink: windowValue.link
      });
    }
  }
};
</script>