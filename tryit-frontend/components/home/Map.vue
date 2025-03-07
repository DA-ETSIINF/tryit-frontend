<template>
	<div class="map">
		<iframe
			src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d189.88580850204826!2d-3.8393201766431044!3d40.40501955819835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd418f593a75110d%3A0xd93dd7c8eeb6ca73!2s28660%20Boadilla%20del%20Monte%2C%20Madrid!5e0!3m2!1ses!2ses!4v1581504524270!5m2!1ses!2ses"
			width="100%"
			height="100%"
			frameborder="0"
			style="border:0;"
			allowfullscreen="true"
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%; /* Reduce el tamaño general */
  max-width: 700px; /* No se hace demasiado grande */
  margin: 0 auto; /* Separa del texto "¿DÓNDE ESTAMOS?" */
  padding: 40px 0; /* Margen interno suave */
  position: relative;
}

.map {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* Margen estándar en pantallas grandes */
  max-width: 800px; /* No se hace demasiado grande */
  margin: 0 auto; /* Más separación del texto */
  padding: 40px 0; /* Pequeño margen interno */
  position: relative;
}

.map iframe {
  width: 100%;
  height: 250px; /* Tamaño ajustado */
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

/* Asegurar más margen en dispositivos móviles */
@media (max-width: 768px) {
  .map {
    width: 85%; /* Reduce el ancho para más margen lateral */
    margin: 40px auto; /* Aumenta el margen superior e inferior */
    padding: 40px 0; /* Más espacio interno */
  }
  
  .map iframe {
    height: 200px; /* Reduce altura en móviles */
  }
}

@media (max-width: 480px) {
  .map {
    width: 80%; /* Más espacio en móviles pequeños */
    margin: 0 auto; /* Mayor separación */
  }

  .map iframe {
    height: 180px; /* Ajuste final para móviles */
  }
}



</style>
