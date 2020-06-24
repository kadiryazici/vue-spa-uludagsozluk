import Vue from "vue";

import Navbar from "./components/navbar.vue";
import LeftFrame from "./components/leftFrame.vue";
import RightFrame from "./components/rightFrame.vue";
import Entry from "./components/Entry.vue";
import Select from "./components/Select.vue";
import EntryText from "./components/EntryText.vue";
import Search from "./components/Search.vue";
import Mainpage from "./components/Mainpage.vue";
import EntryBox from "./components/EntryBox.vue";

const com = (a, b) => {
  Vue.component(a, b);
};

com("navbar", Navbar);
com("leftFrame", LeftFrame);
com("rightFrame", RightFrame);
com("Entry", Entry);
com("ulu-select", Select);
com("entry-text", EntryText);
com("entry-search", Search);
com("main-page", Mainpage);
com("entry-box", EntryBox);
