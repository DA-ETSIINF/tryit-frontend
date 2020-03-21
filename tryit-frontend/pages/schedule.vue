<template>
  <div>
    <sticky-bar
      :activitiesByDay="activitiesByDay"
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
      <schedule-component
        v-on:distancesToTop="setActiveIndexDay"
        v-on:changeDay="changeDay"
        :activitiesByDay="activitiesByDay"
      ></schedule-component>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import {
  Schedule as ScheduleComponent,
  Talk,
  Badge,
  StickyBar,
  CheckboxInput,
  CheckboxDetail
} from "../components";
import { ActivityResource, TalkResource } from "../types/api";
import { App } from "../utils/app";

Vue.component("ScheduleComponent", ScheduleComponent);
Vue.component("StickyBar", StickyBar);
Vue.component("CheckboxDetail", CheckboxDetail);
Vue.component("CheckboxInput", CheckboxInput);
Vue.component("Talk", Talk);
Vue.component("Badge", Badge);

interface ActivitiesByDay {
  day: string;
  activities: TalkResource[];
}

@Component({})
export default class Schedule extends Vue {
  activitiesByDay: ActivitiesByDay[] = [];

  activities: TalkResource[] = [
    {
      id: 1,
      title:
        "¿Sueñan los androides con ovejas eléctricas? Cómo puedo crear mis propias inteligencias artificiales",
      description: "",
      speakers: [
        {
          name: "Victor N",
          bio: "Biografia",
          image: "https://www.ludoviccareme.com/files/image_211_image_fr.jpg",
          company: {
            name: "Google",
            sponsorType: "platinum",
            logo:
              "https://storage.googleapis.com/gd-wagtail-prod-assets/images/evolving_google_identity_2x.max-4000x2000.jpegquality-90.jpg",
            url: "https://google.com"
          },
          web: "https://google.com",
          socialMedia: {
            twitter: "https://twitter.com/google"
          }
        },
        {
          name: "Victor Nieves",
          bio: "Biografia",
          image: "https://www.ludoviccareme.com/files/image_211_image_fr.jpg",
          company: {
            name: "Google",
            sponsorType: "platinum",
            logo:
              "https://storage.googleapis.com/gd-wagtail-prod-assets/images/evolving_google_identity_2x.max-4000x2000.jpegquality-90.jpg",
            url: "https://google.com"
          },
          web: "https://google.com",
          socialMedia: {
            twitter: "https://twitter.com/google"
          }
        },
        {
          name: "Javi Barragán ",
          bio: "Biografia",
          image: "https://www.ludoviccareme.com/files/image_211_image_fr.jpg",
          company: {
            name: "Google",
            sponsorType: "platinum",
            logo:
              "https://storage.googleapis.com/gd-wagtail-prod-assets/images/evolving_google_identity_2x.max-4000x2000.jpegquality-90.jpg",
            url: "https://google.com"
          },
          web: "https://google.com",
          socialMedia: {
            twitter: "https://twitter.com/google"
          }
        }
      ],
      startDate: 1582621200000,
      endDate: 1582621201000,
      url: "https://twitter.com/google",
      room: "Sala principal"
    },
    {
      id: 2,
      title: "Charla interesante",
      description:
        "Pequeña descrición de lo que hace y de lo que no hace. Si es muy larga ponemos, labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.",
      speakers: [
        {
          name: "Artur",
          bio: "Biografia",
          image: "https://www.ludoviccareme.com/files/image_211_image_fr.jpg",
          company: {
            name: "Google",
            sponsorType: "platinum",
            logo:
              "https://storage.googleapis.com/gd-wagtail-prod-assets/images/evolving_google_identity_2x.max-4000x2000.jpegquality-90.jpg",
            url: "https://google.com"
          },
          web: "https://google.com",
          socialMedia: {
            twitter: "https://twitter.com/google"
          }
        },
        {
          name: "Arturo Vidal",
          bio: "Biografia",
          image: "https://www.ludoviccareme.com/files/image_211_image_fr.jpg",
          company: {
            name: "Google",
            sponsorType: "platinum",
            logo:
              "https://storage.googleapis.com/gd-wagtail-prod-assets/images/evolving_google_identity_2x.max-4000x2000.jpegquality-90.jpg",
            url: "https://google.com"
          },
          web: "https://google.com",
          socialMedia: {
            twitter: "https://twitter.com/google"
          }
        },
        {
          name: "Arturo V",
          bio: "Biografia",
          image: "https://www.ludoviccareme.com/files/image_211_image_fr.jpg",
          company: {
            name: "Google",
            sponsorType: "platinum",
            logo:
              "https://storage.googleapis.com/gd-wagtail-prod-assets/images/evolving_google_identity_2x.max-4000x2000.jpegquality-90.jpg",
            url: "https://google.com"
          },
          web: "https://google.com",
          socialMedia: {
            twitter: "https://twitter.com/google"
          }
        },
        {
          name: "Arturito",
          bio: "Biografia",
          image: "https://www.ludoviccareme.com/files/image_211_image_fr.jpg",
          company: {
            name: "Google",
            sponsorType: "platinum",
            logo:
              "https://storage.googleapis.com/gd-wagtail-prod-assets/images/evolving_google_identity_2x.max-4000x2000.jpegquality-90.jpg",
            url: "https://google.com"
          },
          web: "https://google.com",
          socialMedia: {
            twitter: "https://twitter.com/google"
          }
        },
        {
          name: "Arturo",
          bio: "Biografia",
          image: "https://www.ludoviccareme.com/files/image_211_image_fr.jpg",
          company: {
            name: "Google",
            sponsorType: "platinum",
            logo:
              "https://storage.googleapis.com/gd-wagtail-prod-assets/images/evolving_google_identity_2x.max-4000x2000.jpegquality-90.jpg",
            url: "https://google.com"
          },
          web: "https://google.com",
          socialMedia: {
            twitter: "https://twitter.com/google"
          }
        },
        {
          name: "R2D2 Vidal",
          bio: "Biografia",
          image: "https://www.ludoviccareme.com/files/image_211_image_fr.jpg",
          company: {
            name: "Google",
            sponsorType: "platinum",
            logo:
              "https://storage.googleapis.com/gd-wagtail-prod-assets/images/evolving_google_identity_2x.max-4000x2000.jpegquality-90.jpg",
            url: "https://google.com"
          },
          web: "https://google.com",
          socialMedia: {
            twitter: "https://twitter.com/google"
          }
        },
        {
          name: "Artuo",
          bio: "Biografia",
          image: "https://www.ludoviccareme.com/files/image_211_image_fr.jpg",
          company: {
            name: "Google",
            sponsorType: "platinum",
            logo:
              "https://storage.googleapis.com/gd-wagtail-prod-assets/images/evolving_google_identity_2x.max-4000x2000.jpegquality-90.jpg",
            url: "https://google.com"
          },
          web: "https://google.com",
          socialMedia: {
            twitter: "https://twitter.com/google"
          }
        }
      ],
      startDate: 1582722000000,
      endDate: 1582722001000,
      url: "https://twitter.com/google",
      room: "Sala principal"
    },
    {
      id: 3,
      title: "Charla super",
      description:
        "Pequeña descrición de lo que hace y de lo que no hace. Si es muy larga ponemos, labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.",
      speakers: [
        {
          name: "Alvaro ",
          bio: "Biografia",
          image: "https://www.ludoviccareme.com/files/image_211_image_fr.jpg",
          company: {
            name: "Google",
            sponsorType: "platinum",
            logo:
              "https://storage.googleapis.com/gd-wagtail-prod-assets/images/evolving_google_identity_2x.max-4000x2000.jpegquality-90.jpg",
            url: "https://google.com"
          },
          web: "https://google.com",
          socialMedia: {
            twitter: "https://twitter.com/google"
          }
        }
      ],
      startDate: 1582876800000,
      endDate: 1582876801000,
      url: "https://twitter.com/google",
      room: "Sala principal"
    }
  ];
  distanceToTop!: number;
  activeIndexDay: number = -1;
  stickyHeaderOffset: string = "0px";
  stickyOpen: boolean = false;

