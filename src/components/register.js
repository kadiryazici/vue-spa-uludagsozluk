import Vue from "vue";

import Navbar from "./components/Navbar.vue";
import LeftFrame from "./components/LeftFrame.vue";
import RightFrame from "./components/RightFrame.vue";
import Entry from "./components/Entry.vue";
import UluSelect from "./components/UluSelect.vue";
import EntryText from "./components/EntryText.vue";
import EntrySearch from "./components/EntrySearch.vue";
import Mainpage from "./components/Mainpage.vue";
import EntryBox from "./components/EntryBox.vue";
import BkzText from "./components/BkzText.vue";

const $ = (a, b) => {
  Vue.component(a, b);
};

$("Navbar", Navbar);
$("left-frame", LeftFrame);
$("right-frame", RightFrame);
$("Entry", Entry);
$("ulu-select", UluSelect);
$("entry-text", EntryText);
$("entry-search", EntrySearch);
$("main-page", Mainpage);
$("entry-box", EntryBox);
$("entry-bkz", BkzText);
