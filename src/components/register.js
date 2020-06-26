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

const com = (a, b) => {
  Vue.component(a, b);
};

com("Navbar", Navbar);
com("left-frame", LeftFrame);
com("right-frame", RightFrame);
com("Entry", Entry);
com("ulu-select", UluSelect);
com("entry-text", EntryText);
com("entry-search", EntrySearch);
com("main-page", Mainpage);
com("entry-box", EntryBox);
