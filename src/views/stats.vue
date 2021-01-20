<template>
	<section class="section">
		<div class="container">
			<statsversus
				title="Games Started"
				:total="stats.gamesStarted"
				:names="[`Crewmate`, `Impostor`]"
				:values="[stats.timesCrewmate, stats.timesImpostor]"
			/>
		</div>
		<div class="container">
			<statsversus title="Games Won" :total="totalWins" :names="[`Crewmate`, `Impostor`]" :values="[totalCrewWins, totalImpostorWins]" />
		</div>
		<div class="container"></div>
	</section>
</template>

<script>
	import { mapState } from "vuex";
	import statsversus from "../components/statsversus";

	export default {
		name: "stats",
		components: {
			statsversus,
		},

		computed: {
			...mapState(["stats"]),

			totalWins() {
				return this.totalCrewWins + this.totalImpostorWins;
			},

			totalCrewWins() {
				return this.stats.crewmateVoteWins + this.stats.crewmateTaskWins;
			},

			totalImpostorWins() {
				return this.stats.impostorVoteWins + this.stats.impostorKillsWins + this.stats.impostorSabotageWins;
			},
		},

		data() {
			return {};
		},

		methods: {},
	};
</script>

<style lang="scss" scoped>
	.container {
		margin-bottom: 2rem;
	}
</style>
