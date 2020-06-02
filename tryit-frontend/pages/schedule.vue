<template>
  <div>
    <sticky-bar
      v-if="getApiStatus().state === 'ok' && getActivitiesByDay().length > 0"
      :activitiesByDay="getActivitiesByDay()"
      :activeIndexDay="activeIndexDay"
      :stickyOpen="stickyOpen"
      :stickyHeaderOffset="stickyHeaderOffset"
      :stickyHeight="stickyHeight"
      :stickyHeaderShowFilters="stickyHeaderShowFilters"
      v-on:changeDayFromStickyMenu="changeDayFromStickyMenu"
      v-on:toggleFilterOptions="toggleFilterOptions"
      v-on:closeStickyBar="closeStickyBar"
    ></sticky-bar>
    <div class="schedule-container">
      <h1 class="phone-padding">Programa</h1>
      <loading-bar
        v-if="getApiStatus().state === 'loading' || getApiStatus().state === 'not-initialized'"
      ></loading-bar>
      <api-error
        v-if="['error', 'retrying'].includes(getApiStatus().state)"
        @retry="$store.dispatch('schedule/getData', 'retrying')"
        :apiStatus="getApiStatus()"
      ></api-error>
      <schedule-component
        v-if="getApiStatus().state === 'ok'"
        @distancesToTop="setActiveIndexDay"
        @changeDay="changeDay"
        @scrollTo="scrollTo"
        :activitiesByDay="getActivitiesByDay()"
      ></schedule-component>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
import {
  Schedule as ScheduleComponent,
  Talk,
  Badge,
  Person,
  StickyBar,
  CheckboxInput,
  CheckboxDetail,
  ApiError,
  ButtonComponent,
  LoadingAnimation,
  LoadingBar
} from "../components";
import { TalkResource } from "../types/api";
import { App } from "../utils/app";
import { ScheduleModule } from "../store/schedule";
import { ActivitiesByDay, ApiStatus } from "../types/components";

Vue.component("ScheduleComponent", ScheduleComponent);
Vue.component("Person", Person);
Vue.component("StickyBar", StickyBar);
Vue.component("CheckboxDetail", CheckboxDetail);
Vue.component("CheckboxInput", CheckboxInput);
Vue.component("Talk", Talk);
Vue.component("Badge", Badge);
Vue.component("ApiError", ApiError);
Vue.component("ButtonComponent", ButtonComponent);
Vue.component("LoadingAnimation", LoadingAnimation);
Vue.component("LoadingBar", LoadingBar);

@Component({})
export default class Schedule extends Vue {
  distanceToTop!: number;
  activeIndexDay: number = -1;
  stickyHeaderOffset: string = "0px";
  stickyOpen: boolean = false;

  stickyHeaderShowFilters: boolean = false;
  stickyHeight: string = "0px";

  getActivitiesByDay(): ActivitiesByDay[] {
    return ScheduleModule.activitiesByDay;
  }

  getApiStatus(): ApiStatus {
    return ScheduleModule.apiStatus;
  }

  setDistanceToTop() {
    const stickyHeader = document.querySelector(`.sticky-bar`);
    if (!stickyHeader) {
      return;
    }
    this.distanceToTop = stickyHeader.getBoundingClientRect().top;
  }

  updated() {
    if (
      this.getApiStatus().state !== "ok" ||
      this.getActivitiesByDay().length === 0
    ) {
      return;
    }

    this.setDistanceToTop();
    this.setStickyBarHeight();
  }

  mounted() {
    this.$store.dispatch("schedule/getData");
    window.addEventListener("resize", this.setStickyBarHeight);
  }

  toggleFilterOptions() {
    if (this.getApiStatus().state !== "ok") {
      return;
    }

    this.stickyHeaderShowFilters = !this.stickyHeaderShowFilters;
    if (!this.stickyOpen && this.stickyHeaderShowFilters) {
      this.stickyOpen = true;
    }
    this.setStickyBarHeight();
  }

  closeStickyBar() {
    this.stickyOpen = false;
  }

  setStickyBarHeight() {
    const closeHeight = (document.querySelector(".sticky-bar-close") as any)
      .scrollHeight;

    const height: number =
      (document.querySelector(
        this.stickyHeaderShowFilters ? ".sticky-bar > div" : ".day-list"
      ) as any).scrollHeight - 30;

    this.stickyHeight = this.stickyHeaderShowFilters
      ? `calc(${height}px + var(--space-m))`
      : `${height + closeHeight}px`;
  }

  setActiveIndexDay(distancesToTop: number[]) {
    this.activeIndexDay =
      distancesToTop.indexOf(
        Math.max(...distancesToTop.filter(d => d - 5 < this.distanceToTop))
      ) + 1;
    this.stickyHeaderOffset = `-${this.activeIndexDay * 30}px`;
  }

  changeDayFromStickyMenu(i: number) {
    if (i === 0) {
      return;
    }
    this.activeIndexDay = i;
    if (this.stickyOpen) {
      this.scrollToDay();
    }
    this.stickyHeaderOffset = `-${this.activeIndexDay * 30}px`;
    this.stickyOpen = !this.stickyOpen;
  }

  changeDay(i: number) {
    this.activeIndexDay = i + 1;
    this.scrollToDay();
  }

  scrollTo(e: any, stickyBarOffset = false) {
    // TODO Change 52 to header height and 30 to variable
    console.log(stickyBarOffset);
    const scrollTo = (e as any).offsetTop + 1 - 52 - (stickyBarOffset ? 30 : 0);
    window.scrollTo({
      top: scrollTo,
      behavior: "smooth"
    });
  }

  scrollToDay(activeIndexDay: number = this.activeIndexDay) {
    const e = document.querySelector(
      `#schedule-day-${this.activeIndexDay - 1}`
    );
    this.scrollTo(e as any);
  }

  scrollToActivity(id: number) {
    const activityContainer = document.getElementById(`activity-${id}`);
    this.scrollTo(activityContainer as any, true);
  }
}
</script>

<style>
.schedule-container {
  padding: var(--space-xs) 0;
}

h3.day-bar {
  font-size: 12px;
  text-transform: uppercase;
  color: var(--neutral-2);
  letter-spacing: 1.2px;
  height: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
@media screen and (min-width: 1100px) {
  .schedule-container {
    width: 1000px;
  }
}
@media screen and (min-width: 900px) {
  h3.day-bar {
    font-size: 15px;
    margin: 0 auto;
  }
}
</style>
