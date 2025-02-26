<template>
	<v-card>
		<v-card class="welcome bg">
			<div class="welcome-card">
				<!--<div class="welcome-image">
				<img src="/img/welcome.jpg" alt="Try IT! congress" />
			</div>-->
				<div class="welcome-content">
					<Timer class="timer"></Timer>
				</div>

			</div>

		</v-card>
		<!--<PopupTicket class="popup-button"></PopupTicket>-->

		<!-- Menú de acciones posibles -->
		<!-- Si no ponemos esto luego no se pueden abrir -->
		<ViewEcts />
		<PopupTicket />
		<PopupLogin />
		<Timeline />
		<Tournaments />
		<QRReader />
		<PopupLottery />
		<EventsViewer />
		<TicketWarning />
		<FAQ />
		<LoginNoSIU />
		<Login />

		<hr>
		<section>
			<h2 align="center">¡Buscamos voluntarios!</h2>

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
				<img src="img/personaje-señalando.png" alt="No se ha podeido cargar la imagen" id="personaje_señalando">
			</div>
		</section>

		<hr>

		<section>
			<h2 align="center">¿Qué ofrecemos?</h2>
			<p class="section-description">
				El Try It! es el congreso tecnológico más grande de la UPM.
				Su objetivo de acercar las tendencias tecnológicas actuales
				a los participantes, así como ofrecer un contacto directo con las empresas más
				punteras del sector.
			</p>

			<template>
				<v-container fluid class="video-container">
					<v-row justify="center">
						<v-col cols="12" md="10" lg="8" xl="6">
							<v-responsive aspect-ratio="16/9">
								<video class="video-player" controls>
									<source src="/Trailer2025.mp4" type="video/mp4">
									Tu navegador no soporta videos HTML5.
								</video>
							</v-responsive>
						</v-col>
					</v-row>
				</v-container>
			</template>


			<div class="properties">
				<div class="property" :class="{ active: paragraphActive === 'companies' }"
					@click="paragraphActive = 'companies'">
					<h3>Empresas punteras</h3>
					<div class="description">
						<p>
							Como en otras ediciones, este año también contaremos con empresas líderes de la talla de
							Google, Amazon, Microsoft, IBM y muchas más.
						</p>
					</div>
					<div class="icon">
						<div class="bck"></div>
						<i class="far fa-building"></i>
					</div>
				</div>
				<div class="property" :class="{ active: paragraphActive === 'topics' }"
					@click="paragraphActive = 'topics'">
					<h3>Temática diversa</h3>
					<div class="description">
						<p>
							Podrás asistir a ponencias y talleres con temas como las IAs generativas, el blockchain, la
							ciberseguridad, la ciencia de datos o las últimas innovaciones en computación.
						</p>
					</div>
					<div class="icon">
						<div class="bck"></div>
						<i style="padding-top: calc(var(--space-s) + 2px); padding-bottom: calc(var(--space-s) - 2px)"
							class="fas fa-project-diagram"></i>
					</div>
				</div>
				<div class="property" :class="{ active: paragraphActive === 'talks_n_workshops' }"
					@click="paragraphActive = 'talks_n_workshops'">
					<h3>Ponencias y talleres</h3>
					<div class="description">
						<p>
							Podrás asistir a una variedad de ponencias y talleres ofrecidos por expertos en su ámbito en
							los que aprender y renovar tu skillset.
						</p>
					</div>
					<div class="icon">
						<div class="bck"></div>
						<i class="fas fa-robot"></i>
					</div>
				</div>
				<div class="property" :class="{ active: paragraphActive === 'competitions_n_tournaments' }"
					@click="paragraphActive = 'competitions_n_tournaments'">
					<h3>Competiciones</h3>
					<div class="description">
						<p>
							Desde competiciones deportivas, hasta de matemáticas y de programación, el Try IT! te
							permite poner a prueba tu conocimiento en distintas áreas. ¡Apúntante al primer Hackathon
							del Try IT!
						</p>
					</div>
					<div class="icon">
						<div class="bck"></div>
						<i class="fas fa-trophy"></i>
					</div>
				</div>
				<div class="property" :class="{ active: paragraphActive === 'free' }" @click="paragraphActive = 'free'">
					<h3>Entradas gratuitas</h3>
					<div class="description">
						<p>
							¡Es completamente gratis venir!
							El Try It! se organiza en colaboración con la ETSI Informáticos, DA-ETSIINF y distintas
							asociaciones, que colaboran en garantizar el acceso a todos a las últimas novedades en el
							campo de la informática.
						</p>
					</div>
					<div class="icon">
						<div class="bck"></div>
						<i class="fas fa-dollar-sign"></i>
					</div>
				</div>
				<div class="property" :class="{ active: paragraphActive === 'ects' }" @click="paragraphActive = 'ects'">
					<h3>Reconocimiento de ECTS</h3>
					<div class="description">
						<p>
							El Try IT! se incluye en el Catálogo General de Reconocimiento de Créditos de la UPM.
							Podrás obtener hasta 2 ECTS por venir a las charlas a lo largo de la semana.
						</p>
					</div>
					<div class="icon">
						<div class="bck"></div>
						<i class="fas fa-graduation-cap"></i>
					</div>
				</div>
			</div>
		</section>
		<!-- <v-container fluid>
			<v-layout justify-center align-center>
		<v-flex shrink>
		<a href="https://t.co/QVQgoLoL91">
		<v-img 
		src= "/img/agonia.jpeg"
		max-height="1080"
		max-width="1920"
		></v-img>
		</a>
		</v-flex>
	</v-layout>
		</v-container> -->
		<hr>
		<v-card>
			<h2>¿Dónde estamos?</h2>
			<Map></Map>
		</v-card>
		<hr>
		<v-container style="max-width:392px; max-height:392px; padding:0; margin-top:30px">
			<v-carousel cycle hide-delimiters show-arrows>
				<v-carousel-item>
					<img src="img/map_slider/como_llegar_1.png"
						style="max-height:100%; max-width:100% ; object-fit: contain;">
				</v-carousel-item>
				<v-carousel-item>
					<img src="img/map_slider/como_llegar_2.png"
						style="max-height:100%; max-width:100% ; object-fit: contain;">
				</v-carousel-item>
				<v-carousel-item>
					<img src="img/map_slider/como_llegar_3.png"
						style="max-height:100%; max-width:100% ; object-fit: contain;">
				</v-carousel-item>
				<v-carousel-item>
					<img src="img/map_slider/como_llegar_4.png"
						style="max-height:100%; max-width:100% ; object-fit: contain;">
				</v-carousel-item>
				<v-carousel-item>
					<img src="img/map_slider/como_llegar_5.png"
						style="max-height:100%; max-width:100% ; object-fit: contain;">
				</v-carousel-item>
				<v-carousel-item>
					<img src="img/map_slider/como_llegar_6.png"
						style="max-height:100%; max-width:100% ; object-fit: contain;">
				</v-carousel-item>
			</v-carousel>
		</v-container>

		<hr>

		<v-container fluid>
			<v-card>
				<h2>Ediciones anteriores</h2>
				<template>
					<v-container fluid class="video-container">
						<v-row justify="center">
							<v-col cols="12" md="10" lg="8" xl="6">
								<v-responsive aspect-ratio="16/9">
									<video class="video-player" controls>
										<source src="/RecopilatorioTryIt.mp4" type="video/mp4">
										Tu navegador no soporta videos HTML5.
									</video>
								</v-responsive>
							</v-col>
						</v-row>
					</v-container>
				</template>
				<History />
			</v-card>
		</v-container>
		<!-- <v-container fluid>
	<v-layout justify-center align-center>
		<v-flex shrink>
		<v-img 
		src= "/img/patrocinadores24.png" max-height="1080" max-width="1920"></v-img>
		</v-flex>
	</v-layout>
	</v-container> -->
	</v-card>


