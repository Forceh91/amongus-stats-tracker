<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	export default {
		mounted() {
			this.$router.push("/stats/");
		},
	};
</script>

<style lang="scss">
	@import "~bulmaswatch/darkly/bulmaswatch";

	html {
		background: #333;
		font-size: 14px;

		--crewmate-colour: #3498db;
		--impostor-colour: #e74c3c;
	}

	#app {
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #bbb;
	}
</style>
