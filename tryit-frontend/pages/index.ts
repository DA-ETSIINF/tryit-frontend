import { Component } from "nuxt-property-decorator"
Component.registerHooks(['asyncData,', 'data'])

export { default as Home } from "./index.vue"
export { default as NotFound } from "./not-found.vue"

