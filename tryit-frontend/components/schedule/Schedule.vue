<template>
  <div>
    <div class="sessions">
      <div class="day" v-for="(day, index) in activitiesByDay" :key="index">
        <h3
          class="phone-margin day-bar"
          :id="`schedule-day-${index}`"
          @click="$emit('changeDay', index)"
        >{{day.day}}</h3>
        <div class="day-sessions-container">
          <talk
            v-for="activity in day.activities"
            :key="activity.title"
            :activity="activity"
            :openByDefault="activitySelected === activity.id"
          ></talk>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { ActivitiesByDay } from "../../types/components";

@Component({})
export default class Schedule extends Vue {
  @Prop({}) activitiesByDay!: ActivitiesByDay[];

  activitySelected: number = -1;

  mounted() {
    this.emitRanges();
    window.addEventListener("scroll", this.emitRanges);
    //@ts-ignore
    if (this.$route.query.activity) {
      //@ts-ignore
      this.activitySelected = parseInt(this.$route.query.activity);
      this.$emit("scrollToActivity", this.activitySelected);
    }
  }

  emitRanges() {
    const ranges: number[] = [];
    this.activitiesByDay.forEach((day, index) => {
      const e = document.querySelector(`#schedule-day-${index}`);
      const distance = e?.getBoundingClientRect().top;
      if (distance !== undefined) {
        ranges.push(distance);
      }
    });
    this.$emit("distancesToTop", ranges);
  }
}
</script>

<style scoped>
.sessions {
  display: grid;
  grid-template-columns: repeat(1, auto);
  grid-gap: calc(var(--space-m));
}

.day-sessions-container {
  margin-top: var(--space-xs);
}
.sessions .day h3 {
  border-bottom: 1px solid var(--neutral-6);
}
@media screen and (min-width: 900px) {
  .sessions .day h3 {
    padding-left: var(--space-l);
  }
}
</style>
