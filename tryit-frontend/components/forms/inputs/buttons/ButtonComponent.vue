<template>
  <button :class="type">{{text}}</button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({})
export default class ButtonComponent extends Vue {
  @Prop() text!: string;
  @Prop() type!: "primary-btn" | "secondary-btn" | "tertiary-btn";
}
</script>

<style>
button.primary-btn {
  padding: var(--space-xs) var(--space-s);
  border: 0;
  border-radius: var(--border-radius-m);
  background: var(--primary-5);
  color: var(--neutral-10);
  font-size: 15px;
  font-family: var(--roboto);
  font-weight: var(--font-bold-roboto);
  cursor: pointer;
  box-shadow: var(--box-shadow-on-light-bck);
  transition: var(--transition-fast) background ease;
}

button.primary-btn:hover {
  background: var(--primary-4);
}

button.primary-btn:focus {
  --border-width: 3px;
  border: var(--border-width) solid var(--neutral-1);
  padding: calc(var(--space-xs) - var(--border-width))
    calc(var(--space-s) - var(--border-width));
  background: var(--primary-4);
  outline: none;
}

button.primary-btn:disabled {
  border: 0;
  opacity: 0.6;
  cursor: not-allowed;
}

button.secondary-btn {
  padding: var(--space-xs) var(--space-s);
  border: 1px solid var(--primary-5);
  border-radius: var(--border-radius-m);
  color: var(--primary-4);
  background: var(--neutral-10);
  font-size: 15px;
  font-family: var(--roboto);
  font-weight: var(--font-bold-roboto);
  cursor: pointer;
  box-shadow: var(--box-shadow-on-light-bck);
  transition: var(--transition-fast) background ease;
}

button.secondary-btn:hover {
  border: 1px solid var(--primary-4);
  background: var(--neutral-9);
}

button.secondary-btn:focus {
  --border-width: 2px;
  padding: calc(var(--space-xs) - var(--border-width))
    calc(var(--space-s) - var(--border-width));
  border: var(--border-width) solid var(--primary-5);
}

button.secondary-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button.tertiary-btn {
  letter-spacing: 1.9px;
  text-decoration: underline;
  border: 0;
  color: var(--neutral-3);
  background: transparent;
  font-size: 15px;
  font-family: var(--roboto);
  font-weight: var(--font-bold-roboto);
  cursor: pointer;
  transition: var(--transition-fast) background ease;
  padding: var(--space-xs) var(--space-s);
}

button.tertiary-btn:hover {
  color: var(--neutral-1);
}

button.tertiary-btn:focus {
  border: 1px solid var(--neutral-2);
  border-radius: var(--border-radius-m);
  color: var(--neutral-1);
}

button.tertiary-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
</style>
