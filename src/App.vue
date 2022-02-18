<template>
	<router-view/>
</template>

<style>
	:root {
		--text-color: #000;
		--background-color: #fff;
		--accent-color: #000;
		--size-ref: 5vh;
		--rotation: 0deg;
		--mobile-size: 75vh;
	}

	@font-face {
		font-family: "Audiowide";
		src: url(/assets/fonts/Audiowide-Regular.ttf) format("truetype");
	}

	html {
		perspective: 1000px;
	}

	body{
		width: 100%;
		height: 100vh;
		background-color: var(--background-color);
		color: var(--text-color);
		margin: 0;
		padding: 0;
		overflow: hidden;
	}

	@media (max-width: 70vh) {
		body {
			--size-ref: 7vw;
		}
	}
</style>