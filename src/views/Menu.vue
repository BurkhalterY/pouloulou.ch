<template>
	<nav>
		<router-link :to="{ name: 'Play' }">Jouer</router-link>
	</nav>
</template>

<style scoped>

</style>

<script>
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
				} else {
					router.push({ name: 'Home' })
				}
			}
		}
	}
</script>
