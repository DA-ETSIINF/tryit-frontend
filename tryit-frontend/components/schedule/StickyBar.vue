<template>
  <div
    class="days sticky-bar"
    :class="{ 'sticky-open': stickyOpen }"
    :style="{'border-bottom': activeIndexDay === 0 && !stickyOpen ? 'none' : '1px solid var(--neutral-4)', 
      'height': stickyOpen ?  stickyHeight : '30px',
      'box-shadow': activeIndexDay === 0 && !stickyOpen ? 'none' : '0 6px 8px -8px var(--neutral-6)',
      'background': activeIndexDay === 0 && !stickyOpen ? 'none' : `var(--neutral-${deviceWidth < 900 ? 9 : 10})` }"
  >
    <div>
      <div class="sticky-bar-container">
        <div
          class="day-list-container"
          :style="{top: stickyHeaderOffset, 'transition-duration': activeIndexDay !== 0 ? '.1s' : '0s'}"
        >
          <div
            class="dot"
            v-if="stickyOpen"
            :style="{top: `calc(${activeIndexDay} * 30px + 10px)`}"
          ></div>
          <div class="day-list-wrapper">
            <div class="day-list">
              <h3
                class="day-bar"
                v-for="(day, index) in getDays()"
                :key="index"
                @click="$emit('changeDayFromStickyMenu', index)"
              >{{day}}</h3>
            </div>
          </div>
        </div>
        <div class="horizontal-divider"></div>
        <div class="filter-container">
          <div
            class="filter-options"
            :style="{'background': `var(--neutral-${deviceWidth < 900 ? 9 : 10})`}"
          >
            <span
              v-for="(option, index) in filterOptions.sessionsType"
              :key="index"
              :class="{'active': option.active}"
              @click="option.active = !option.active"
            >{{option.text}}</span>
          </div>
          <div class="show-prize">
            <checkbox-detail
              :text="'Mostrar sólo sesiones con premio'"
              :id="'show-session-with-prize'"
              :checked="filterOptions.showOnlyWithPrizes"
              :gap="'var(--space-xs)'"
            ></checkbox-detail>
          </div>
        </div>
        <div
          class="filter-icon-wrapper"
          v-if="activeIndexDay !== 0 || stickyOpen"
          :class="{'active':stickyHeaderShowFilters}"
          @click="$emit('toggleFilterOptions')"
        >
          <span v-if="stickyOpen">Filtros</span>
          <i class="fas fa-filter filter-icon"></i>
        </div>
      </div>
      <div
        class="sticky-bar-close"
        :style="{'top': `calc(${stickyHeight} - 20px)`, 'background': `var(--neutral-${deviceWidth < 900 ? 8 : 9})`}"
        @click="$emit('closeStickyBar')"
      >
        <span>Cerrar</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

import { TalkResource } from "../../types/api";
import { App } from "../../utils/app";

interface ActivitiesByDay {
  day: string;
  activities: TalkResource[];
}
interface FilterOptions {
  sessionsType: {
    type: string; // TODO Change to the types
    text: string;
    abbr: string;
    active: boolean;
  }[];
  showOnlyWithPrizes: boolean;
}
@Component({})
export default class StickyBar extends Vue {
  @Prop({}) activitiesByDay!: ActivitiesByDay[];
  @Prop({}) activeIndexDay!: number;
  @Prop({}) stickyOpen!: boolean;
  @Prop({}) stickyHeaderOffset!: string;
  @Prop({}) stickyHeight!: string;
  @Prop({}) stickyHeaderShowFilters!: boolean;

  deviceWidth: number = 0;
  closeButtonPosition: string = "0px";

  filterOptions: FilterOptions = {
    sessionsType: [
      {
        type: "all",
        text: "Todas",
        abbr: "all",
        active: true
      },
      {
        type: "talk",
        text: "Charla",
        abbr: "talk",
        active: false
      },
      {
        type: "workshop",
        text: "Taller",
        abbr: "workshop",
        active: false
      },
      {
        type: "activity",
        text: "Actividad",
        abbr: "activity",
        active: false
      },
      {
        type: "activity",
        text: "Actividad",
        abbr: "activity",
        active: false
      }
    ],
    showOnlyWithPrizes: false
  };

  mounted() {
    this.deviceWidth = App.deviceWidth;
  }

  getDays(): string[] {
    const options = this.activitiesByDay.map(d => d.day);
    options.unshift("");
    return options;
  }
}
</script>

<style scoped>
.sticky-bar {
  position: fixed;
  width: 100%;
  height: 30px;
  overflow: hidden;
  top: 51px;
  left: 0;
  transition: 0.3s height ease;
  z-index: 999; 
}

