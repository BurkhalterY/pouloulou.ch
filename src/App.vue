<template>
	<div class="content">
		<Main/>
	</div>
</template>

<style scoped>
	.content {
		display: flex;
		height: 100vh;
	}
</style>

<style>
	body {
		margin: 0;
		background-color: skyblue;
		font-size: 200%;
		font-family: "Comic Sans MS";
	}
</style>

<script>
	import axios from 'axios';
	import Main from './components/Main.vue'

	async function checkKey() {
		let key = localStorage.getItem('YT_API_KEY');
		if(!key){
			key = prompt("Clé YouTube API (cela ne vous sera demandé qu'une seule fois).");
			localStorage.setItem('YT_API_KEY', key);
		}

		const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=pouloulou&type=video&key=' + key;
		await axios.get(url).catch(() => {
			localStorage.removeItem('YT_API_KEY');
			checkKey();
		});
	}

	export default {
		name: 'App',
		components: {
			Main,
		},
		async created() {
			checkKey();
		},
	}
</script>
