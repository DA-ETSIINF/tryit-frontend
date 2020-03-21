<template>
  <div class="session-container" :class="{ open }">
    <div class="session-wrapper">
      <div class="speakers-pictures" @click="open = !open">
        <img
          v-if="activity.speakers.length === 1"
          :src="activity.speakers[0].image"
          :alt="activity.speakers[0].name"
        />
        <div class="avatars" v-if="activity.speakers.length > 1">
          <img
            v-for="speaker in activity.speakers.slice(0, nSpeakersPreview - (activity.speakers.length === nSpeakersPreview ? 0 : 1))"
            :key="speaker.name"
            :src="speaker.image"
            :alt="speaker.name"
          />
          <div
            class="plus"
            v-if="activity.speakers.length > nSpeakersPreview"
          >+{{ activity.speakers.length - nSpeakersPreview + 1}}</div>
        </div>
      </div>
      <h5 class="phone-padding">
        <span class="hours">
          <span class="hour">{{ getHours(activity.startDate) }}</span>
          <span class="minute">:{{ getMinutes(activity.startDate) }}</span>
          <span class="separator">-</span>
          <span class="hour">{{ getHours(activity.endDate) }}</span>
          <span class="minute">:{{ getMinutes(activity.endDate) }}</span>
        </span>
        <span class="session-type">Taller</span>
      </h5>
      <h2 @click="open = !open" class="phone-padding">{{ activity.title }}</h2>
      <h6 class="speakers-n-company phone-padding" v-html="getSpeakersAndCompanyString()"></h6>
      <div class="more-info phone-padding" :class="`more-info-${activity.id}`">
        <p
          class="description"
          v-if="activity.description !== ''"
          :class="open"
        >{{activity.description}}</p>
        <span class="location" :class="open" v-if="activity.room !== ''">
          <i class="fas fa-map-marker"></i>
          <span>{{ activity.room }}</span>
        </span>
      </div>
    </div>
  </div>
  <!-- <div
				class="swiper-speakers-container speakers-detail speakers-preview"
				:class="`swiper-speakers-container-${activity.id}`"
			>
				<div class="swiper-wrapper">
					<div
						class="swiper-slide speaker"
						v-for="speaker in activity.speakers"
						:key="speaker.name"
					>
						<img class="item" :src="speaker.image" :alt="speaker.name" />
						<h5 class="item">{{ speaker.name }}</h5>
						<p class="item" v-if="open">{{ speaker.bio }}</p>
					</div>
				</div>
				<div class="swiper-speakers-pagination"></div>
  </div>-->
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { SpeakerResource, TalkResource } from "../../types/api";
import Swiper from "swiper";
import { SwiperOptions } from "swiper";
import { App } from "../../utils/app";

// TODO: CHECK IF SPEAKERS IS EMPTY

@Component({})
export default class Talk extends Vue {
  @Prop() activity!: TalkResource;

  open: boolean = true;
  nSpeakersPreview: number = App.deviceWidth < 600 ? 3 : 6;

  swiper!: Swiper;
  openSwiperParams: SwiperOptions = {
    slidesPerView: 1.25,
    centeredSlides: true,
    spaceBetween: 2,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    }
  };

  deviceWidth!: number;

  mounted() {
    // this.swiper = new Swiper(
    //   `.swiper-speakers-container-${this.activity.id}`,
    //   this.openSwiperParams
    // );

    this.setMaxHeight();
    window.addEventListener("resize", this.onResize);
  }

  onResize() {
    this.setMaxHeight();
    this.deviceWidth = App.deviceWidth;
  }

  setMaxHeight() {
    const moreInfoDiv = document.querySelector(
      `.more-info-${this.activity.id}`
    ) as any;
    const heightMoreInfo: number = moreInfoDiv.scrollHeight;
    moreInfoDiv.style.maxHeight = `${heightMoreInfo}px`;
  }

  getSpeakersAndCompanyString() {
    const speakers = this.activity.speakers || [];
    let speakersString = speakers
      .map(n => `<span class="speaker-name">${n.name.trim()}</span>`)
      .join("<span>, </span>");
    if (speakers.length > 1) {
      const lastComma = speakersString.lastIndexOf(", </span>");
      speakersString =
        speakersString.substring(0, lastComma) +
        " y " +
        speakersString.substring(lastComma + 1);
    }
    const companyString =
      this.activity.speakers !== undefined
        ? this.activity.speakers[0].company.name
        : "";

    const fullString = `
      <span>Por </span>
      ${speakersString}
      <span>, ${companyString}</span>`;
    return fullString;
  }

  getHours(ms: number) {
    return `0${new Date(ms).getHours()}`.substr(-2);
  }

  getMinutes(ms: number) {
    return `0${new Date(ms).getMinutes()}`.substr(-2);
  }
}
</script>

<style scoped>
.session-container {
  padding: var(--space-xxs) 0;
}

.session-content {
  transition: 0.3s all ease;
}

