import Vuex from 'vuex'
import Vue from 'vue'
import cars from './cars'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        cars,
    },
});
