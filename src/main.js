import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import loadStatsFromFile from "./stats-loader";

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount("#app");

// TODO: Move this somewhere more sensible
loadStatsFromFile(stats => {
	store.commit("storeStats", stats);
	console.log(store);
});
