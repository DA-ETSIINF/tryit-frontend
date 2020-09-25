<template>
  <div class="container" :class="{'vertical':vertical}">
    <div class="wrapper">
      <div v-if="person.image !== '' && person.image !== null" class="image-container">
        <img :src="person.image" :alt="`Foto de ${person.name}`" />
      </div>
      <h4>{{person.name}}</h4>
      <h6 v-if="person.role">{{person.role}}</h6>
      <p>{{person.bio}}</p>
      <div class="email" v-if="email.username !== ''">
        <span class="username">{{email.username}}</span>
        <span class="hide">YOU ARE SUPPOSE TO NOT SEE THIS</span>
        <span>@{{email.domain}}</span>
      </div>
      <div class="social-media">
        <a
          v-if="person.social_media.github !== '' && person.social_media.github !== null"
          target="_blank"
          :href="person.social_media.github"
        >
          <i class="fab fa-github"></i>
        </a>
        <a
          v-if="person.social_media.gitlab !== '' && person.social_media.gitlab !== null"
          target="_blank"
          :href="person.social_media.gitlab"
        >
          <i class="fab fa-gitlab"></i>
        </a>
        <a
          v-if="person.social_media.twitter !== '' && person.social_media.twitter !== null"
          target="_blank"
          :href="person.social_media.twitter"
        >
          <i class="fab fa-twitter"></i>
        </a>
        <a
          v-if="person.social_media.linkedin !== '' && person.social_media.linkedin !== null"
          target="_blank"
          :href="person.social_media.linkedin"
        >
          <i class="fab fa-linkedin"></i>
        </a>
        <a
          v-if="person.social_media.facebook !== '' && person.social_media.facebook !== null"
          target="_blank"
          :href="person.social_media.facebook"
        >
          <i class="fab fa-facebook"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { OrganizerResource, SpeakerResource } from "../types/api";

@Component({})
export default class Person extends Vue {
  @Prop() person!: OrganizerResource | SpeakerResource;
  @Prop({ default: true }) vertical!: boolean;

  email!: {
    username: string;
    domain: string;
  };

  constructor() {
    super();
    this.email = {
      username: "",
      domain: ""
    };
  }

  mounted() {
    this.setEmailByParts();
  }

  setEmailByParts() {
    if (this.person.email !== "") {
      return;
    }
    const parts = this.person.email.split("@");
    this.email = {
      username: parts[0]
        .split("")
        .reverse()
        .join(""),
      domain: parts[1]
    };
  }
}
</script>

<style scoped>
.container {
  --image-size: 80px;
  padding-top: calc(var(--image-size) / 2);
}
.wrapper {
  border-radius: var(--border-radius-m);
  box-shadow: var(--box-shadow-on-light-bck-light);
  display: grid;
  background: var(--neutral-10);
  padding: var(--space-s) var(--space-l);
}
.wrapper .image-container {
  position: relative;
  height: calc(var(--image-size) / 2);
  display: flex;
  justify-content: center;
}

.wrapper > div > img {
  top: calc(var(--image-size) / -2);
  position: absolute;
  border-radius: 50%;
  object-fit: cover;
  height: 80px;
  width: 80px;
  box-shadow: inset 0 2px 4px 0 hsla(0, 0%, 0%, 0.2);
  box-shadow: var(--box-shadow-on-light-bck-light);
}

h4 {
  font-weight: normal;
  font-size: 16px;
  color: var(--primary-3);
  margin-top: var(--space-s);
}

p {
  font-size: 14px;
  color: var(--neutral-4);
  line-height: 23px;
  margin-top: var(--space-xs);
}

.wrapper.vertical h4 {
  margin-top: var(--space-m);
  margin-bottom: var(--space-xs);
  text-align: center;
}

.email {
  color: var(--neutral-5);
  font-size: 14px;
  letter-spacing: 1px;
  margin: 0 auto;
  margin-bottom: var(--space-m);
}
.email .username {
  unicode-bidi: bidi-override;
  direction: rtl;
}
.email .hide {
  display: none;
}

.social-media {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: var(--space-m);
  font-size: 20px;
  color: var(--neutral-4);
}
.social-media a:active,
.social-media a:visited {
  color: var(--neutral-4);
}
.social-media:hover {
  color: var(--neutral-3);
}
</style>
