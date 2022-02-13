<template>
	<div class="home">
		aaaaaaaaaaa
	</div>
</template>

<script>

export default {
	name: 'Home',
	setup() {
		window.onSpotifyWebPlaybackSDKReady = () => {
			const token = 'BQCZ1sVWEYCRa1-wsYTFeRQfkoBjp6C1BQy6m2LvIBjAy-R2UQkdjVIRcW-uv3mrfRsasmCSX_kCMk5yD1MaQJ3NyyAaArFCisD_3Zw-DoS4X6sZ7rjZX9yV0i7rdhN7DlKOkEiGi6YHcC6_Ea3SBa3nmK4VICbmy4kSVraQL1RV_nYOmNuc2UA'
			const player = new Spotify.Player({
				name: 'Web Playback SDK Quick Start Player',
				getOAuthToken: cb => { cb(token); },
				volume: 0.5
			});
		}
	}
}
</script>
