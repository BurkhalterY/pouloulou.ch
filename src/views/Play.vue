<template>
	<div class="game_container">
		<div class="answer">
			<div class="title">{{ title }}</div>
			<div class="date">{{ date }}</div>
			<div class="album">{{ album }}</div>
			<div class="author">{{ author }}</div>
			<div class="image">
				<img ref="image"/>
			</div>
		</div>
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
				<span class="timer_number" ref="timer_number"></span>
			</div>
		</div>

		<div class="volume_bar disable">
			<div class="volume_bar_value"></div>
		</div>
		<div class="audio_visualisation">

		</div>
		<div class="borders" ref="borders">
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
	.volume_bar {
		margin: 20px;
		opacity: 1;
		background-color: transparent;
		border: 6px solid var(--color-lv3);
		width: 20px;
		height: 200px;
		display: flex;
		align-items: flex-end;
	}

	.volume_bar_value {
		width: 20px;
		height: 0;
		background-color: var(--color-lv5);
		bottom: 0;
	}

	.border {
		width: calc(0.5 * var(--size-ref));
		height: calc(0.5 * var(--size-ref));
		background-color: var(--color-lv6);
		position: absolute;
		transition: 1000ms linear;
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
		background-color: var(--color-lv5);
	}

	.circle.part-2 {
		width: calc(9 * var(--size-ref));
		height: calc(9 * var(--size-ref));
		background-color: var(--color-lv6);
	}

	.circle.part-3 {
		width: calc(3 * var(--size-ref));
		height: calc(3 * var(--size-ref));
		background-color: var(--color-lv5);
	}

	.circle.part-4 {
		width: calc(1 * var(--size-ref));
		height: calc(1 * var(--size-ref));
		background-color: var(--color-lv1);
	}

	.reader * {
		position: absolute;
	}

	.reader .bar-1 {
		width: calc(2 * var(--size-ref));
		height: calc(4 * var(--size-ref));
		top: calc(0 * var(--size-ref));
		left: calc(11 * var(--size-ref));
		background-color: var(--color-lv3);
	}

	.reader .bar-2 {
		width: calc(0.5 * var(--size-ref));
		height: calc(3 * var(--size-ref));
		top: calc(4 * var(--size-ref));
		left: calc(11.75 * var(--size-ref));
		background-color: var(--color-lv1);
	}

	.reader .bar-3 {
		width: calc(0.5 * var(--size-ref));
		height: calc(3 * var(--size-ref));
		top: calc(6.84 * var(--size-ref));
		left: calc(11.24 * var(--size-ref));
		background-color: var(--color-lv1);
		transform: rotate(20deg);
	}

	.reader .bar-4 {
		width: calc(1 * var(--size-ref));
		height: calc(1.5 * var(--size-ref));
		top: calc(9 * var(--size-ref));
		left: calc(10.45 * var(--size-ref));
		background-color: var(--color-lv3);
		transform: rotate(20deg);
	}

	.reader {
		transform-origin: calc(12 * var(--size-ref)) calc(2 * var(--size-ref));
		transform: rotate(var(--rotation));
		transition: 1s linear;
	}

	body.ended .reader {
		transform: rotate(0deg);
	}

	.timer {
		position: absolute;
		border: calc(0.2 * var(--size-ref)) solid var(--color-lv3);
		background-color: var(--color-lv7);
		width: calc(3 * var(--size-ref));
		height: calc(3 * var(--size-ref));
		top: calc(0.25 * var(--size-ref));
		left: calc(10.25 * var(--size-ref));
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.timer_number {
		font-family: Audiowide;
		font-size: calc(2 * var(--size-ref));
		color: var(--color-lv1);
		padding-top: calc(0.4 * var(--size-ref));
		z-index: 1;
	}

	.timer::before {
		content: "";
		width: calc(1.5 * var(--size-ref));
		padding-left: calc(1.5 * var(--size-ref));
		height: calc(0.2 * var(--size-ref));
		position: absolute;
		background-color: var(--color-lv5);
		background-clip: content-box;
		transform: rotate(var(--rotation-timer));
		transition: 1000ms linear;
		z-index: 0;
	}

	.disk-reader {
		position: relative;
		width: calc(14 * var(--size-ref));
		height: calc(11 * var(--size-ref));
		top: calc(1 * var(--size-ref));
		left: calc(1 * var(--size-ref));
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
		.timer {
			transform: rotate(90deg);
		}
	}

	.audio_visualisation {
		position: absolute;
		right: 0;
		left: 0;
		bottom: 0;
		margin: calc(1 * var(--size-ref));
		height: calc(4 * var(--size-ref));
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		z-index: -1;
		background-color: var(--color-lv7);
	}

	.audio_visualisation__bar {
		height: calc(3 * var(--size-ref));
		background-color: var(--color-lv2);
		border-radius: calc(0.2 * var(--size-ref));
		width: calc(0.2 * var(--size-ref));
		transition: 0ms;
	}

	.answer, .disable {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}
</style>

<script>
	import { ref, watch, onMounted } from 'vue'
	import spotify from '@/api/spotify.js'

	export default {
		name: 'Play',
		setup() {
			let start_time = 10
			let after_time = 5
			let timer = start_time
			let autoplay = true
			let interval = null
			//let game_rules_edition = false
			//let volume = 3
			//let number_of_bars = 50

			//let audio = null
			//let frequencyData = null

			const gamerules = {
				Autoplay: true,
				Theme: '#000, #fff'
			}

			const title = ref('')
			const date = ref('')
			const album = ref('')
			const author = ref('')
			const image = ref(null)

			const borders = ref(null)
			/*const buttons = {
				start_game: document.querySelector('.start_button'),
				full_screen: document.querySelector('.full_screen'),
				open_gamerule: document.querySelector('.open_gamerule'),
				close_gamerule: document.querySelector('.close_gamerule')
			}*/
			/*const interfaces = {
				volume_bar: document.querySelector('.volume_bar'),
				volume_bar_value: document.querySelector('.volume_bar_value'),
			}*/
			//const audio = document.querySelector('.music')
			const timer_number = ref(null)

			function animationTime(customTime = timer){
				const ratio = ((start_time - customTime) / start_time)
				const deg = ratio * 360
				const percentage = ratio * 100
				const start = 21
				const end = 42
				document.documentElement.style.setProperty('--rotation-timer', deg + 'deg')
				borders.value.querySelectorAll('.border.horizontal').forEach(e => { e.style.setProperty('width', (percentage / 2) + 'vw') })
				borders.value.querySelectorAll('.border.vertical').forEach(e => { e.style.setProperty('height', (percentage / 2) + 'vh') })
				document.body.style.setProperty('--rotation', (ratio * (end - start) + start) + 'deg')
			}

			function showAnswer(){
				setTimeout(() => {
					title.value = 'MoonSoon'
					date.value = '2013'
					album.value = 'Risk of rain'
					author.value = 'Chris Christodoulou'
					image.value.style.setProperty('transform', 'rotate(0deg) scale(100%)')
					document.body.classList.add('ended')
				}, 1000)
				translateTheme('#fff, #242132, #FFA800')
			}

			function startMusic(){
				//containers.game_screen.classList.remove('disable')
				image.value.setAttribute('src', './risk_of_rain.jpg')
				nextMusic()
			}

			function stopMusic() {
				title.value = ''
				date.value = ''
				album.value = ''
				author.value = ''
				image.value.style.setProperty('transform', 'rotate(360deg) scale(0%)')
				document.body.classList.remove('ended')
				document.documentElement.style.setProperty('--rotation-timer', '0deg')
				translateTheme(gamerules.Theme)
				animationTime(start_time)
			}

			function nextMusic() {
				timer = start_time
				timer_number.value.innerHTML = timer
				
				if(interval){
					clearInterval(interval)
				}

				interval = setInterval(() => {
					timer--
					if (timer >= 0) {
						timer_number.value.innerHTML = timer + 1
						animationTime()
					}
					if (timer == 0) {
						showAnswer()
					}
					if (timer == -1) {
						timer_number.value.innerHTML = 0
					}
					if (timer < -(after_time-1)) {
						stopMusic()
					}
					if (timer < -after_time) {
						if (autoplay) {
							nextMusic()
						}
					}
				}, 1000)
			}

			function translateTheme(theme){
				const colors = theme.split(', ')
				if (colors.length == 2) {
					updateTheme(colors[0], colors[1])
				} else if (colors.length > 2) {
					updateTheme(colors[0], colors[1], colors[2])
				}else{
					console.warn('bad theme')
				}
			}

			function updateTheme(textColor, backgroundColor, accentColor = textColor){
				document.documentElement.style.setProperty('--text-color', textColor)
				document.documentElement.style.setProperty('--background-color', backgroundColor)
				document.documentElement.style.setProperty('--accent-color', accentColor)
			}

			onMounted(() => {
				watch(spotify.ready, ready => {
					if (ready) {
						spotify.play('spotify:track:7xGfFoTpQ2E7fRF5lN10tr')
						startMusic()
					}
				})
			})

			return {
				title,
				date,
				album,
				author,
				image,
				borders,
				timer_number,
			}
		}
	}
</script>
