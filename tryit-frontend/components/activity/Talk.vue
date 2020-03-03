<template>
	<div class="session-container" :class="{ open }">
		<i class="fas fa-gift gift"></i>
		<header>
			<h3>{{ activity.title }}</h3>
		</header>
		<div class="info-wrapper">
			<div class="description">
				{{ activity.title }}
			</div>
			<span class="room">{{ activity.room }}</span>
			<div class="speakers-preview">
				<div class="speaker" v-for="speaker in activity.speakers" :key="speaker.name">
					<div>
						<img :src="speaker.image" :alt="speaker.name" />
					</div>
					<h5>{{ speaker.name }}</h5>
				</div>
			</div>
			<div
				class="swiper-speakers-container speakers-detail"
				:class="`swiper-speakers-container-${activity.startDate}`"
			>
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="speaker in activity.speakers" :key="speaker.name">
						{{ speaker.name }}
					</div>
				</div>
				<!-- Add Pagination -->
				<div class="swiper-speakers-pagination"></div>
			</div>
			<div class="company" v-if="activity.speakers[0].company.sponsorType !== ''">
				<img :src="activity.speakers[0].company.logo" alt="Logo empresa" />
				<Badge :type="activity.speakers[0].company.sponsorType"></Badge>
			</div>
		</div>
		<div class="toogle-info">
			<i class="fas fa-plus" v-if="!open" @click="toogle"></i>
			<i class="fas fa-minus" v-if="open" @click="toogle"></i>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator"
import { SpeakerResource, TalkResource } from "../../types/api"
import Swiper from "swiper"

@Component({})
export default class Talk extends Vue {
	@Prop() activity!: TalkResource
	open: boolean = false

	mounted() {
		// console.log("123", document.querySelector(`.swiper-speakers-container-${this.talk.startDate}`))
		new Swiper(`.swiper-speakers-container-${this.activity.startDate}`, {
			slidesPerView: 1.25,
			centeredSlides: true,
			spaceBetween: 2,
			grabCursor: true,
			pagination: {
				el: ".swiper-pagination",
				clickable: true
			}
		})
	}

	toogle() {
		this.open = !this.open
	}
}
</script>

<style scoped>
.session-container {
	background: var(--white);
	box-shadow: var(--box-shadow-on-light-bck);
	border-radius: var(--border-radius-m);
	position: relative;
	margin-bottom: var(--space-m);
}

.session-container > div {
	padding: var(--space-s) var(--space-m);
	overflow: hidden;
}
.session-container header h3 {
	font-size: 20px;
	text-align: left;
	padding: var(--space-l);
	padding-bottom: 0;
}

.session-container i.gift {
	position: absolute;
	top: calc(-1 * var(--space-s) / 2);
	left: calc(-1 * var(--space-m) / 2);
	background-color: var(--neutral-9);
	padding: var(--space-xxs);
	border-radius: 50%;
	height: 14px;
	width: 14px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: var(--neutral-4);
	font-size: 14px;
	border: 2px solid var(--neutral-4);
}

.session-container .info-wrapper .description,
.session-container .info-wrapper .room,
.session-container .info-wrapper .speakers-detail,
.session-container .info-wrapper .company {
	display: none;
}

.session-container.open .info-wrapper .description,
.session-container.open .info-wrapper .room,
.session-container.open .info-wrapper .speakers-detail,
.session-container.open .info-wrapper .company {
	display: inherit;
}

.session-container .info-wrapper .speakers-preview {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
	margin: var(--space-s) 0;
}

.session-container.open .info-wrapper .description {
	margin: var(--space-xxs) 0;
}

.session-container.open .info-wrapper .room {
	font-size: 13px;
	color: var(--neutral-4);
	text-transform: uppercase;
	font-weight: var(--font-bold-source-sans-pro);
	margin: var(--space-xxs) 0;
	margin-bottom: var(--space-s);
	letter-spacing: 1.3px;
}
.session-container.open .info-wrapper .speakers-preview {
	display: none;
}

.session-container .info-wrapper .speaker {
	margin: var(--space-xxs) var(--space-s);
	display: flex;
	align-items: center;
	flex-direction: row;
	position: relative;
	z-index: 0;
	min-width: 200px;
}

.session-container .info-wrapper .speaker div {
	box-shadow: var(--box-shadow-input-inset);
	border-radius: 50%;
	width: 50px;
	height: 50px;
	margin-right: var(--space-s);
}
.session-container .info-wrapper .speaker img {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	display: block;
	position: relative;
	z-index: -1;
	object-fit: cover;
}

.session-container .info-wrapper .speaker h5 {
	text-align: left;
}

.session-container .toogle-info {
	position: absolute;
	display: flex;
	justify-content: center;
	width: calc(100% - 2 * var(--space-l));
	bottom: -37px;
}

.session-container .toogle-info i {
	font-size: 12px;
	padding: var(--space-xs);
	background: var(--primary-5);
	border-radius: 50%;
	color: var(--primary-10);
	cursor: pointer;
	box-shadow: var(--box-shadow-on-light-bck-light);
}

@media screen and (min-width: 592px) {
	.session-container > div {
		padding: var(--space-m) var(--space-l);
	}
}

.swiper-speakers-container {
	width: 100%;
}

.swiper-speakers-container .swiper-slide {
	width: 80%;
	transform: scale(0.9);
	min-height: 200px;
	background: #c0c0c0;
	transition: var(--transition-normal);
	box-shadow: var(--box-shadow-on-light-bck-light);
	border: 1px solid var(--neutral-8);
	border-radius: var(--border-radius-m);

	/* TO REMOVE */
	color: var(--neutral-2);
	background-color: var(--neutral-10);
}

.swiper-speakers-container .swiper-slide-active {
	transform: scale(1);
	border: 1px solid var(--neutral-9);
}

.session-container.open .info-wrapper .company {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: var(--space-m) 0 var(--space-xl) 0;
	position: relative;
}

.session-container.open .info-wrapper .company > div {
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	position: relative;
}

.session-container.open .info-wrapper .company img {
	object-fit: contain;
	max-width: 100px;
	max-height: 100px;
}

.session-container .info-wrapper .company .badge {
	margin: 0;
	font-size: 10px;
	position: absolute !important;
	bottom: -17px !important;
	right: 0;
	font-weight: normal;
	border-width: 2px;
	border-radius: 2px;
	padding: 0 var(--space-xxxs);
}
</style>
