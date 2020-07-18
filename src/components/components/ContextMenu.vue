<template>
  <div
    ref="context"
    class="context-menu position-absolute"
  >
    <div
      :class="{'no-event' : !copy}"
      @click="handleClick('copy')"
      class="context-item"
    >
      Kopyala
    </div>
    <div
      :class="{'no-event' : !entry}"
      @click="handleClick('entry')"
      class="context-item"
    >
      Aç
    </div>
    <div
      :class="{'no-event' : !link}"
      @click="handleClick('link')"
      class="context-item"
    >
      Tarayıcıda Aç
    </div>
  </div>
</template>

<script>
export default {
  props: ['event'],

  /* ---------------  */

  mounted() {

    const { clientX, clientY } = this.event;
    const context = this.$refs.context;

    let y = 0;
    let x = 0;

    let left = context.offsetWidth;
    console.log(left)

    if (clientY + context.offsetHeight > document.documentElement.offsetHeight) {
      y = clientY - context.offsetHeight;
    } else {
      y = clientY;
    }

    if (clientX + context.offsetWidth > document.documentElement.offsetWidth) {
      x = clientX - context.offsetWidth;
    } else {
      x = clientX;
    }

    context.style.top = y + 'px';
    context.style.left = x + 'px';


    const selection = window.getSelection().toString();
    if (selection !== '') this.copy = true;

    const { className } = this.event.target;
    if (className.includes('context-newWindow')) this.entry = true;
    if (className.includes('context-link')) this.link = true;

    this.mounted = true;
  },

  /* ---------------  */

  data() {
    return {
      entry: false,
      link: false,
      copy: false,
      mounted: false,
    }
  },

  /* ---------------  */

  methods: {
    handleClick(type) {
      if (type == 'link') this.event.target.click();
      else if (type == 'entry') this.event.target.click();
      else if (type == 'copy') document.execCommand('copy');
      this.$emit('selected');
    },
  }
}
</script>

<style scoped>
.no-event {
  pointer-events: none;
  color: gray !important;
  cursor: default;
}
.context-menu {
  z-index: 999999;
  background-color: white;
  border-radius: 10px;
  background-color: var(--uludag-section-background);
  box-shadow: 0px 0px 7px -1px var(--uludag-scroll);
  overflow: hidden;
  border: 1px solid var(--uludag-scroll);
  -webkit-user-select: none;
}

.context-item {
  padding: 20px 15px;
  cursor: pointer;
  color: white;
  font-size: 15px;
}

.context-item:hover {
  background-color: var(--uludag-dark-purple-opacity);
}
</style>