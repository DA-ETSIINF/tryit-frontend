<template>
  <div>
    <div class="grid">
      <div class="time-periods-options">
        <div class="time-period" v-for="p in periodsAvailable" :key="p">
          <span v-if="p === 'morning'">Mañana</span>
          <span v-if="p === 'afternoon'">Tarde</span>
        </div>
      </div>
      <div
        class="time-slots-container"
        :style="{
        gridTemplateColumns: `repeat(${timePeriods.length}, 1fr)`,
        gridTemplateRows: `2fr repeat(${periodsAvailable.length}, 1fr)` }"
      >
        <div v-for="(slot, i) in slots" :key="i">
          <div class="day-title" v-if="slot.type === 'header'">
            <span class="day">{{slot.day}}</span>
            <span class="date">{{slot.date}}</span>
          </div>
          <div class="time-slot" v-if="slot.type === 'slot'">
            <checkbox-input :id="slot.id"></checkbox-input>
          </div>
          <div v-if="slot.type === 'empty'"></div>
        </div>
      </div>
    </div>
    <div class="slide-to-the-left">Pssst, desliza, hay mas opciones</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { TimePeriodsType, PeriodsAvailable } from "../../../types/components";

interface AvailabilitySlot {
  type: "header" | "slot" | "empty";
  day?: string;
  date?: string;
  id?: number;
}

@Component({})
export default class AvailabilityInput extends Vue {
  @Prop({ type: Array, required: true }) timePeriods!: TimePeriodsType[];
  @Prop({ type: Array, required: true }) periodsAvailable!: PeriodsAvailable[];

  slots: AvailabilitySlot[] = [];

  /**
   * This function converts the data from the periods in the corrects order of display,
   * which is top to bottom, left to rigth. This is made like that in order to be able
   * to make use of CSS grid.
   */
  beforeMount() {
    this.timePeriods.forEach(p => {
      this.slots.push({
        type: "header",
        day: p.dayWeek,
        date: p.dayMonth
      });
    });
    this.periodsAvailable.forEach(pa => {
      this.timePeriods.forEach(tp => {
        const e = tp.dayPeriods.find(_tp => _tp.period === pa);
        if (e) {
          this.slots.push({
            type: "slot",
            id: e.htmlId
          });
        } else {
          this.slots.push({
            type: "empty"
          });
        }
      });
    });
  }
}
</script>

<style scoped>
.grid {
  display: flex;
  min-width: 100%;
}

.time-slots-container {
  display: grid;
  justify-items: center;
  width: 100%;
  flex: 1;
  overflow-x: auto;
  padding-bottom: var(--space-s);
}

.time-slots-container .day-title {
  display: flex;
  flex-direction: column;
  padding: var(--space-xs) 0;
  min-width: 85px;
}
.time-slots-container .day-title span {
  text-align: center;
  font-family: var(--roboto);
  font-weight: var(--font-medium-roboto);
}
.time-slots-container .day-title span:first-child {
  font-size: 13px;
  color: var(--neutral-3);
}
.time-slots-container .day-title span:nth-child(2) {
  font-size: 11px;
  color: var(--neutral-5);
}

.time-slots-container > div {
  display: flex;
  align-items: center;
  justify-content: center;
}

.time-periods-options {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: var(--space-s);
  margin-left: var(--space-l);
}

.time-periods-options .time-period {
  height: 25px;
  text-align: right;
  padding-right: var(--space-xs);
}

.time-periods-options .time-period > span {
  width: 100%;
  font-size: 13px;
  font-family: var(--roboto);
  font-weight: var(--font-medium-roboto);
  color: var(--neutral-3);
}
.slide-to-the-left {
  text-align: right;
  font-size: 10px;
  color: var(--neutral-5);
  font-weight: var(--font-bold-roboto);
  margin-right: var(--space-l);
}

@media screen and (min-width: 492px) {
  .slide-to-the-left {
    display: none;
  }
}

@media screen and (min-width: 900px) {
  .grid {
    justify-content: center;
    min-width: 600px;
  }
  .time-slots-container {
    max-width: 600px;
  }
  .time-periods-options {
    margin-left: 0;
  }
}
</style>
