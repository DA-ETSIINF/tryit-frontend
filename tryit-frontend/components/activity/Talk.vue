<template>
  <div
    class="session-container"
    :class="{ open, flash: openByDefault }"
    :id="`activity-${activity.id}`"
    @mouseover="mouseHover = true"
    @mouseleave="mouseHover = false"
  >
    <div class="session-wrapper">
      <router-link
        :to="`/schedule${open ? '' : `?activity=${activity.id}`}`"
        tag="div"
        class="speakers-pictures"
        v-if="activity.speakers.some((p) => p.picture !== null)"
      >
        <img
          v-if="activity.speakers.length === 1 && activity.speakers[0].picture !== null"
          :src="activity.speakers[0].picture"
          :alt="activity.speakers[0].name"
          v-lazy-load
          @click="openSpeaker(0)"
        />
        <div
          class="avatars"
          v-if="activity.speakers.length > 1 && !activity.speakers.map((s) => s.picture).includes(null)"
        >
          <img
            v-for="(speaker, index) in activity.speakers.slice(
							0,
							nSpeakersPreview - (activity.speakers.length === nSpeakersPreview ? 0 : 1)
						)"
            :key="speaker.name"
            :src="speaker.picture"
            :alt="speaker.name"
            v-lazy-load
            @click="openSpeaker(index)"
          />
          <div
            class="plus"
            v-if="activity.speakers.length > nSpeakersPreview"
          >+{{ activity.speakers.length - nSpeakersPreview + 1 }}</div>
        </div>
      </router-link>
      <h5 class="phone-padding">
        <span class="hours" @click="toggleActivity()">
          <span class="hour">{{ getHours(activity.start_date) }}</span>
          <span class="minute">:{{ getMinutes(activity.start_date) }}</span>
          <span class="separator">-</span>
          <span class="hour">{{ getHours(activity.end_date) }}</span>
          <span class="minute">:{{ getMinutes(activity.end_date) }}</span>
        </span>
        <span class="session-type" @click="toggleActivity()">Taller</span>
        <div class="pop-up-container" v-if="mouseHover || open || openMenu">
          <i class="fas fa-ellipsis-v" @click="toggleMenu()"></i>
          <div class="pop-up-wrapper" :class="{ open: openMenu }">
            <ul>
              <li @click="share()">
                <span>
                  <i class="fas fa-share"></i>
                  <span v-if="canBeShared">Compartir</span>
                  <span v-if="!canBeShared">
                    <span v-if="!copiedText">Copiar enlace</span>
                    <span v-if="copiedText">Copiado</span>
                  </span>
                </span>
              </li>
              <a :href="calendarUrl" target="_blank" rel="noopener noreferrer">
                <li>
                  <span>
                    <i class="fas fa-calendar-plus"></i>
                    <span>Añadir al calendario</span>
                  </span>
                </li>
              </a>
            </ul>
          </div>
        </div>
      </h5>
      <router-link
        :to="`/schedule${open ? '' : `?activity=${activity.id}`}`"
        tag="h2"
        @click.native="toggleActivity()"
        class="phone-padding"
      >{{ activity.title }}</router-link>
      <h6
        @click="toggleActivity()"
        class="speakers-n-company phone-padding"
        v-html="getSpeakersAndCompanyString()"
      ></h6>
      <div
        class="more-info phone-padding"
        :class="`more-info-${activity.id}`"
        :style="{'--max-height': open ? `${moreInfoHeight}px` : 0}"
      >
        <p
          class="description"
          v-if="activity.description !== ''"
          :class="open"
        >{{ activity.description }}</p>

        <span class="location" :class="open" v-if="activity.location !== ''">
          <i class="fas fa-map-marker"></i>
          <span>{{ activity.location }}</span>
        </span>

        <div class="speakers-container" :id="`speakers-${activity.id}`">
          <div v-if="activity.speakers.length == 1" class="speaker-wrapper">
            <person :person="activity.speakers[0]"></person>
          </div>
          <div
            class="swiper-speakers-container speakers-detail speakers-preview"
            :class="`swiper-speakers-container-${activity.id}`"
            v-if="activity.speakers.length > 1"
          >
            <div class="swiper-wrapper">
              <div
                class="swiper-slide speaker"
                v-for="speaker in activity.speakers"
                :key="speaker.name"
              >
                <person :person="speaker"></person>
              </div>
            </div>
            <div class="swiper-speakers-pagination"></div>
          </div>
        </div>

        <div class="company">
          <div class="company-container">
            <img
              :src="'https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg'"
              alt
            />
            <badge
              class="badge"
              v-if="activity.speakers[0] !== undefined && activity.speakers[0].company.sponsor_type !== undefined"
              :type="activity.speakers[0].company.sponsor_type"
            ></badge>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "nuxt-property-decorator";
