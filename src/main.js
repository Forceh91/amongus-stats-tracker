import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import statsLoader from "./stats-loader";

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount("#app");

// TODO: Move this somewhere more sensible
statsLoader.loadStatsFromFile(stats => {
	store.commit("storeStats", stats);

	// now stats are loaded we can get trends too
	const trend = statsLoader.getTrends();
	store.commit("storeTrend", trend);
});
