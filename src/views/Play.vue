<template>
	<div class="game_container">
		<div class="answer">
			<div class="title"></div>
			<div class="date"></div>
			<div class="album"></div>
			<div class="author"></div>
			<div class="image">
				<img/>
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
				<span class="timer_number"></span>
			</div>
		</div>

		<div class="volume_bar disable">
			<div class="volume_bar_value"></div>
		</div>
		<div class="audio_visualisation">

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
	export default {
		name: 'Play',
		setup() {
			let script = document.createElement('script')
			script.setAttribute('src', 'https://sdk.scdn.co/spotify-player.js')
			document.body.appendChild(script)

			window.onSpotifyWebPlaybackSDKReady = () => {
				/*globals Spotify:false */
				const player = new Spotify.Player({
					name: 'Web Playback SDK Quick Start Player',
					getOAuthToken: cb => { cb(localStorage.getItem('spotify_token')) },
					volume: 0.5
				})

				// Ready
				player.addListener('ready', ({ device_id }) => {
					localStorage.setItem('device_id', device_id)
					console.log('Ready with Device ID', device_id)
				})

				// Not Ready
				player.addListener('not_ready', ({ device_id }) => {
					console.log('Device ID has gone offline', device_id)
				})

				player.addListener('initialization_error', ({ message }) => {
					console.error(message)
				})

				player.addListener('authentication_error', ({ message }) => {
					console.error(message)
				})

				player.addListener('account_error', ({ message }) => {
					console.error(message)
				})

				player.connect()

				const play = ({
					spotify_uri,
					playerInstance: {
						_options: {
							getOAuthToken
						}
					}
				}) => {
					getOAuthToken(access_token => {
						fetch(`https://api.spotify.com/v1/me/player/play?device_id=${localStorage.getItem('device_id')}`, {
							method: 'PUT',
							body: JSON.stringify({ uris: [spotify_uri] }),
							headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${access_token}`
							},
						});
					});
				};

				play({
					playerInstance: player,
					spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
				});

			}
		}
	}
</script>
