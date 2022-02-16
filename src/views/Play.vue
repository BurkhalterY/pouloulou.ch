<template>
	<div class="game-container">
		<div class="disk-reader">
			<div class="disk">
				<div class="part-1 circle"></div>
				<div class="part-2 circle"></div>
				<div class="part-3 circle"></div>
				<div class="part-4 circle"></div>
			</div>
			<div class="reader">
				<div class="bar-1"></div>
				<div class="bar-2"></div>
				<div class="bar-3"></div>
				<div class="bar-4"></div>
			</div>
			<div class="timer circle">
				<span class="timer-number">{{ Math.min(Math.max(timer, 0), startTimer) }}</span>
			</div>
		</div>

		<div class="answer" v-if="currentTrack" :class="{ disable: !showAnswer}">
			<div class="attribute">Artiste : {{ currentTrack.artists.map(artist => artist.name).join() }}</div>
			<div class="attribute">Titre : {{ currentTrack.name }}</div>
			<div class="attribute">Album : {{ currentTrack.album.name }} ({{ new Date(currentTrack.album.release_date).getFullYear() }})</div>
			<div class="image">
				<img crossOrigin="Anonymous" :src="currentTrack.album.images[0].url" ref="image"/>
			</div>
		</div>

		<div class="controls" v-if="ready">
			<button @click="play">Play</button>
			<button @click="skip">Skip</button>
		</div>
		<div class="loading" v-else>
			<span>Loading...</span>
		</div>

		<div class="borders">
			<span class="border top right vertical"></span>
			<span class="border top right horizontal"></span>
			<span class="border top left vertical"></span>
			<span class="border top left horizontal"></span>
			<span class="border bottom right vertical"></span>
			<span class="border bottom right horizontal"></span>
			<span class="border bottom left vertical"></span>
			<span class="border bottom left horizontal"></span>
		</div>
	</div>
</template>

