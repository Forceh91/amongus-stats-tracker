<template>
	<div>
		<h1 class="title left-align">{{ title }}</h1>

		<table class="table">
			<thead>
				<tr>
					<th class="right-border"></th>
					<th align="centre" colspan="2" class="right-border">Crewmate</th>
					<th align="centre" colspan="2" class="right-border">Impostor</th>
					<th align="centre" colspan="2">Overall</th>
				</tr>
			</thead>
			<thead>
				<tr>
					<th class="right-border" align="right">Game</th>
					<th align="right">Games</th>
					<th class="right-border" align="right">Wins</th>
					<th align="right">Games</th>
					<th class="right-border" align="right">Wins</th>
					<th align="right">Wins</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="trend in sortedTrend" :key="trend.game">
					<td class="right-border" align="right">{{ trend.game }}</td>
					<td class="crewmate" align="right">{{ trend.crewGames }}</td>
					<td class="crewmate right-border" align="right">
						{{ trend.crewmateWins }}<br />({{ calculatePercentage(trend.crewGames, trend.crewmateWins) }}%)
					</td>
					<td class="impostor" align="right">{{ trend.impostorGames }}</td>
					<td class="impostor right-border" align="right">
						{{ trend.impostorWins }}<br />({{ calculatePercentage(trend.impostorGames, trend.impostorWins) }}%)
					</td>
					<td align="right">{{ trend.wins }}<br />({{ calculatePercentage(trend.game, trend.wins) }}%)</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	export default {
		name: "trendtable",
		props: {
			title: String,
			trend: {
				type: Array,
				default: () => [],
			},
		},

		computed: {
			sortedTrend() {
				return [...this.trend].sort((a, b) => a.game - b.game);
			},
		},

		methods: {
			calculatePercentage(total, value) {
				return parseFloat((value / total) * 100).toFixed(2);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.title.left-align {
		font-size: 1.5rem;
		text-align: left;
	}

	.centre-align {
		text-align: center;
	}

	.crewmate {
		color: var(--crewmate-colour);
	}

	.impostor {
		color: var(--impostor-colour);
	}

	.table {
		width: 100%;

		td,
		th {
			border-right-width: 1px;
		}

		.right-border {
			border-right-width: 2px;
		}

		tbody {
			tr:not(:last-child) {
				border-bottom-width: 1px;
			}
		}
	}
</style>
