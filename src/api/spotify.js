import { ref } from 'vue'

let script = document.createElement('script')
script.setAttribute('src', 'https://sdk.scdn.co/spotify-player.js')
document.body.appendChild(script)

let player
let device = ''
const ready = ref(false)

window.onSpotifyWebPlaybackSDKReady = () => {

	/* globals Spotify:false */
	player = new Spotify.Player({
		name: 'Pouloulou',
		getOAuthToken: cb => { cb(localStorage.getItem('spotify_token')) }
	})

	player.addListener('ready', ({ device_id }) => {
		device = device_id
		ready.value = true
	})

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
}

const play = (spotify_uri, timecode = 0) => {
	player._options.getOAuthToken(access_token => {
		fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device}`, {
			method: 'PUT',
			body: JSON.stringify({ uris: [spotify_uri] }),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${access_token}`,
			},
		}).then(async () => {
			await new Promise(r => setTimeout(r, 100)) //wait 0.1s for let Spotify starts the track
			fetch(`https://api.spotify.com/v1/me/player/seek?device_id=${device}&position_ms=${timecode}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${access_token}`,
				},
			})
		})
	})
}

export default {
	play,
	ready,
}
