import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import statsLoader from "./stats-loader";
import playerPrefsLoader from "./playerPrefs-loader";

Vue.config.productionTip = false;

const UPDATE_INTERVAL = 5 * 60 * 1000; // 5 minutes

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount("#app");

// TODO: Move this somewhere more sensible
function loadStats(callback) {
	statsLoader.loadStatsFromFile(stats => {
		store.commit("storeStats", stats);

		// now stats are loaded we can get trends too
		const trend = statsLoader.getTrends();
		store.commit("storeTrend", trend);

		if (typeof callback === "function") callback(stats);
	});
}

loadStats();

// TODO: also move somewhere more sensible
setInterval(() => {
	store.commit("setUpdatingStats", true);
	loadStats(() => {
		store.commit("setUpdatingStats", false);
	});
}, UPDATE_INTERVAL);

// TODO: move somewhere too
playerPrefsLoader.loadPlayerPrefsFromFile(prefs => {
	store.commit("setPrefs", prefs);
});