</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import {
	Map,
	Timer,
	PopupTicket,
	PopupLogin,
	DialButton,
	Timeline,
	Tournaments,
	QRReader,
	ViewEcts,
	PopupLottery,
	History,
	EventsViewer,
	TicketWarning,
	FAQ,
	LoginNoSIU,
	Login,
} from "../components"
//import { Context } from '@nuxt/types'

@Component({
	components: {
		Map,
		Timer,
		ViewEcts,
		PopupTicket,
		PopupLogin,
		DialButton,
		Timeline,
		Tournaments,
		QRReader,
		PopupLottery,
		History,
		EventsViewer,
		TicketWarning,
		FAQ,
		LoginNoSIU,
		Login,
	},
})

export default class extends Vue {

	options = {
		licenseKey: "RMPr@ZT!e1",
		dir: "v",
		loop: false,
		duration: 300,
		scrollOverflow: true
	}

	paragraphActive: "talks_n_workshops" | "topics" | "competitions_n_tournaments" | "companies" | "free" | "diverse_topics" | "ects" | "" = ""
	goTo(path: string) {
		window.location.href = path // TODO use router
	}
	toggleViewEcts() {
		this.$nuxt.$emit("toggleViewEcts")
	}
	toggleTicket() {
		this.$nuxt.$emit("toggleTicketForm")
	}
	toggleLogin() {
		this.$nuxt.$emit("toggleLoginForm")
	}
	toggleQRReader() {
		this.$nuxt.$emit("toggleQRReader")
	}
	toggleEvViewer() {
		this.$nuxt.$emit("toggleEvViewer")
	}

}
</script>

