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
		<div class="container">
			<h1 class="title left-align">General Stats</h1>
			<ul class="stat-grid">
				<li>
					<b>Bodies Reported:</b> <span>{{ stats.bodiesReported }}</span>
				</li>
				<li>
					<b>Emergencies Called:</b> <span>{{ stats.emergenciesCalled }}</span>
				</li>
				<li>
					<b>Sabotages Fixed:</b> <span>{{ stats.sabotagesFixed }}</span>
				</li>
				<li>
					<b>Times Ejected:</b> <span>{{ stats.timesEjected }}</span>
				</li>
			</ul>
		</div>
		<div class="container">
			<h1 class="title crewmate left-align">Crewmate Stats</h1>
			<ul class="stat-grid">
				<li>
					<b>Crewmate Game Streak:</b><span>{{ stats.crewmateStreak }}</span>
				</li>
				<li>
					<b>Tasks Completed:</b> <span>{{ stats.tasksCompleted }}</span>
				</li>
				<li>
					<b>All Tasks Completed:</b> <span>{{ stats.allTasksCompleted }}</span>
				</li>
				<li>
					<b>Times Murdered:</b> <span>{{ stats.timesMurdered }}</span>
				</li>
				<li>
					<b>Vote Wins:</b> <span>{{ stats.crewmateVoteWins }}</span>
				</li>
				<li>
					<b>Task Wins:</b> <span>{{ stats.crewmateTaskWins }}</span>
				</li>
			</ul>
		</div>
		<div class="container">
			<h1 class="title impostor left-align">Impostor Stats</h1>
			<ul class="stat-grid">
				<li>
					<b>Kills:</b> <span>{{ stats.impostorKills }}</span>
				</li>
				<li>
					<b>Kill Wins:</b> <span>{{ stats.impostorKillsWins }}</span>
				</li>
				<li>
					<b>Vote Wins:</b> <span>{{ stats.impostorVoteWins }}</span>
				</li>
				<li>
					<b>Sabotage Wins:</b> <span>{{ stats.impostorSabotageWins }}</span>
				</li>
			</ul>
		</div>
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
		&:not(:last-child) {
			margin-bottom: 2rem;
		}

		display: flex;
		flex-direction: column;
	}

	.title.left-align {
		text-align: left;
	}

	.crewmate {
		color: var(--crewmate-colour);
	}

	.impostor {
		color: var(--impostor-colour);
	}

	.stat-grid {
		margin-left: -1rem;
		text-align: left;
		width: 100%;

		li {
			&:not(:last-child) {
				margin-bottom: 0.5rem;
			}

			float: left;
			margin-left: 1rem;
			width: calc(50% - 1rem);

			span {
				float: right;
			}
		}
	}
</style>
