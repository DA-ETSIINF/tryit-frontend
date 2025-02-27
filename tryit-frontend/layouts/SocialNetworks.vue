<template>
  <div :class="containerClass">
    <v-btn
      v-for="(item, index) in socialLinks"
      :key="index"
      :target="item.target"
      :href="item.href"
      :class="buttonClass"
      :fab="variant === 'footer'"
      :icon="variant === 'header'"
    >
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "SocialNetworks",
  props: {
    variant: {
      type: String,
      default: "header" // Puede ser "header" o "footer"
    }
  },
  data() {
    return {
      socialLinks: [
        { icon: "mdi-twitter", href: "https://twitter.com/tryit_upm", target: "_blank" },
        { icon: "mdi-email", href: "mailto:tryit.da@fi.upm.es", target: "_blank" },
        { icon: "mdi-github", href: "https://github.com/DA-ETSIINF/", target: "_blank" },
        { icon: "mdi-instagram", href: "https://www.instagram.com/tryit_upm/", target: "_blank" },
        { icon: "mdi-linkedin", href: "https://www.linkedin.com/company/tryit-upm/", target: "_blank" }
      ]
    };
  },
  computed: {
    containerClass() {
      return {
        "social-container-header": this.variant === "header",
        "social-container-footer": this.variant === "footer"
      };
    },
    buttonClass() {
      return {
        "social-button-header": this.variant === "header",
        "social-button-footer": this.variant === "footer",
        "white--text": this.variant === "header",
        "social-button-footer": this.variant === "footer"
      };
    }
  }
};
</script>

<style scoped>
.social-container-header {
 
}
.social-button-header {
  
}

.social-container-footer {
  
}
.social-button-footer {
    margin: 0 3px;
}
</style>
