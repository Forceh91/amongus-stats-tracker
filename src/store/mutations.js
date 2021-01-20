export default {
	storeStats(state, stats) {
		if (!state || !stats) return;

		state.stats = stats;
	},
};
