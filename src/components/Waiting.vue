<template>
	<div class="content">
		<h1 v-if="success">✔</h1>
		<h1 v-if="!success">❌</h1>
		<h2><sub>CT</sub> <strong>{{ title }}</strong> <a :href="'https://www.youtube.com/watch?v='+youtubeId" target="_blank">↗</a></h2>
		<button @click="next">Suivant →</button>
	</div>
</template>

<style scoped>
	.content {
		text-align: center;
	}
	h1 {
		font-size: 1000%;
	}
	button {
		color: white;
		background-color: black;
		padding: 2px 5px;
		border: none;
		border-radius: 10px;
		font-size: inherit;
	}
</style>

<script>
	export default {
		name: 'Waiting',
		props: {
			success: Boolean,
			youtubeId: String,
			title: String,
		},
		methods: {
			next() {
				this.$emit('next');
			},
		},
		emits: ['next'],
	}
</script>