import { Route } from "vue-router";
import { SpeakerResource, TalkResource } from "../../types/api";
import Swiper from "swiper";
import { SwiperOptions } from "swiper";
import { App } from "../../utils/app";

// TODO: CHECK IF SPEAKERS IS EMPTY

@Component({})
export default class Talk extends Vue {
  @Prop() activity!: TalkResource;
  @Prop() openByDefault!: boolean;

  open: boolean = false;
  nSpeakersPreview: number = App.deviceWidth < 600 ? 3 : 4;
  moreInfoHeight: number = 0;

  swiper!: Swiper;
  openSwiperParams: SwiperOptions = {
    slidesPerView: 1.15,
    centeredSlides: true,
    spaceBetween: 30,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    }
  };

  deviceWidth!: number;

  openMenu = false;
  mouseHover = false;

  calendarUrl!: string;
  canBeShared: boolean = false;
  copiedText: boolean = false;

  mounted() {
    this.swiper = new Swiper(
      `.swiper-speakers-container-${this.activity.id}`,
      this.openSwiperParams
    );

    this.setMaxHeight();
    window.addEventListener("resize", this.onResize);

    setTimeout(() => {
      this.open = this.openByDefault;
    }, 500);

    this.setCalendarUrl();
    this.setCanBeShared();
  }

  _openSpeaker(index: number) {
    const e = document.getElementById(`speakers-${this.activity.id}`);
    console.log(e);
    this.$emit("scrollTo", e, true);
    if (
      this.activity.speakers !== undefined &&
      this.activity.speakers.length > 1
    ) {
      this.swiper.slideTo(index);
    }
  }
  openSpeaker(index: number) {
    if (!this.open) {
      this.toggleActivity();
      setTimeout(() => {
        this._openSpeaker(index);
      }, 500);
    } else {
      this._openSpeaker(index);
    }
  }

  onResize() {
    this.setMaxHeight();
    this.deviceWidth = App.deviceWidth;
  }

  setMaxHeight(offset = 0) {
    this.moreInfoHeight = (document.querySelector(
      `.more-info-${this.activity.id}`
    ) as any).scrollHeight;
  }

  getSpeakersAndCompanyString() {
    const speakers = this.activity.speakers || [];
    if (speakers.length === 0) {
      return "";
    }

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
      this.activity.speakers !== undefined && this.activity.speakers.length > 0
        ? this.activity.speakers[0].company.name
        : "";

    const fullString = `
      <span>Por </span>
      ${speakersString}<span>, ${companyString}</span>`;
    return fullString;
  }

  toggleMenu() {
    this.openMenu = !this.openMenu;
    this.copiedText = false;
  }

  toggleActivity() {
    this.setMaxHeight(350);
    this.open = !this.open;
    this.copiedText = false;
  }

  getHours(ms: number) {
    return `0${new Date(ms).getHours()}`.substr(-2);
  }

  getMinutes(ms: number) {
    return `0${new Date(ms).getMinutes()}`.substr(-2);
  }

  formatDate(date) {
    const d = new Date(date);
    function pad2(n) {
      // always returns a string
      return (n < 10 ? "0" : "") + n;
    }

    return (
      d.getFullYear() +
      pad2(d.getMonth() + 1) +
      pad2(d.getDate()) +
      "T" +
      pad2(d.getHours()) +
      pad2(d.getMinutes()) +
      pad2(d.getSeconds())
    );
  }

  setCalendarUrl() {
    // https://github.com/InteractionDesignFoundation/add-event-to-calendar-docs/blob/master/services/google.md
    const start_date = this.formatDate(this.activity.start_date);
    const end_date = this.formatDate(this.activity.end_date);
    this.calendarUrl =
      `https://calendar.google.com/calendar/render?action=TEMPLATE&` +
      `text=TryIT! 2020 - ${this.activity.title}&` + // TODO: Change this to variable data
      `dates=${start_date}/${end_date}&` +
      `ctz=Europe/Madrid&` +
      `details=${this.activity.description}&` +
      `location=ETSIINF UPM - ${this.activity.location}&` +
      `sprop=${document.location.origin}${window.location.pathname}?activity=${this.activity.id}`;
  }

  setCanBeShared() {
    this.canBeShared = (navigator as any).share ? true : false;
  }

  share() {
    if (this.canBeShared) {
      this.apiShare();
    } else {
      this.copyLink();
    }
  }

  apiShare() {
    const url: string = this.activity.title.substring(0, 20);
    (navigator as any)
      .share({
        title: "Try IT! 2020", // TODO: Change this to variable data
        text: `Mira la charla ${url}${url.length >= 30 ? "..." : ""} `, // TODO: Change this to variable data
        url: document.location.href
      })
      .then(() => console.log("Successful share"))
      .catch(() => this.copyLink());
  }

  copyLink() {
    const dummy = document.createElement("input");
    const text = `${document.location.origin}${window.location.pathname}?activity=${this.activity.id}`;
    this.copiedText = true;

    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
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
  padding: 0 var(--space-l);
}

