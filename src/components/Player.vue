<template>
	<div class="content">
		<h1>{{counter}}</h1>
		<iframe :src="'https://www.youtube.com/embed/'+youtubeId+'?autoplay=1&controls=0&disablekb=1&rel=0&showinfo=0&start='+timecode" class="hide"></iframe>
		<input type="text" name="answer" id="answer" v-model="answer" @keyup.enter="check" placeholder="Pèche-toi !"><br>
	</div>
</template>

<style scoped>
	.content {
		text-align: center;
	}
	h1 {
		font-size: 1000%;
	}
	iframe {
		width: 75%;
		aspect-ratio: 16 / 9;
		display: block;
		margin: auto;
	}
	input[type="text"] {
		text-align: center;
		width: 75%;
		padding: 5px 10px;
		border-radius: 10px;
		font-size: inherit;
		font-family: inherit;
	}
	.hide {
		display: none;
	}
</style>

<script>
	import axios from 'axios';
	import moment from 'moment';

	export default {
		name: 'Player',
		props: {
			youtubeId: String,
			sampleDuration: Number,
		},
		data() {
			return {
				counter: 0,
				timecode: 0,
				title: '',
				answer: '',
				interval: null,
			}
		},
		methods: {
			async start(youtubeId) {
				const apiKey = localStorage.getItem('YT_API_KEY');
				const url = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet,contentDetails&id=${youtubeId}`;
				const response = await axios.get(url);
				this.title = response.data.items[0].snippet.title;

				let duration = moment.duration(response.data.items[0].contentDetails.duration).asSeconds();
				this.counter = this.sampleDuration;
				this.timecode = Math.floor(Math.random() * (duration - this.sampleDuration));

				this.interval = setInterval(() => {
					if(this.counter == 0){
						new Audio(require('@/assets/wrong.mp3')).play();
						clearInterval(this.interval);
						this.answer = '';
						this.$emit('finish', false, this.title);
					}
					this.counter--;
				}, 1000);
			},
			async check() {
				const apiKey = localStorage.getItem('YT_API_KEY');
				const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.answer}&type=video&key=${apiKey}`;
				const response = await axios.get(url);
				for(let result of response.data.items){
					if(result.id.videoId == this.youtubeId){
						new Audio(require('@/assets/success.mp3')).play();
						clearInterval(this.interval);
						this.answer = '';
						this.$emit('finish', true, this.title);
						return;
					}
				}
				new Audio(require('@/assets/wrong.mp3')).play();
			},
		},
		emits: ['finish'],
	}
</script>
