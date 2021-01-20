<template>
	<div>
		<h1 class="title is-spaced">{{ total }}</h1>
		<h2 class="subtitle">{{ title }}</h2>
		<div id="values" class="container">
			<div class="value-container" id="left_side">
				<h1 class="data-title">{{ leftName }}</h1>
				<h2 class="data-value">{{ leftValue }}</h2>
				<h2 class="data-value small">({{ leftPercentage }}%)</h2>
			</div>
			<div class="value-container" id="right_side">
				<h1 class="data-title">{{ rightName }}</h1>
				<h2 class="data-value">{{ rightValue }}</h2>
				<h2 class="data-value small">({{ rightPercentage }}%)</h2>
			</div>
		</div>
		<div id="versus_bar">
			<div class="progress-bar left-progress" role="progressbar" :style="{ width: `${leftPercentage}%` }"></div>
			<div class="progress-bar right-progress" role="progressbar" :style="{ width: `${rightPercentage}%` }"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "statsversus",
		props: {
			title: String,
			total: Number,
			names: Array,
			values: Array,
		},

		computed: {
			leftName() {
				return (this.names && this.names[0]) || "N/A";
			},

			leftValue() {
				return (this.values && this.values[0]) || 0;
			},

			leftPercentage() {
				return parseFloat((this.leftValue / this.total) * 100).toFixed(2);
			},

			rightName() {
				return (this.names && this.names[1]) || "N/A";
			},

			rightValue() {
				return (this.values && this.values[1]) || 0;
			},

			rightPercentage() {
				return parseFloat((this.rightValue / this.total) * 100).toFixed(2);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.title.is-spaced {
		margin-bottom: 1rem;
	}

	#values {
		display: flex;
		flex-grow: 0;
	}

	.data-title {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.data-value {
		color: #eaeaea;
		font-size: 2rem;

		&.small {
			margin-top: 0.5rem;
			font-size: 1rem;
		}
	}

	#left_side {
		.data-value {
			color: var(--crewmate-colour);
		}
	}

	#right_side {
		margin-left: auto;

		.data-value {
			color: var(--impostor-colour);
		}
	}

	#versus_bar {
		display: flex;
		height: 20px;
		margin-top: 1.5rem;
		width: 100%;

		.progress-bar {
			border: 1px solid #333;
			height: 100%;

			&:not(:last-child) {
				border-right: 0;
			}

			&.left-progress {
				background: var(--crewmate-colour);
			}

			&.right-progress {
				background: var(--impostor-colour);
			}
		}
	}
</style>
