<template>
	<div class="content">
		<label for="playlist">Playlist URL:</label><br>
		<input type="text" name="playlist" id="playlist" v-model="playlistUrl" @keyup.enter="start">
		<input type="text" name="timer" id="timer" v-model="timer"><br>
		<button @click="start" v-bind:class="{ hide: !playlistUrl }">Let's go !</button>
	</div>
</template>

<style scoped>
	.content {
		text-align: center;
	}
	input {
		width: 75%;
		margin: 0 1px;
		padding: 5px 10px;
		font-size: inherit;
		font-family: inherit;
	}
	input[name="playlist"] {
		width: 70%;
		border-radius: 10px 0 0 10px;
	}
	input[name="timer"] {
		width: 5%;
		border-radius: 0 10px 10px 0;
		text-align: right;
	}
	button {
		color: white;
		background-color: darkblue;
		margin: 5px;
		padding: 15px;
		border: none;
		border-radius: 10px;
		font-size: inherit;
		font-family: inherit;
		text-transform: capitalize;
	}
	button:hover {
		color: red;
		background-color: black;
	}
	.hide {
		opacity: 0;
	}
</style>

<script>
	import axios from 'axios';

	export default {
		name: 'Config',
		data() {
			return {
				playlistUrl: '',
				timer: 30,
			}
		},
		methods: {
			async start() {
				if(!this.playlistUrl) return;
				const playlistId = new URL(this.playlistUrl).searchParams.get('list');
				const apiKey = localStorage.getItem('YT_API_KEY');
				let pageToken = '';
				let videos = [];

				/* eslint-disable no-constant-condition */
				while(true){
					const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&part=snippet&playlistId=${playlistId}&maxResults=50&pageToken=${pageToken}`;
					const response = await axios.get(url);
					for(let video of response.data.items){
						videos.push(video.snippet.resourceId.videoId);
					}
					if(response.data.nextPageToken){
						pageToken = response.data.nextPageToken;
					} else {
						break;
					}
				}

				this.$emit('start', videos, this.timer);
			}
		},
		emits: ['start'],
	}
</script>
