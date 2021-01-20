export default {
	storeStats(state, stats) {
		if (!state || !stats) return;

		state.stats = stats;
	},

	storeTrend(state, trend) {
		if (!state || !trend) return;

		state.trend = trend;
	},
};
