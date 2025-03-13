<template>
	<div class="map-container">
		<!-- Mapa de Google -->
		<iframe
			src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.639127766647!2d-3.8393201766431044!3d40.40501955819835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4185f258e5eec5%3A0xdf7b007bb6904fa5!2sEscuela%20T%C3%A9cnica%20Superior%20de%20Ingenieros%20Inform%C3%A1ticos%20de%20la%20Universidad%20Polit%C3%A9cnica%20de%20Madrid!5e0!3m2!1ses!2ses!4v1710339200000!5m2!1ses!2ses"
			width="100%"
			height="100%"
			frameborder="0"
			style="border:0;"
			allowfullscreen="true"
		></iframe>

		<!-- Capa invisible para hacer clic en cualquier parte -->
		<div class="click-overlay" @click="openGoogleMaps"></div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"

@Component({})
export default class Map extends Vue {
	openGoogleMaps() {
		window.open(
			"https://maps.app.goo.gl/zBYgnruyonqMo2Nk8",
			"_blank"
		);
	}
}
</script>

<style scoped>
.map-container {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 90%; /* Reduce el tamaño general */
	max-width: 700px; /* No se hace demasiado grande */
	margin: 0 auto; /* Separa del texto "¿DÓNDE ESTAMOS?" */
	padding: 40px 0; /* Margen interno suave */
	position: relative;
	cursor: pointer;
}

/* Asegurar que el iframe tenga el diseño correcto */
.map-container iframe {
	width: 100%;
	height: 250px; /* Tamaño ajustado */
	border-radius: 10px;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

/* Capa invisible que cubre todo el mapa y captura clics */
.click-overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: transparent;
	cursor: pointer; /* Indica que es interactivo */
}

/* Ajustes para dispositivos móviles */
@media (max-width: 768px) {
	.map-container {
		width: 85%;
		margin: 40px auto;
		padding: 40px 0;
	}

	.map-container iframe {
		height: 200px;
	}
}

@media (max-width: 480px) {
	.map-container {
		width: 80%;
		margin: 0 auto;
	}

	.map-container iframe {
		height: 180px;
	} }
</style>

