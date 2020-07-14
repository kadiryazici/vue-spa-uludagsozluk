<template>
  <div ref="metin" class="entry-content">
      <entry-bkz v-for="value in createComponent(metin)" :text="value"/>
  </div>
</template>

<script>
export default {
  props: ["metin", "nowork"],
  methods: {
    decodeHtml(text) {
      let a = document.createElement("textarea");
      a.innerHTML = text;
      return a.value;
    },

    createComponent(v) {
      let b = v;
      b.replace(/</g, "&lsaquo;");
      b.replace(/>/g, "&rsaquo;");

      let a;

      if (this.$parent.no) a = b.split(/\s\s\s?/g).join(" <br><br>");
      else a = b.split("\n").join(" <br>");

      //test
      let test = a;

      //links
      let testLinks = test.matchAll(/(https?:\/\/[^\s\[]+)/g);
      let testLinkMatches = [...testLinks];
      for (const alink of testLinkMatches) {
        test = test.replace(alink[0], `!*(link:${alink[0]})!*`);
      }

      //bkz strings to a click event by vue to open new entry.
      let testBkz = test.matchAll(/\(bkz:([^)]+)\)/g);
      let testBkzMatches = [...testBkz];
      for (const entrybkz of testBkzMatches) {

        test = test.replace(entrybkz[0], `!*(baslik:${entrybkz[1]})!*`);

      }

      //img links to an img link.
      let testImg = test.matchAll(/\(img:([^)]+)\)/g);
      let testImgMatches = [...testImg];
      for (const img of testImgMatches) {
        test = test.replace(img[0], `!*(link:https://galeri.uludagsozluk.com/r/${img[1].split('#').join('')})!*`);
      }

      //video links to an img link.
      let testVideo = test.matchAll(/\(vid:([^)]+)\)/g);
      let testVideoMatches = [...testVideo];
      for (const video of testVideoMatches) {
        test = test.replace(video[0], `!*(link:https://video.uludagsozluk.com/v/${video[1].split('#').join('')})!*`);
      }

      //quotes
      let testQuote = test.matchAll(/\`(.*?)\`/g);
      let testQuoteMatches = [...testQuote];
      for (const entrybkz of testQuoteMatches) {
        test = test.replace(entrybkz[0], `!*(quote:${entrybkz[1]})!*`);
      }

      console.log(this.decodeHtml(test));

      test = test.replace(/javascript\:\{\}(.?)(<br>)?(\s<br>)?(\s<br>)?/g,'');

      let result = this.decodeHtml(test).split('!*');

      return result;

//
// /*----------------------------------------------------------------------------------------*/
//       //Link strings to A element.
//       let links = a.matchAll(/(https?:\/\/[^\s\[]+)/g);
//       let linkMatches = [...links];
//       for (const alink of linkMatches) {
//         let aurl = `<a class="bkz-a link-a" target="_blank" href="${alink[0]}">${alink[0]}</a>`;
//         a = a.replace(alink[0], aurl);
//       }
//
//       //bkz strings to a click event by vue to open new entry.
//       let bkz = a.matchAll(/\(bkz:([^)]+)\)/g);
//       let matches = [...bkz];
//       for (const entrybkz of matches) {
//         let reg = entrybkz;
//
//         if (!this.decodeHtml(reg[0]).includes("#")) {
//           let bkzEl = `<entry-bkz :bkz="'${reg[1].trim()}'"/>`;
//
//           a = a.replace(entrybkz[0], this.decodeHtml(bkzEl));
//         } else {
//           let entry = entrybkz[1].split("#");
//
//           a = a.replace(
//             entrybkz[0],
//             `(entry: ${entry[0]}#` + this.decodeHtml(entry[1]) + ")"
//           );
//         }
//       }
//
//       //bkz strings to a click event by vue to open new entry.
//       let mainPageBkz = a.matchAll(/\/e\/([^)]+\/)\)/g);
//       let mainMatches = [...mainPageBkz];
//       for (const entrybkz of mainMatches) {
//         a = a.replace(
//           entrybkz[0],
//           `(entry: #` + this.decodeHtml(entrybkz[1].replace("/", "")) + ")"
//         );
//       }
//
//       //img links to an img link.
//       let imgs = a.matchAll(/\(img:([^)]+)\)/g);
//       let imgMatches = [...imgs];
//       for (const img of imgMatches) {
//         let aurl = `<a class="bkz-a link-a" target="_blank" href="https://galeri.uludagsozluk.com/r/${img[1]}/">(görüntü: ${img[1]})</a>`.replace(
//           "#",
//           ""
//         );
//         aurl = aurl.split("#").join("");
//         a = a.replace(img[0], aurl);
//       }
//
//       //video links to a video link.
//       let videos = a.matchAll(/\(vid:([^)]+)\)/g);
//       let videoMatches = [...videos];
//       for (const video of videoMatches) {
//         let aurl = `<a class="bkz-a link-a" target="_blank" href="https://video.uludagsozluk.com/v/${video[1]}/">(video: ${video[1]})</a>`;
//         aurl = aurl.split("#").join("");
//         a = a.replace(video[0], aurl);
//       }
//
//       if (a.includes("javascript:{}")) {
//         a = a.replace(/javascript:{}\s?/g, "");
//       }
//
//       // strings betwween ` to a click event by vue to open new entry.
//       let quoteBkz = a.matchAll(/\`(.*?)\`/g);
//       let qMatches = [...quoteBkz];
//       for (const entrybkz of qMatches) {
//         let bkzEl = `<entry-bkz :quote="true" :bkz="'${entrybkz[1].trim()}'"/>`;
//         a = a.replace(entrybkz[0], this.decodeHtml(bkzEl));
//       }
//
//       a = a.replace(
//         /\-\-spoiler\-\-/g,
//         `<entry-bkz :quote="true" bkz="--spoiler--" />`
//       );
//
//       return "<span>" + a + "</span>";
    }
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
