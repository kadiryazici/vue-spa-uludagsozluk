<template>
  <a
    target="_blank"
    class="link-a context-link"
    v-if="type.type === 'link'"
    :href="highlight"
  >{{highlight}}</a>
  <a
    class="context-newWindow"
    @click.prevent="bkzWindow(highlight)"
    v-else-if="type.type === 'quote'"
    :href="hrefEntry"
  >{{highlight}}</a>
  <a
    class="context-newWindow"
    @click.prevent="bkzWindow(highlight)"
    v-else-if="type.type === 'baslik'"
    :href="hrefEntry"
  >(bkz: {{highlight}})</a>
  <span
    class="context-text"
    v-else
    v-html="text"
  ></span>
</template>

<script>
export default {
  props: {
    text: String
  },

  data: () => ({
    highlight: '',
  }),

  computed: {
    type() {
      let text = this.text;
      let textType = {
        type: '',
        text: ''
      };

      let baslikMatch = text.match(/\(baslik:([^)]+)\)/);
      let quoteMatch = text.match(/\(quote:([^)]+)\)/);
      let linkMatch = text.match(/\(link:([^)]+)\)/);

      if (baslikMatch) {
        textType.type = 'baslik';
        textType.text = baslikMatch[1];

      } else if (quoteMatch) {
        textType.type = 'quote';
        textType.text = quoteMatch[1];

      } else if (linkMatch) {
        textType.type = 'link';
        textType.text = linkMatch[1];

      } else {
        textType.type = 'text';

      }

      return textType;
    },

    hrefEntry() {
      let link = this.highlight.trim().replace(/\s/g, "-")
      return window.location.origin + `/?type=baslik&link=${link}&sayfa=1`
    }
  },

  methods: {
    testEverything() {

    },

    bkzWindow(baslik) {
      let windowValue = {
        type: "baslik",
        baslik,
        link: baslik.trim().replace(/\s/g, "-"),
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
  },

  created() {
    let type = this.type;
    this.highlight = type.text;
  }
};
</script>