.session-wrapper {
  --column-width: 70px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--space-xxs);
  grid-template-areas: "time-n-session-type" "title" "speakers-pictures" "speakers-string" "more-info";
}
.session-wrapper .speakers-pictures {
  cursor: pointer;
  margin-top: var(--space-xs);
  width: calc(100% + var(--space-xxs));
}

.session-wrapper .speakers-pictures img {
  border-radius: 50%;
  object-fit: cover;
  height: var(--column-width);
  width: var(--column-width);
  padding: 0 var(--space-l);
}

.session-wrapper .speakers-pictures .avatars img {
  height: calc((var(--column-width) - 5px));
  width: calc((var(--column-width) - 5px));
  padding: 0;
}
.session-wrapper .speakers-pictures .avatars {
  display: grid;
  grid-template-columns: repeat(6, calc((var(--column-width) - 5px)));
  grid-gap: var(--space-s);
  grid-auto-rows: 1fr;
  grid-area: speakers-pictures;
  max-width: calc(100vw - var(--space-l) * 2);
  padding: 0 var(--space-l);
}

.plus {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--primary-4);
  color: var(--neutral-10);
  border-radius: 50%;
  font-weight: var(--font-bold-roboto);
  font-size: 20px;
  width: calc((var(--column-width) - 5px));
}

.hours {
  background: var(--primary-10);
  padding: var(--space-xxxs) var(--space-xs);
  border-radius: var(--border-radius-m);
  font-family: var(--roboto);
  display: flex;
}

h5 {
  display: flex;
  align-items: baseline;
  grid-area: time-n-session-type;
}

.hours {
  letter-spacing: -0.6px;
}

.hours .hour {
  color: var(--primary-5);
  font-weight: var(--font-bold-roboto);
  font-size: 16px;
}

.hours .minute {
  font-size: 12px;
  padding-top: 2px;
}

.hours .separator {
  margin: 0 var(--space-xxs);
  font-weight: var(--font-medium-roboto);
}

.session-type {
  margin-left: var(--space-xs);
  text-transform: uppercase;
  letter-spacing: 1.1px;
  font-weight: var(--font-bold-roboto);
  font-family: var(--roboto);
  color: var(--neutral-5);
  font-size: 10px;
}

h2 {
  font-size: 18px;
  font-weight: var(--font-bold-roboto);
  font-family: var(--roboto);
  color: var(--primary-2);
  cursor: pointer;
  grid-area: title;
}

.speakers-n-company {
  color: var(--neutral-3);
  text-transform: initial;
  font-size: 15px;
  font-weight: initial;
  grid-area: speakers-string;
}

h6 >>> span.speaker-name {
  font-weight: var(--font-bold-source-sans-pro);
  color: var(--primary-4);
}

.description {
  line-height: 22px;
  color: var(--neutral-2);
  padding-bottom: 0;
}

.location {
  display: flex;
  align-items: baseline;
}

.location i {
  color: var(--primary-7);
  font-size: 14px;
}

.location span {
  color: var(--neutral-5);
  text-transform: uppercase;
  font-size: 14px;
  font-weight: var(--font-bold-source-sans-pro);
  margin-left: var(--space-xxs);
  margin-top: var(--space-xs);
  font-size: 12px;
}

.session-container h6 {
  margin-bottom: var(--space-xs);
}

.more-info {
  transition: var(--transition-very-slow) all ease;
  overflow: hidden;
  grid-area: more-info;
}
.open .more-info {
  max-height: 0 !important;
}

@media screen and (min-width: 600px) {
  .session-wrapper {
    --column-width: 100px;
    grid-template-columns: var(--column-width) 1fr;
    grid-template-rows: auto auto auto 1fr auto;
    grid-gap: var(--space-xs) var(--space-l);
    grid-template-areas:
      "speakers-pictures time-n-session-type"
      "speakers-pictures title"
      "speakers-pictures speakers-string"
      "speakers-pictures more-info";
  }
  .session-wrapper .speakers-pictures {
    grid-area: speakers-pictures;
  }

  .session-wrapper .speakers-pictures img {
    padding: 0;
  }

  .session-wrapper .speakers-pictures .avatars {
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(3, calc((var(--column-width) - 5px) / 2));
    grid-gap: var(--space-xxs);
    padding: 0;
  }

  .session-wrapper .speakers-pictures .avatars img {
    height: calc((var(--column-width) - 5px) / 2);
    width: calc((var(--column-width) - 5px) / 2);
  }

  .plus {
    height: calc((var(--column-width) - 5px) / 2);
    width: calc((var(--column-width) - 5px) / 2);
  }

  h2 {
    font-size: 30px;
  }

  .speakers-n-company {
    font-size: 18px;
  }

  .hours .hour {
    font-size: 18px;
  }
  .session-type {
    font-size: 12px;
  }

  .location i {
    font-size: 16px;
  }

  .location span {
    font-size: 14px;
  }
}
</style>
