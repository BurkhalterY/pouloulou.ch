<template>
	<router-view/>
</template>

<style>
	:root {
		--text-color: #000;
		--background-color: #fff;
		--accent-color: #000;
		--color-lv1: #ff0000;
		--color-lv2: #C00000;
		--color-lv3: #Af0000;
		--color-lv4: #880000;
		--color-lv5: #580000;
		--color-lv6: #300000;
		--color-lv7: #000000;
		--size-ref: 5vh;
		--rotation: 0deg;
		--mobile-size: 75vh;
	}

	html {
		perspective: 1000px;
	}

	body{
		background-color: var(--background-color);
		color: var(--text-color);
		margin: 0;
		padding: 0;
		transition: 2000ms;
		overflow: hidden;

		width: 100%;
		height: 100vh;
		background-color: var(--color-lv4);
	}

	@media (max-width: 70vh) {
		body {
			--size-ref: 7vw;
		}
	}
</style>