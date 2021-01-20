<template>
	<section class="section">
		<div class="container">
			<h1 class="title">Tracked Shows</h1>
			<h2 class="subtitle">Modify the shows that you are tracking with TvTracker</h2>
		</div>
		<div class="container">
			<div class="columns">
				<div class="column">
					<h1 class="title is-6">Search for shows</h1>
					<div class="container">
						<div class="field">
							<div class="control has-icons-left">
								<input type="search" class="input" placeholder="Search for a TV show" v-model="search.value" @input="startSearch" />
								<span class="icon is-left"><i class="fas fa-search"/></span>
							</div>
						</div>
					</div>
				</div>
				<div class="column">
					<h1 class="title is-6">Currently tracking</h1>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: "stats",

	data() {
		return {};
	},

	methods: {
	},
};
</script>

<style lang="scss" scoped>

</style>
