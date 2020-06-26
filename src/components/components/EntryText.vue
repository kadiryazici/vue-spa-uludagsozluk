<template>
  <div ref="metin" v-html="iyiMetin(metin)" class="entry-content"></div>
</template>

<script>
export default {
  props: ["metin", "nowork"],
  methods: {
    /**
     * @description This function is going to convert string to readable string, links to A elememnt and "bkz" links to bkz link.
     * @param {string} v
     * @returns {string}
     */

    iyiMetin(v) {
      if (this.nowork === "true") {
        return v;
      } else {
        let b = v;
        b.replace("<", "&lsaquo;");
        b.replace(">", "&rsaquo;");
        let a;
        if (this.$parent.no) {
          a = b.split(/\s\s\s?/g).join(" <br>");
        } else {
          a = b.split("\n").join(" <br>");
        }

        //Link strings to A element.
        let links = a.matchAll(/(https?:\/\/[^\s\[]+)/g);
        let linkMatches = [...links];
        if (linkMatches.length > 0) {
          for (const alink of linkMatches) {
            let aurl = `<a class="bkz-a link-a" target="_blank" href="${alink[0]}">${alink[0]}</a>`;
            a = a.replace(alink[0], aurl);
          }
        }

        //bkz strings to a click event by vue to open new entry.
        let bkz = a.matchAll(/\(bkz:([^)]+)\)/g);
        let matches = [...bkz];
        if (matches.length > 0) {
          for (const entrybkz of matches) {
            let reg = entrybkz;
            let aElement = `<a class="bkz-a" vue-use-this='${reg[1]
              .trimStart()
              .replace(" ", "-")}' target="_blank" href="${
              window.location.origin
            }/?type=baslik&link=${reg[1]
              .trimStart()
              .split(" ")
              .join("-")}">${reg[0]}</a>`;
            a = a.replace(entrybkz[0], aElement);
          }
        }

        //img links to an img link.
        let imgs = a.matchAll(/\(img:([^)]+)\)/g);
        let imgMatches = [...imgs];
        if (imgMatches.length > 0) {
          for (const img of imgMatches) {
            let aurl = `<a class="bkz-a link-a" target="_blank" href="https://galeri.uludagsozluk.com/r/${img[1]}/">https://galeri.uludagsozluk.com/r/${img[1]}/</a>`.replace(
              "#",
              ""
            );
            aurl = aurl.split("#").join("");
            a = a.replace(img[0], aurl);
          }
        }

        //video links to a video link.
        let videos = a.matchAll(/\(vid:([^)]+)\)/g);
        let videoMatches = [...videos];
        if (videoMatches.length > 0) {
          for (const video of videoMatches) {
            let aurl = `<a class="bkz-a link-a" target="_blank" href="https://video.uludagsozluk.com/v/${video[1]}/">https://video.uludagsozluk.com/v/${video[1]}/</a>`;
            aurl = aurl.split("#").join("");
            a = a.replace(video[0], aurl);
          }
        }

        if (a.includes("javascript:{}")) {
          a = a.replace(/javascript:{}\s?/g, "");
        }

        // strings betwween ` to a click event by vue to open new entry.
        let quoteBkz = a.matchAll(/\`(.*?)\`/g);
        let qMatches = [...quoteBkz];
        if (qMatches.length > 0) {
          for (const entrybkz of qMatches) {
            let reg = entrybkz;
            let aElement = `<a class="bkz-a" vue-use-this='${reg[1]
              .trimStart()
              .replace(" ", "-")}' target="_blank" href="${
              window.location.origin
            }/?type=baslik&link=${reg[1]
              .trimStart()
              .split(" ")
              .join("-")}">${reg[1]}</a>`;
            a = a.replace(entrybkz[0], aElement);
          }
        }

        return a;
      }
    },

    /**
     * @description This is going to get "bkz" links and bind an event on them to open a new Page in VUE withour reloading
     *              the page, not in new tab.
     */

    bkzWindow() {
      setTimeout(() => {
        let bkz = this.$refs.metin.querySelectorAll("a[vue-use-this]");
        bkz.forEach(element => {
          element.onclick = e => {
            e.preventDefault();
            let att = element.getAttribute("vue-use-this");
            let windowValue = {
              type: "baslik",
              baslik: att,
              link: att.replace(" ", "-"),
              sayfa: 1,
              toplamSayfa: 1
            };
            this.$store.commit("addWindow", windowValue);
            this.$store.dispatch("changeState", {
              type: "baslik",
              baslik: windowValue.baslik,
              basliklink: windowValue.link
            });
          };
        });
      }, 50);
    }
  },

  mounted() {
    this.bkzWindow();
  }
};
</script>

<style scoped>
.entry-content {
  font-size: 15px;
  line-height: 24px;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.entry-content >>> a {
  text-decoration: none;
  color: var(--uludag-theme);
  text-shadow: 0 0 10px var(--uludag-theme);
  margin-right: 5px;
}

.entry-content >>> a:hover {
  color: rgb(166, 54, 231);
}

.entry-content >>> .link-a::after {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 16px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  content: "launch";
}
</style>