<style scoped>
hr {
	width: 30%;
	/* La mitad de la pantalla */
	margin: 20px auto;
	/* Centrado horizontalmente */
	border: none;
	/* Eliminamos el borde por defecto */
	height: 5px;
	/* Grosor de la línea */
	background-color: #035b9e;
	/* Color de la línea */
}


.bg {
	background-image: url("/img/spot.jpg");
	background-size: cover;
}

.popup-button {
	padding-bottom: 0;
	padding-top: 0;
}

.timer {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 30vh;
	width: 100%;
	/*background-image: url("/img/welcome.jpg");*/
	backdrop-filter: blur(2px);
}

.welcome .welcome-card {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100%;
}

.welcome .welcome-image {
	background: rgba(0, 0, 0, 0.8);
	width: 100%;
	height: 100%;
}

.welcome .welcome-image img {
	object-fit: cover;
	height: 100%;
	/*filter: opacity(0.3);*/
	width: 100%;
}

.welcome-content {
	position: absolute;
	background: transparent;
	display: flex;
	flex-direction: column;
	padding-top: 25%;
}

.welcome-content img {
	display: block;
	margin-left: auto;
	margin-right: auto;
	max-width: 50%;
	height: auto;
}

.welcome-content h1 {
	color: var(--neutral-10);
	text-shadow: 1px 1px black;
	font-weight: var(--font-bold-roboto);
	font-size: 40px;
	text-align: center;
}

.welcome-content h2 {
	color: var(--primary-7);
	text-shadow: 1px 1px black;
	font-weight: var(--font-bold-roboto);
	font-size: 3em;
	text-align: center;
}

.welcome-content h4 {
	font-weight: var(--font-bold-roboto);
	color: var(--neutral-10);
	text-shadow: 1px 1px black;
	font-size: 15px;
	letter-spacing: 1.2px;
	text-align: center;
	margin: var(--space-xs) 0;
}

.welcome-content h3 {
	font-weight: var(--font-bold-roboto);
	color: var(--primary-6);
	font-size: 15px;
	text-align: center;
	text-shadow: 1px 1px black;
}

@media screen and (min-width: 700px) {
	.welcome-content {
		transform: translate(0, -25%);
	}

	.welcome-content h1 {
		font-size: 65px;
	}

	.welcome-content h3 {
		font-size: 30px;
	}

	.welcome-content h4 {
		font-size: 20px;
	}
}

button {
	margin-top: var(--space-l);
	align-self: center;
	box-shadow: none;
	border-color: var(--primary-3);
}

button:hover {
	background: var(--neutral-8);
}

.what-we-offer h2 {
	margin: 0;
}

h2 {
	margin: 10px;
	text-align: center;
	margin-top: var(--space-l);
}

.section-description {
	margin: var(--space-s) 20px 10px 20px;
	text-align: center;
}

.property div i {
	width: 30px;
	height: 30px;
	font-size: 30px;
	color: var(--neutral-10);
	background: var(--primary-4);
	padding: var(--space-s);
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
}

