import Vue from "vue";
import Vuex from "vuex";
import { agile } from "./agile.module";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    agile,
  },
});
