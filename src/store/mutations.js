export default {
	storeStats(state, stats) {
		if (!state || !stats) return;

		state.stats = stats;
	},

	storeTrend(state, trend) {
		if (!state || !trend) return;

		state.trend = trend;
	},

	setUpdatingStats(state, updating) {
		if (!state) return;

		state.updatingStats = updating;
	},

	setPrefs(state, prefs) {
		if (!state) return;

		state.prefs = prefs;
	},
};
