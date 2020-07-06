<template>
  <div ref="metin" class="entry-wrapper py-1">
    <h3 class="text-center pt-5" v-if="entry.length < 1">{{ Loading }}</h3>
    <entry-box
      v-for="(value, index) in entry.entrybilgi"
      :key="index"
      :entry="value"
      :no="20 * (beginning - 1) + index + 1"
    ></entry-box>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    entry: [],
    Loading: "Yükleniyor..."
  }),
  props: ["entryData", "beginning"],
  computed: {
    ...mapGetters({
      currentWindow: "getCurrentWindow"
    })
  },
  methods: {
    ...mapActions({
      fetchEntry: "fetchEntry"
    }),
    /**
     *
     * @description This function calls the function that is stored in Vuex and returns value for given parameters.
     * @param {Number} ba : Beginning of Entries.
     *
     */
    getEntry(ba = 0) {
      this.entry = [];
      this.fetchEntry({
        link: this.entryData.link,
        ba,
        callback: data => {
          if (data === "error" || data.hata) {
            this.Loading =
              "Başlık henüz açılmamış ya da veriler çekilirken bir hata oluştu.";
          } else {
            this.entry = data;
            let sayfaHesap = data.toplamentrysayisi / 20;
            if (sayfaHesap % 1 < 1) {
              if (
                Math.ceil(data.toplamentrysayisi / 20) ==
                data.sayfaonerileri.sonsayfa
              ) {
                this.currentWindow.toplamSayfa = parseInt(
                  data.sayfaonerileri.sonsayfa
                );
              } else {
                this.currentWindow.toplamSayfa =
                  parseInt(data.sayfaonerileri.sonsayfa) + 1;
              }
            } else {
              this.currentWindow.toplamSayfa = parseInt(
                data.sayfaonerileri.sonsayfa
              );
            }
          }
        }
      });
    }
  },
  mounted() {
    this.getEntry(this.beginning || 1);
  },
  watch: {
    beginning(v) {
      this.getEntry(v);
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
  background-color: rgba(77, 78, 105, 0.438);
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
</style>