.sticky-bar .sticky-bar-container {
  display: grid;
  grid-template-areas:
    "day-list filter-icon"
    "horizontal-divider horizontal-divider"
    "filter-options filter-options";
  grid-auto-columns: 1fr auto;
  max-width: calc(1000px - 2 * var(--space-l));
  padding: 0 var(--space-l);
  margin: 0 auto;
  position: relative;
  height: calc(100% - 30px);
}

.sticky-bar .sticky-bar-container > div:not(.filter-icon-wrapper) {
  position: relative;
  top: 0px;
  transition-property: top;
  transition-timing-function: ease;
  align-items: center;
  flex: 1;
}

.sticky-bar .sticky-bar-container > div.day-list-container {
  grid-area: day-list;
}
.sticky-bar .sticky-bar-container > div .day-list-wrapper {
  z-index: 999;
  display: flex;
}
.sticky-bar .sticky-bar-container > div .day-list {
  width: 100%;
}

.sticky-bar h3:first-child {
  height: 30px;
  cursor: inherit;
}

.dot {
  height: 6px;
  width: 6px;
  background: var(--primary-5);
  border-radius: 50%;
  position: absolute;
  left: -19px;
  transition: 0.8s top, transform ease;
  animation-name: dot-in;
  animation-duration: 0.3s;
  animation-delay: 0.3s;
  animation-fill-mode: forwards;
  transform: scale(0);
}

@keyframes dot-in {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

.filter-icon-wrapper {
  display: flex;
  align-items: center;
  height: 20px;
  margin: 5px 0;
  cursor: pointer;
  padding: 0 var(--space-xs);
  border-radius: var(--border-radius-m);
  border: 1px solid transparent;
}

.filter-icon-wrapper.active {
  background: var(--neutral-2);
}

.filter-icon-wrapper:hover {
  border: 1px solid var(--neutral-8);
}

.filter-icon-wrapper span {
  text-transform: uppercase;
  font-size: 9px;
  font-weight: var(--font-bold-roboto);
  color: var(--neutral-2);
  white-space: nowrap;
  padding-right: var(--space-xxxs);
  animation: filter-text-in 0.3s ease 0.1s;
  animation-fill-mode: forwards;
  opacity: 0;
}

@keyframes filter-text-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.sticky-bar .sticky-bar-container > div .filter-icon {
  color: var(--neutral-2);
  font-size: 14px;
  transform: scale(0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.filter-icon-wrapper.active span,
.filter-icon-wrapper.active i.filter-icon {
  color: var(--neutral-9);
}
.filter-icon-wrapper.active i.filter-icon {
  font-size: 12px;
}

.horizontal-divider {
  height: 1px;
  width: calc(100vw - 2 * var(--space-l));
  position: absolute;
  background: var(--neutral-7);
  z-index: 1000;
  margin: 0 auto;
  left: 0;
  grid-area: horizontal-divider;
}
.filter-container {
  display: grid;
  grid-auto-columns: 1fr 1fr;
  grid-gap: var(--space-xs);
  margin-top: var(--space-xs);
  grid-area: filter-options;
  padding-bottom: var(--space-s);
}

.filter-options {
  width: 100%;
  z-index: 999;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.filter-options span {
  text-transform: uppercase;
  margin: var(--space-xxxs) var(--space-xs) var(--space-xxxs) 0;
  border: 2px solid var(--primary-4);
  border-radius: 55px;
  padding: var(--space-xxxs) var(--space-xs);
  font-size: 11px;
  font-weight: var(--font-bold-roboto);
  font-family: var(--roboto);
  color: var(--primary-4);
}
.filter-options span:hover {
  background: var(--primary-10);
  cursor: pointer;
}
.filter-options span.active {
  color: var(--neutral-10);
  background: var(--primary-4);
}

.sticky-bar-close {
  position: absolute;
  z-index: 1000;
  background: var(--neutral-8);
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  font-weight: var(--font-bold-roboto);
  font-size: 12px;
  color: var(--neutral-1);
  padding: var(--scale-xxs) 0;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s all ease;
  cursor: pointer;
}

.sticky-bar-close:hover {
  background: var(--neutral-7);
}

@media screen and (min-width: 900px) {
  .sticky-bar .sticky-bar-container {
    padding: 0;
  }
  .sticky-bar .sticky-bar-container > div .filter-icon {
    right: var(--space-m);
  }

  .horizontal-divider {
    width: calc(1000px - 2 * var(--space-l));
  }

  .filter-icon-wrapper {
    right: calc(30px + var(--space-l));
  }
}

.sticky-open {
  height: initial;
  box-shadow: 0 6px 8px -8px var(--neutral-4);
}

.sticky-open .sticky-bar-container > div:not(.filter-icon-wrapper) {
  top: -30px !important;
}

.sticky-open h3 {
  border-bottom: 0;
}
</style>
