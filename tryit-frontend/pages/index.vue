<template>
  <full-page ref="fullpage" :options="options" id="fullpage">
    <section class="welcome section">
      <div class="welcome-container">
        <div class="welcome-image">
          <img src="@/assets/img/welcome.jpg" alt="Try IT! congress" />
        </div>
        <div class="welcome-content">
          <h1>Try IT! 2020</h1>
          <h4 style="width: initial">ETSIINF - UPM</h4>
          <h3>16-20 MARZO</h3>
          <button-component
            :type="'secondary-btn'"
            :text="'Consigue tu entrada'"
            @onClick="goTo('/ticket')"
          ></button-component>
        </div>
      </div>
    </section>
    <section class="what-we-offer section">
      <h2>¿Qué ofrecemos?</h2>
      <p
        class="section-description"
      >Un congreso orientado a difundir las tendencias actuales tecnológicas.</p>
      <div class="properties">
        <div
          class="property"
          :class="{ active: paragraphActive === 'companies' }"
          @click="paragraphActive = 'companies'"
        >
          <h3>Empresas punteras</h3>
          <div class="description">
            <p>
              Como en otras ediciones, este año también contaremos con empresas líderes de la talla
              de Google, Microsoft, IBM y muchas más.
            </p>
          </div>
          <div class="icon">
            <div class="bck"></div>
            <i class="far fa-building"></i>
          </div>
        </div>
        <div
          class="property"
          :class="{ active: paragraphActive === 'topics' }"
          @click="paragraphActive = 'topics'"
        >
          <h3>Temática diversa</h3>
          <div class="description">
            <p>
              Podrás asistir a charlas y talleres de programación web, Big Data, Blockchain,
              aplicaciones móviles, VR...
            </p>
          </div>
          <div class="icon">
            <div class="bck"></div>
            <i
              style="padding-top: calc(var(--space-s) + 2px); padding-bottom: calc(var(--space-s) - 2px)"
              class="fas fa-project-diagram"
            ></i>
          </div>
        </div>
        <div
          class="property"
          :class="{ active: paragraphActive === 'talks_n_workshops' }"
          @click="paragraphActive = 'talks_n_workshops'"
        >
          <h3>Ponencias y talleres</h3>
          <div class="description">
            <p>
              Podrás asistir a una amplia variedad de charlas y talleres donde podrás aumentar tus
              conocimientos
            </p>
          </div>
          <div class="icon">
            <div class="bck"></div>
            <i class="fas fa-robot"></i>
          </div>
        </div>
        <div
          class="property"
          :class="{ active: paragraphActive === 'free' }"
          @click="paragraphActive = 'free'"
        >
          <h3>Acceso gratuito</h3>
          <div class="description">
            <p>
              Try IT! lo organiza DA-ETSIINF de la UPM. Está hecho por y para estudiantes.
              Perseguimos la formación y no el lucro.
            </p>
          </div>
          <div class="icon">
            <div class="bck"></div>
            <i class="fas fa-dollar-sign"></i>
          </div>
        </div>
        <div
          class="property"
          :class="{ active: paragraphActive === 'ects' }"
          @click="paragraphActive = 'ects'"
        >
          <h3>Reconocimiento de ECTS</h3>
          <div class="description">
            <p>
              Try IT! se incluye en el Catálogo General de Reconocimiento de Créditos de la UPM.
              Podrás obtener hasta 2 ECTS.
            </p>
          </div>
          <div class="icon">
            <div class="bck"></div>
            <i class="fas fa-graduation-cap"></i>
          </div>
        </div>
      </div>
    </section>
    <section class="section" style="padding-top: var(--space-l)">
      <h2>Patrocinadores</h2>
      <Sponsors></Sponsors>
    </section>
    <section class="section" v-if="false">
      <SliderEvents></SliderEvents>
    </section>
    <section class="section">
      <h2>¿Dónde estamos?</h2>
      <Map></Map>
    </section>
    <section class="section">
      <Hero :data="volunteersData"></Hero>
    </section>
    <section class="section fp-auto-height">
      <FooterComponent></FooterComponent>
    </section>
  </full-page>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
if (process.client) {
  require("fullpage.js/vendors/scrolloverflow");
}
import {
  ButtonComponent,
  Sponsors,
  Badge,
  Map,
  SliderEvents,
  Hero,
  FooterComponent
} from "../components";

import { HeroType } from "../types/components";
@Component({
  components: {
    ButtonComponent,
    Sponsors,
    Badge,
    Map,
    SliderEvents,
    Hero,
    FooterComponent
  }
})
export default class extends Vue {
  options = {
    licenseKey: "RMPr@ZT!e1",
    dir: "v",
    loop: false,
    duration: 300,
    scrollOverflow: true
  };

  paragraphActive:
    | "talks_n_workshops"
    | "companies"
    | "free"
    | "diverse_topics"
    | "ects"
    | "" = "";

  volunteersData: HeroType = {
    image: "/img/volunteers.jpg",
    name: "Volunteers",
    title: "¿Quieres ser voluntario?",
    description: "Podrás conseguir hasta 1 ECTS",
    btn: true,
    btn_text: "Regístrate aquí"
  };

  goTo(path: string) {
    window.location.href = path; // TODO use router
  }
}
</script>

<style scoped>
.welcome .welcome-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.welcome .welcome-image {
  background: var(--primary-3);
  width: 100%;
  height: 100%;
}

.welcome .welcome-image img {
  object-fit: cover;
  height: 100%;
  filter: opacity(0.3);
  width: 100%;
}

.welcome-content {
  position: absolute;
  background: transparent;
  display: flex;
  flex-direction: column;
}

.welcome-content h1 {
  color: var(--neutral-10);
  font-weight: var(--font-bold-roboto);
  font-size: 40px;
  text-align: center;
}

.welcome-content h4 {
  font-weight: var(--font-bold-roboto);
  color: var(--neutral-10);
  font-size: 15px;
  letter-spacing: 1.2px;
  text-align: center;
  margin: var(--space-xs) 0;
}

.welcome-content h3 {
  font-weight: var(--font-bold-roboto);
  color: var(--neutral-10);
  font-size: 20px;
  text-align: center;
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
  text-align: center;
  margin-top: var(--space-l);
}

.section-description {
  text-align: center;
  margin-top: var(--space-s);
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

  .properties .property:nth-child(2n + 1) > div > div {
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
</style>
