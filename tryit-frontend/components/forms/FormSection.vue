<template>
  <div class="form-section">
    <div class="form-info">
      <h4 v-if="section.title !== undefined">{{ section.title }}</h4>
      <p v-if="section.description !== undefined" class="small">{{ section.description }}</p>
    </div>
    <div class="form-inputs">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { FormSectionType } from "../../types/components";

@Component({})
export default class FormSection extends Vue {
  @Prop({ type: Object, required: true }) section!: FormSectionType;
}
</script>

<style scoped>
.form-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.form-question {
  color: var(--primary-2);
  font-size: 16px;
  margin-bottom: var(--space-xs);
}

.form-info h4 {
  color: var(--primary-1);
  margin-bottom: 0;
}

.form-inputs > div:first-child {
  margin-top: var(--space-xxs);
}

@media screen and (min-width: 900px) {
  .form-section {
    flex-direction: row;
  }

  .form-section:not(:first-child) {
    margin-top: var(--space-l);
  }

  .form-info {
    margin-right: var(--space-xl);
  }

  .form-info > * {
    text-align: right;
    width: 320px;
  }

  .form-inputs {
    width: 400px;
  }

  .form-info h4 {
    margin-top: 0 !important;
  }

  .form-info p {
    margin-top: var(--space-xs);
  }
}
</style>
