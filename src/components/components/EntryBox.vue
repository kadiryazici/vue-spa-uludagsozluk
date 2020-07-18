<template>
  <div class="w-100">
    <h4
      @click="open(entry.baslik)"
      v-if="!no"
      class="baslik my-3 py-2 px-3"
    >{{ entry.baslik }}</h4>
    <div class="entry p-3 mb-4">
      <div class="pb-2 entry-no">
        <small class>{{ no ? no + " ." : "" }}</small>
      </div>
      <entry-text :metin="entry.metin" />
      <div class="entry-info pt-3">
        <span
          :style="`background-image:url('${entry.uye_foto}')`"
          class="image"
        ></span>
        <span
          :data-yazar="entry.yazar"
          class="yazar ml-2"
        >
          <a
            class="context-link"
            :href="entry.yazar | toTR"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ entry.yazar }}
            <span
              style="font-size:17px;position:relative;bottom:-3px"
              class="material-icons"
            >launch</span>
          </a>
        </span>
        <div class="ml-auto diger-bilgiler d-flex align-items-center">
          <span class="up-down d-flex align-items-center">
            <span
              :class="{
                color: parseInt(entry.arti_oy) > parseInt(entry.eksi_oy) || parseInt(entry.arti_oy) == parseInt(entry.eksi_oy) && parseInt(entry.arti_oy) != 0 ,
              }"
              class="up material-icons"
            >keyboard_arrow_up</span>
            {{ entry.arti_oy }}
            <span
              :class="{
                color: parseInt(entry.eksi_oy) > parseInt(entry.arti_oy) ||  parseInt(entry.eksi_oy) == parseInt(entry.arti_oy) && parseInt(entry.eksi_oy) != 0 ,
              }"
              class="down material-icons"
            >keyboard_arrow_down</span>
            {{ entry.eksi_oy }}
          </span>
          <span class="pl-3 tarih">{{ entry.tarih }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["entry", "no", "baslik"],
  filters: {
    /**
     * @description If the string has special Turkish letters, convert them into English letters.
     * @param {String} value
     * @returns {String}
     */
    toTR(value) {
      let trValue = value
        .replace(/Ğ/gim, "g")
        .replace(/Ü/gim, "u")
        .replace(/Ş/gim, "s")
        .replace(/I/gim, "i")
        .replace(/İ/gim, "i")
        .replace(/Ö/gim, "o")
        .replace(/Ç/gim, "c")
        .replace(/ğ/gim, "g")
        .replace(/ü/gim, "u")
        .replace(/ş/gim, "s")
        .replace(/ı/gim, "i")
        .replace(/ö/gim, "o")
        .replace(/ç/gim, "c")
        .replace(/ /gim, "-");
      let link = "https://" + trValue + ".uludagsozluk.com";

      return link;
    }
  },
  methods: {
    open(att) {
      let windowValue = {
        type: "baslik",
        baslik: att,
        link: att.split(" ").join("-"),
        sayfa: 1,
        toplamSayfa: 1
      };
      this.$store.commit("addWindow", windowValue);
      this.$store.dispatch("changeState", {
        type: windowValue.type,
        baslik: windowValue.baslik,
        basliklink: windowValue.link
      });
    }
  }
};
</script>

<style scoped>
.yazar {
  color: #fff;
  position: relative;
  cursor: pointer;
}
.yazar a {
  text-decoration: none;
  color: var(--uludag-theme);
}
.yazar a:hover {
  color: rgb(166, 54, 231);
}

.entry {
  background-color: var(--uludag-entry-background);
  box-shadow: 0px 0px 8px -1px rgba(111, 115, 181, 0.438);
}
.entry-info {
  display: flex;
  align-items: center;
  height: 60px;
}
.image {
  height: 40px;
  width: 40px;
  display: inline-block;
  background-size: cover;
  border-radius: 50%;
  flex-shrink: 0;
  border: 2px solid var(--uludag-theme);
  box-shadow: 0px 0px 10px 2px rgba(111, 115, 181, 0.438);
}
.diger-bilgiler {
  height: 40px;
  font-size: 14px;
  color: rgb(228, 228, 228);
}
small {
  color: rgb(228, 228, 228);
}

.color.down {
  color: rgb(255, 24, 24);
}

.color.up {
  color: rgb(51, 214, 51);
}
.up,
.down {
  cursor: pointer;
}

.baslik {
  background-color: var(--uludag-theme);
  width: fit-content;
  cursor: pointer;
}
</style>
