<template>
	<div class="title_screen_container">
		<span class="main_title">Blind Party</span>
		<span class="button" @click="login">Start</span>
	</div>
</template>

<style scoped>
	@import url('https://fonts.googleapis.com/css2?family=Audiowide&display=swap');
	.title_screen_container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		height: 100vh;
	}

	.main_title {
		font-family: Audiowide;
		letter-spacing: 3vw;
		font-size: 10vw;
		text-align: center;
		display: block;
	}

	.button {
		font-family: Audiowide;
		font-size: 6vw;
		padding: 40px 60px;
		transition: 300ms;
		border-radius: 20px;
		border: var(--text-color) 6px solid;
		background-color: var(--background-color);
		color: var(--text-color);
		fill: var(--text-color);
		cursor: pointer;
	}

	.button:hover {
		color: var(--background-color);
		fill: var(--background-color);
		background-color: var(--accent-color);
		border-color: var(--background-color);
	}
</style>

<script>
	import router from '@/router/index.js'

	function generateRandomString(length) {
		const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
		let text = ''

		for (let i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length))
		}
		return text
	}

	export default {
		name: 'Home',
		setup() {
			const login = () => {
				const client_id = '9267e9db5b254e41ae87f026d2facdd5'
				const scope = 'user-read-private user-read-email streaming'
				const redirect_uri = new URL(router.resolve({ name: 'Menu' }).href, window.location.href).href
				const state = generateRandomString(16)

				localStorage.setItem('spotify_auth_state', state)

				const url = 'https://accounts.spotify.com/authorize'
					+ '?response_type=token'
					+ '&client_id=' + encodeURIComponent(client_id)
					+ '&scope=' + encodeURIComponent(scope)
					+ '&redirect_uri=' + encodeURIComponent(redirect_uri)
					+ '&state=' + encodeURIComponent(state)

				window.location = url
			}

			return {
				login,
			}
		}
	}
</script>
