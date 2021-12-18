<template>
	<div class="content">
		<Config @start="start" v-if="!started"/>
		<Player ref="player" :youtubeId="youtubeId" :sampleDuration="timer" @finish="finish" v-bind:class="{ hide: !started || waiting }"/>
		<Waiting @next="next" :success="success" :youtubeId="youtubeId" :title="title" v-if="waiting"/>
	</div>
</template>

<style scoped>
	.content {
		width: 90vw;
		margin: auto;
	}
	.hide {
		display: none;
	}
</style>

<script>
	import Config from './Config.vue'
	import Player from './Player.vue'
	import Waiting from './Waiting.vue'

	export default {
		name: 'Main',
		components: {
			Config,
			Player,
			Waiting,
		},
		data() {
			return {
				youtubeId: null,
				started: false,
				waiting: false,
				success: false,
				title: '',
				videos: [],
				timer: 0,
			}
		},
		methods: {
			start(videos, timer) {
				this.videos = videos;
				this.timer = timer;
				this.started = true;
				this.next();
			},
			finish(success, title) {
				this.success = success;
				this.title = title;
				this.waiting = true;
			},
			next() {
				this.youtubeId = this.videos.splice(Math.floor(Math.random() * this.videos.length), 1)[0];
				this.waiting = false;
				this.$refs.player.start(this.youtubeId);
			},
		},
	}
</script>
