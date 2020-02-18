<template>
	<div class="swiper-events-container">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(slide, index) in swiperSlides" :key="index">
				<Hero :data="slide"></Hero>
			</div>
		</div>
		<div class="swiper-pagination"></div>
		<div class="swiper-button-next"></div>
		<div class="swiper-button-prev"></div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator"
import Swiper from "swiper"
import { Hero } from "../"
import { HeroType } from "../../types/components"

@Component({
	components: { Hero }
})
export default class SliderEvents extends Vue {
	swiperOption = {
		pagination: {
			el: ".swiper-pagination",
			dynamicBullets: true
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		},

		grabCursor: true,
		centeredSlides: true
	}

	swiperSlides: HeroType[] = [
		{
			image: "./assets/img/volunteers.jpg",
			name: "Volunteers",
			btn: true,
			btn_text: "Regístrate aquí",
			title: "¿Quieres ser voluntario?",
			description: "Podrás obtener 1 ECTS extra"
		},
		{
			image: "https://probonoaustralia.com.au/wp-content/uploads/2019/05/lksdjf.png",
			name: "Volunteers",
			title: "¿Quieres ser voluntario?",
			description: "Podrás obtener 1 ECTS extra",
			btn: false
		}
	]

	public constructor() {
		super()
	}
	mounted() {
		new Swiper(".swiper-events-container", this.swiperOption)
	}
}
</script>

<style scoped>
.swiper-events-container {
	overflow: hidden;
	position: relative;
	--swiper-theme-color: var(--primary-10);
	height: 100%;
}

.swiper-events-container .swiper-slide {
	display: flex;
	justify-content: center;
	align-items: center;
	background: var(--primary-4);
}

.swiper-button-next,
.swiper-button-prev {
	display: none;
}

@media screen and (min-width: 650px) {
	.swiper-button-next,
	.swiper-button-prev {
		display: inherit;
	}
}
</style>
