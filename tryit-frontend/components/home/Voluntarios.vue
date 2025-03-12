<template> 
	<div class="voluntier-description">
		<p class="section-description">
			Si eres alumno de la ETSIINF de la UPM, te concedemos 1 ECTS por venir a ayudar 27 horas
			a lo largo de la semana del Congreso. <br><br>
			<a class="voluntier-link"
					href="https://docs.google.com/forms/d/e/1FAIpQLSfTisQjVRJ1p_J7BQzwgf9buO4Eyu9Mjifos1wc8SnC2O77gw/viewform"
						target="_blank" rel="noopener noreferrer">
					<span class="link-text">¡Apúntate rellenando este cuestionario!</span>
					<span class="cadena">
						<img src="img/cadena.png" alt="Icono de cadena">
					</span>
				</a>
			</p>
    <img src="img/personaje-señalando.png" alt="No se ha podido cargar la imagen" id="personaje_senalando">
	</div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator"

@Component({})
export default class Voluntarios extends Vue {}
</script>


<style scoped>

.voluntier-description {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 20px 0 20px 0;
}

.section-description {
	margin: var(--space-s) 20px 10px 20px;
	text-align: center;
}

.voluntier-link {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	margin: 10px;
}

@media screen and (max-width: 700px) {
	.voluntier-description {
		flex-direction: column;
	}
}

.link-text {
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-size: 20px;
}

.cadena {
	background-color: #035b9e;
	height: 30px;
	width: 30px;
	min-width: 30px;
	min-height: 30px;
	aspect-ratio: 1/1;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
}

.cadena img {
	height: 60%;
	width: auto;
	filter: invert(1);
}

#personaje_senalando {
	height: 200px;
	width: auto;
}

</style>