  stickyHeaderShowFilters: boolean = false;
  stickyHeight: string = "0px";

  setDistanceToTop() {
    const stickyHeader = document.querySelector(`.sticky-bar`);
    if (!stickyHeader) {
      return;
    }
    this.distanceToTop = stickyHeader.getBoundingClientRect().top;
  }

  updated() {
    this.setDistanceToTop();
    this.setStickyBarHeight();
  }

  mounted() {
    this.activitiesByDay = this.groupByDays(
      this.activities,
      App.navigatorLanguage
    );
    window.addEventListener("resize", this.setStickyBarHeight);
  }

  toggleFilterOptions() {
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

  /**
   * TODO This should be moved to the store
   * @description It will sort and group the activities by week day
   * @author Max
   * @version 1
   * @since 04/March/2020
   * @example
   * groupByDays([{name: "A1", startDate: 1582621200000},
   * 				{name: "A2", startDate: 1582729200000}
   * 				{name: "A3", startDate: 1582876800000},
   * 				{name: "A4", startDate: 1582722000000}])
   *
   * It will return activitiesByDay which contains:
   * 			[{
   * 				day: "tuesday, February 25",
   * 				activities: [{name: "A1", date: 1582621200000}]
   * 			},
   * 			{
   * 				day: "wednesday, February 26",
   * 				activities: [
   *              {name: "A4", date: 1582722000000},
   * 							{name: "A2", date: 1582729200000}
   *              ]
   * 			},
   * 			{
   * 				day: "friday, February 28",
   * 				activities: [{name: "A3", date: 1582876800000}]
   * 			}]
   *
   * NOTE: Some keys of the object in the arguments and return variables have been omitted
   */
  groupByDays(activities: TalkResource[], locale: string): ActivitiesByDay[] {
    const activitiesByDay: ActivitiesByDay[] = [];
    this.activities
      .sort((a1, a2) => a1.startDate - a2.startDate)
      .map(activity => {
        const date = new Date(activity.startDate);
        const day = date.toLocaleDateString(locale, {
          weekday: "long",
          month: "long",
          day: "numeric"
        });
        const found: number | undefined = activitiesByDay.findIndex(
          a => a.day === day
        );
        if (found === -1) {
          activitiesByDay.push({
            day,
            activities: [activity]
          });
        } else {
          activitiesByDay[found].activities.push(activity);
        }
      });
    return activitiesByDay;
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

  scrollToDay(activeIndexDay: number = this.activeIndexDay) {
    const e = document.querySelector(
      `#schedule-day-${this.activeIndexDay - 1}`
    );
    const scrollTo = (e as any).offsetTop + 1;
    window.scrollTo({
      top: scrollTo,
      behavior: "smooth"
    });
  }
}
</script>

<style>
.schedule-container {
  max-width: 1000px;
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

@media screen and (min-width: 900px) {
  .schedule-container {
    margin: var(--space-l) auto;
  }

  h3.day-bar {
    font-size: 15px;
    margin: 0 auto;
  }
}
</style>