.session-wrapper .speakers-pictures img {
  border-radius: 50%;
  object-fit: cover;
  height: var(--column-width);
  width: var(--column-width);
  box-shadow: inset 0 2px 4px 0 hsla(0, 0%, 0%, 0.2);
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
  color: var(--primary-4);
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

.pop-up-container {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  color: var(--neutral-4);
  font-size: 13px;
  position: relative;
}

.pop-up-container > i {
  cursor: pointer;
}

.pop-up-wrapper {
  position: absolute;
  background: var(--neutral-10);
  box-shadow: var(--box-shadow-on-light-bck);
  right: calc(-1 * var(--space-xs));
  display: none;
  user-select: none;
  z-index: 990;
}

.pop-up-wrapper.open {
  animation: pop-up-in 0.5s ease;
  animation-fill-mode: forwards;
  display: inherit;
}

.pop-up-wrapper a {
  font-weight: normal;
}

@keyframes pop-up-in {
  0% {
    top: 10px;
    opacity: 0;
  }
  70% {
    top: 24px;
    opacity: 0.9;
  }
  100% {
    top: 24px;
    opacity: 1;
  }
}

.pop-up-wrapper ul {
  list-style: none;
}
.pop-up-wrapper ul li {
  white-space: nowrap;
  color: var(--neutral-2);
  font-size: 14px;
  padding: var(--space-xs) var(--space-s);
  border-radius: var(--border-radius-m);
  cursor: pointer;
  transition: var(--transition-fast) all ease;
}

.pop-up-wrapper ul li:hover {
  background: var(--neutral-9);
}

.pop-up-wrapper ul li > span {
  display: flex;
  align-items: center;
}

.pop-up-wrapper ul li > span i {
  margin-right: var(--space-xs);
  color: var(--neutral-4);
  font-size: 12px;
}

h2 {
  font-size: 18px;
  font-weight: var(--font-bold-roboto);
  font-family: var(--roboto);
  color: var(--primary-2);
  cursor: pointer;
  grid-area: title;
  text-align: left;
}

.speakers-n-company {
  color: var(--neutral-3);
  text-transform: initial;
  font-size: 15px;
  font-weight: initial;
  grid-area: speakers-string;
  padding-bottom: var(--space-xs);
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

.speakers-container {
  margin-top: var(--space-m);
}

.more-info {
  transition: var(--transition-very-slow) all ease;
  overflow: hidden;
  grid-area: more-info;
  padding-bottom: var(--space-m);
  max-height: var(--max-height);
}
.session-container:not(.open) .more-info {
  padding-bottom: 0;
}

.company-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: var(--space-m);
}
.company-container img {
  height: 100px;
}

.company-container .badge {
  margin-top: var(--space-xs);
}

@media screen and (min-width: 600px) {
  .session-wrapper {
    --column-width: 100px;
    grid-template-columns: var(--column-width) 1fr;
    grid-template-rows: auto auto auto 1fr auto;
    grid-gap: var(--space-xxxs) var(--space-l);
    grid-template-areas:
      "speakers-pictures time-n-session-type"
      "speakers-pictures title"
      "speakers-pictures speakers-string"
      "speakers-pictures more-info";
  }
  .session-wrapper .speakers-pictures {
    grid-area: speakers-pictures;
    padding: 0;
  }

  .session-wrapper .speakers-pictures img {
    padding: 0;
  }

  .session-wrapper .speakers-pictures .avatars {
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(2, 1fr);
    grid-gap: var(--space-s);
    padding: 0;
  }

  .session-wrapper .speakers-pictures .avatars img {
    height: calc((var(--column-width) - var(--space-s)) / 2);
    width: 100%;
  }

  .plus {
    height: calc((var(--column-width) - 5px) / 2);
    width: 100%;
  }

  h2 {
    font-size: 22px;
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

.flash {
  animation: flash-out 4s ease 1s 1;
  animation-fill-mode: forwards;
  background: var(--neutral-8);
}

@keyframes flash-out {
  from {
    background: var(--neutral-8);
  }
  to {
    background: transparent;
  }
}
</style>
