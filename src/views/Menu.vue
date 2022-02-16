<template>
	<div class="container">
		<nav>
			<router-link :to="{ name: 'Play' }">Play!</router-link>
		</nav>
		<div class="config">
			<table>
				<tr>
					<td><label for="playlist">Playlist URL&nbsp;:</label></td>
					<td><input type="text" id="playlist" v-model="playlistUrl"></td>
				</tr>
				<tr>
					<td><label for="timer">Timer&nbsp;:</label></td>
					<td><input type="number" id="timer" min="10" max="60" step="5" v-model.number="timer"></td>
				</tr>
				<tr>
					<td><label for="autoplay">Mode salon&nbsp;:</label></td>
					<td><input type="checkbox" id="autoplay" v-model="autoplay"></td>
				</tr>
			</table>
		</div>
	</div>
</template>

<style scoped>
	.container {
		font-family: Audiowide;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	.container > * {
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	nav {
		background-color: darkgray;
	}

	nav > a {
		color: white;
		background-color: black;
		padding: 20px;
		width: 150px;
		text-decoration: none;
		font-size: 200%;
		text-align: center;
		border-left: 5px solid white;
		border-right: 5px solid white;
	}

	nav > a:hover {
		opacity: 0.8;
	}

	.config {
		grid-column: 2;
		background-color: lightgray;
		font-size: 150%;
	}

	.config input {
		font-size: 120%;
		background-color: darkgray;
		border: none;
		outline: none;
		font-family: Comic Sans MS;
		text-align: center;
	}

	.config input[type="number"] {
		width: 100px;
	}

	.config input[type="checkbox"] {
		background-color: red;
		transform: scale(2);
	}

	.config tr > td:first-child {
		text-align: right;
	}

	.config tr > td:last-child {
		text-align: center;
	}

	@media (max-width: 1200px) {
		.container {
			grid-template-columns: 1fr;
		}

		.config {
			grid-column: 1;
			grid-row: 2;
			height: 75vh !important;
		}

		nav {
			height: 25vh !important;
		}
	}
</style>

<script>
	import { ref, watch } from 'vue'
	import { useRouter } from 'vue-router'

	function getHashParams() {
		let hashParams = {}
	
		let r = /([^&;=]+)=?([^&;]*)/g
		let q = window.location.hash.substring(1)
		let e = r.exec(q)
		while (e) {
			hashParams[e[1]] = decodeURIComponent(e[2])
			e = r.exec(q)
		}
		return hashParams
	}

	export default {
		name: 'Menu',
		setup() {
			const router = useRouter()
			const params = getHashParams()

			if (params.access_token && (params.state == null || params.state !== localStorage.getItem('spotify_auth_state'))) {
				router.push({ name: 'Home' })
			} else {
				localStorage.removeItem('spotify_auth_state')
				if (params.access_token) {
					localStorage.setItem('spotify_token', params.access_token)
				}
				router.replace({ name: 'Menu' })
			}

			if(!localStorage.getItem('playlistUrl')){
				localStorage.setItem('playlistUrl', '')
			}
			if(!localStorage.getItem('timer')){
				localStorage.setItem('timer', 30)
			}
			if(!localStorage.getItem('autoplay')){
				localStorage.setItem('autoplay', false)
			}

			const playlistUrl = ref(localStorage.getItem('playlistUrl'))
			const timer = ref(localStorage.getItem('timer'))
			const autoplay = ref(localStorage.getItem('autoplay'))

			watch(playlistUrl, playlistUrl => {
				const urlParts = playlistUrl.split('/')
				playlistUrl = urlParts[urlParts.length - 1].split('?')[0]
				localStorage.setItem('playlistUrl', playlistUrl)
			})

			watch(timer, timer => {
				localStorage.setItem('timer', timer)
			})

			watch(autoplay, autoplay => {
				localStorage.setItem('autoplay', autoplay)
			})

			return {
				playlistUrl,
				timer,
				autoplay,
			}
		}
	}
</script>
