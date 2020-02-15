<template>
	<div class="map">
		<iframe
			src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d189.88580850204826!2d-3.8393201766431044!3d40.40501955819835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd418f593a75110d%3A0xd93dd7c8eeb6ca73!2s28660%20Boadilla%20del%20Monte%2C%20Madrid!5e0!3m2!1ses!2ses!4v1581504524270!5m2!1ses!2ses"
			width="100%"
			height="100%"
			frameborder="0"
			style="border:0;"
			allowfullscreen=""
		></iframe>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator"

@Component({})
export default class Map extends Vue {}
</script>

<style scoped>
.map {
	margin-top: var(--space-l);
	height: 65%;
}</style
>e
