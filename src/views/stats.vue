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
		},

		data() {
			return {};
		},

		methods: {},
	};
</script>

<style lang="scss" scoped></style>