<style scoped>
	.game-container {
		background-color: v-bind('colors[3]');
		height: 100vh;
	}

	.border {
		width: calc(0.5 * var(--size-ref));
		height: calc(0.5 * var(--size-ref));
		background-color: v-bind('colors[5]');
		position: absolute;
		transition: v-bind('transition + "ms"') linear;
	}

	.border.horizontal {
		width: v-bind('borders.width + "vw"');
	}

	.border.vertical {
		height: v-bind('borders.height + "vh"');
	}

	.border.top {
		top: 0;
	}

	.border.right {
		right: 0;
	}

	.border.bottom {
		bottom: 0;
	}

	.border.left {
		left: 0;
	}

	.circle {
		border-radius: 100%;
	}

	.disk .circle {
		position: absolute;
		transform: translate(-50%, -50%);
		top: calc(6 * var(--size-ref));
		left: calc(5 * var(--size-ref));
	}

	.circle.part-1 {
		width: calc(10 * var(--size-ref));
		height: calc(10 * var(--size-ref));
		background-color: v-bind('colors[4]');
	}

	.circle.part-2 {
		width: calc(9 * var(--size-ref));
		height: calc(9 * var(--size-ref));
		background-color: v-bind('colors[5]');
	}

	.circle.part-3 {
		width: calc(3 * var(--size-ref));
		height: calc(3 * var(--size-ref));
		background-color: v-bind('colors[4]');
	}

	.circle.part-4 {
		width: calc(1 * var(--size-ref));
		height: calc(1 * var(--size-ref));
		background-color: v-bind('colors[0]');
	}

	.reader * {
		position: absolute;
	}

	.reader .bar-1 {
		width: calc(2 * var(--size-ref));
		height: calc(4 * var(--size-ref));
		top: calc(0 * var(--size-ref));
		left: calc(11 * var(--size-ref));
		background-color: v-bind('colors[2]');
	}

	.reader .bar-2 {
		width: calc(0.5 * var(--size-ref));
		height: calc(3 * var(--size-ref));
		top: calc(4 * var(--size-ref));
		left: calc(11.75 * var(--size-ref));
		background-color: v-bind('colors[0]');
	}

	.reader .bar-3 {
		width: calc(0.5 * var(--size-ref));
		height: calc(3 * var(--size-ref));
		top: calc(6.84 * var(--size-ref));
		left: calc(11.24 * var(--size-ref));
		background-color: v-bind('colors[0]');
		transform: rotate(20deg);
	}

	.reader .bar-4 {
		width: calc(1 * var(--size-ref));
		height: calc(1.5 * var(--size-ref));
		top: calc(9 * var(--size-ref));
		left: calc(10.45 * var(--size-ref));
		background-color: v-bind('colors[2]');
		transform: rotate(20deg);
	}

	.reader {
		transform-origin: calc(12 * var(--size-ref)) calc(2 * var(--size-ref));
		transform: v-bind('"rotate(" + rotation + "deg)"');
		transition: v-bind('transition + "ms"') linear;
	}

	.timer {
		position: absolute;
		border: calc(0.2 * var(--size-ref)) solid v-bind('colors[2]');
		background-color: v-bind('colors[6]');
		width: calc(3 * var(--size-ref));
		height: calc(3 * var(--size-ref));
		top: calc(0.25 * var(--size-ref));
		left: calc(10.25 * var(--size-ref));
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.timer-number {
		font-family: Audiowide;
		font-size: calc(1.5 * var(--size-ref));
		color: v-bind('colors[0]');
		z-index: 1;
	}

	.timer::before {
		content: "";
		width: calc(1.5 * var(--size-ref));
		padding-left: calc(1.5 * var(--size-ref));
		height: calc(0.2 * var(--size-ref));
		position: absolute;
		background-color: v-bind('colors[4]');
		background-clip: content-box;
		transform: v-bind('"rotate(" + rotationTimer + "deg)"');
		transition: v-bind('transition + "ms"') linear;
		z-index: 0;
	}

	.disk-reader {
		position: absolute;
		width: calc(14 * var(--size-ref));
		height: calc(11 * var(--size-ref));
		top: calc(1 * var(--size-ref));
		left: calc(1 * var(--size-ref));
	}

	.answer {
		position: absolute;
		width: calc(14 * var(--size-ref));
		height: calc(11 * var(--size-ref));
		top: calc(1 * var(--size-ref));
		right: calc(1 * var(--size-ref));
	}

	.answer .attribute {
		color: white;
		font-family: consolas;
	}

	.image img {
		max-width: 100%;
	}

	.controls, .loading {
		display: flex;
		justify-content: space-evenly;
		position: absolute;
		bottom: calc(0.5 * var(--size-ref));
		width: 100%;
	}

	.controls > button {
		width: 200px;
		height: 100px;
		background-color: v-bind('colors[4]');
		border: none;
		border-left: 5px solid v-bind('colors[6]');
		border-right: 5px solid v-bind('colors[6]');
		font-size: 300%;
		font-family: Audiowide;
	}

	.controls > button:active {
		transform-origin:  bottom center;
		transform: rotateX(30deg);
		background-image: linear-gradient(v-bind('colors[4]'), v-bind('colors[5]'));
	}

	.loading {
		font-size: 500%;
	}

	@media (max-width: 70vh) {
		.disk .circle {
			border: white solid 3px;
		}
		.disk-reader {
			transform: rotate(-90deg);
			top: calc(2 * var(--size-ref));
			left: calc( 0 * var(--size-ref));
		}
		.answer {
			transform: rotate(-90deg);
			top: calc(2 * var(--size-ref));
			right: calc( 0 * var(--size-ref));
		}
		.timer {
			transform: rotate(90deg);
		}
	}

	.disable {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}
</style>

<script>
	import { ref, watch } from 'vue'
	import spotify from '@/api/spotify.js'
	import SpotifyWebApi from 'spotify-web-api-js'
	import FaseAverageColor from 'fast-average-color'

	export default {
		name: 'Play',
		setup() {
			const ready = ref(false)
			const startTimer = ref(30)
			const stopMusicAfterTime = ref(10)
			const autoplay = ref(false)

			const colors = ref(['#ff0000', '#c00000', '#af0000', '#880000', '#580000', '#300000', '#000000'])
			const rotation = ref(0)
			const rotationTimer = ref(0)
			const timer = ref(startTimer.value)
			const transition = ref(1000)
			const showAnswer = ref(false)
			const borders = ref({ width: 0, heigh: 0 })
			const image = ref(null)

			const currentTrack = ref(null)
			const playlist = ref([])

			let interval = null
			let spotifyApi = new SpotifyWebApi()
			let fac = new FaseAverageColor()

			spotifyApi.setAccessToken(localStorage.getItem('spotify_token'))
			spotifyApi.getPlaylist('4vHIKV7j4QcZwgzGQcZg1x')
				.then(data => {
					playlist.value = data.tracks.items
				}, err => {
					console.error(err)
				})

			const getColors = (r = 0, g = 0, b = 0) => {

				const getCode = (val, index) => Math.round(Math.abs(42.5 * index * val)).toString(16).padStart(2, '0')

				const colors = []
				for (let i = 0; i <= 6; i++) {
					colors.push('#' + getCode(r, i) + getCode(g, i) + getCode(b, i))
				}
				return colors
			}

			const setCSSEffectsAs = currentTime => {
				if(currentTime == 'reset') {
					borders.value.width = 0
					borders.value.height = 0
					rotation.value = 0
					rotationTimer.value = 0
					return
				}
				const ratio = ((startTimer.value - currentTime) / startTimer.value)
				const start = 21
				const end = 42
				borders.value.width = ratio * 50
				borders.value.height = ratio * 50
				rotation.value = ratio * (end - start) + start
				rotationTimer.value = ratio * 360
			}

			const eachSecond = () => {
				timer.value--
				if (timer.value >= 0) {
					setCSSEffectsAs(timer.value)
				} else if (timer.value == -1) {
					showAnswer.value = true
					const rgb = fac.getColor(image.value)
					colors.value = getColors(rgb.value[0] / 255, rgb.value[1] / 255, rgb.value[2] / 255)
				} else if (autoplay.value && timer.value == -stopMusicAfterTime.value) {
					play()
				}
			}

			const nextMusic = () =>  {
				currentTrack.value = playlist.value.splice(Math.floor(Math.random() * playlist.value.length), 1)[0].track
				let timecode = Math.floor(Math.random() * (currentTrack.value.duration_ms - startTimer.value - stopMusicAfterTime.value))
				spotify.play(currentTrack.value.uri, timecode)

				timer.value = startTimer.value + 1
				showAnswer.value = false
				
				if(interval){
					clearInterval(interval)
				}
				transition.value = 1000
				interval = setInterval(eachSecond, 1000)
			}

			const play = () => {
				setCSSEffectsAs('reset')
				transition.value = 1000
				setTimeout(() => {
					nextMusic()
				}, 1000)
			}

			const skip = () => {
				if(interval){
					clearInterval(interval)
				}
				transition.value = 100
				interval = setInterval(eachSecond, 100)
			}

			watch(spotify.ready, newValue => {
				ready.value = newValue
				if(autoplay.value){
					nextMusic()
				}
			})

			return {
				ready,
				startTimer,
				stopMusicAfterTime,
				autoplay,
				colors,
				rotation,
				rotationTimer,
				timer,
				transition,
				showAnswer,
				borders,
				image,
				currentTrack,
				playlist,
				play,
				skip,
			}
		}
	}
</script>