@media screen and (max-width: 701px) {
	.properties {
		display: flex;
		flex-direction: column;
	}

	.property {
		display: grid;
		grid-template-rows: auto 1fr;
		align-items: center;
		margin: var(--space-xxs) 0;
		transition: var(--transition-slow) all ease;
		--distance: 20vw;
	}

	.properties .property:nth-child(2n) {
		grid-template-areas:
			". i title"
			"description description description";
		grid-template-columns: var(--distance) auto 1fr;
	}

	.properties .property:nth-child(2n + 1) {
		grid-template-areas:
			"title i ."
			"description description description";
		grid-template-columns: 1fr auto var(--distance);
	}

	.property h3 {
		grid-area: title;
		background: var(--neutral-8);
		height: 100%;
		font-size: 12px;
		color: var(--neutral-2);
		display: flex;
		align-items: center;
		padding: 0 var(--space-s);
		font-weight: var(--font-bold-roboto);
		cursor: pointer;
	}

	.property.active h3 {
		font-size: 14px;
	}

	.properties .property:nth-child(2n + 1) h3 {
		justify-content: flex-end;
	}

	.property .description {
		grid-area: description;
		max-width: 400px;
		text-align: center;
		margin: 0 auto;
		transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);
	}

	.property .description p {
		padding: 0;
		overflow: hidden;
		padding-bottom: 0;
		max-height: 0;
	}

	.property.active .description p {
		max-height: 1000px;
		padding: var(--space-xs) var(--space-m);
		transition: max-height 1s ease-in-out;
	}

	.property .icon {
		grid-area: i;
		position: relative;
		cursor: pointer;
	}

	.property .icon .bck {
		position: absolute;
		background: var(--neutral-8);
		width: 50%;
		height: 100%;
		right: 0;
		z-index: -1;
	}

	.property .icon i {
		width: 20px;
		height: 20px;
		font-size: 25px;
		padding: var(--space-s);
		transition: var(--transition-slow) all ease;
	}

	.property.active .icon i {
		width: 30px;
		height: 30px;
		font-size: 30px;
		padding: var(--space-s);
	}

	.properties .property:nth-child(2n + 1)>div>div {
		left: 0;
	}
}

@media screen and (min-width: 700px) {
	.properties {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		max-width: 1200px;
		margin: 0 auto;
	}

	.video-player {
		max-width: 1000px;
		/* Limita el tamaño en pantallas grandes */
		width: 100%;
		/* Asegura que se adapte al contenedor */
		height: auto;
		border-radius: 8px;
		/* Opcional para esquinas redondeadas */
		display: block;
	}

	/* 🔹 Ajuste para pantallas pequeñas (móviles) */
	@media screen and (max-width: 700px) {
		.video-player {
			max-width: 90%;
			/* Asegura que no se desborde */
			width: 90%;
			height: auto;
			margin: 0 auto;
			/* Centra el video correctamente */
		}
	}



	.property {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 300px;
		margin: var(--space-xs) var(--space-m);
	}

	.property h3 {
		grid-area: title;
		height: 100%;
		font-size: 16px;
		color: var(--primary-2);
		display: flex;
		align-items: center;
		margin: var(--space-s) 0;
		font-weight: var(--font-bold-roboto);
		cursor: pointer;
		order: 2;
	}

	.property .description {
		order: 3;
	}

	.property .description p {
		text-align: center;
	}

	.property .icon {
		order: 1;
	}

	.property .icon i {
		width: 55px;
		height: 55px;
	}
}

.voluntier-description {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 20px 0 20px 0;
}

@media screen and (max-width: 700px) {
	.voluntier-description {
		flex-direction: column;
	}
}

.voluntier-link {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	margin: 10px;
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

#personaje_señalando {
	height: 200px;
	width: auto;
}

.video-container {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px 0;
}

.video-player {
	width: 100%;
	height: 100%;
	border-radius: 8px;
	display: block;
}

/* 🔹 Ajuste para ESCRITORIO (PC) */
@media screen and (min-width: 1024px) {

	/* Se aplica en pantallas grandes */
	.video-container {
		max-width: 1200px;
		/* Hace que el video sea más grande en PC */
	}

	.video-player {
		max-width: 1200px;
		/* Asegura que el video sea grande */
	}
}

/* 🔹 Ajuste para MÓVILES */
@media screen and (max-width: 700px) {
	.video-container {
		padding: 10px 0;
	}

	.video-player {
		max-width: 100%;
	}
}
</style>