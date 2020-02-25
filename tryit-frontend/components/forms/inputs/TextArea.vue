<template>
  <div class="text-input-container">
    <div>
      <textarea
        :disabled="isDisabled"
        :placeholder="placeholder"
        :class="{
					status,
					'no-border': noBorder,
					'no-shadows': noShadows,
					'leave-space': leaveSpaceRight
				}"
        :value="value"
        @keyup.esc="$emit('esc', $event)"
        @keypress="$emit('keypress', $event)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      ></textarea>
      <span v-if="!hideText">{{ helperText }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { TextAreaValueType, StatusOnInput } from "../../../types/components";
@Component({})
export default class TextArea extends Vue {
  @Prop({ type: String, default: "" }) readonly helperText!: string;
  @Prop({ type: String, default: "" }) readonly placeholder!: string;
  @Prop({ required: true }) readonly value!: TextAreaValueType;
  @Prop({ type: Boolean, default: false }) readonly isDisabled!: boolean;
  @Prop({ type: Boolean, default: false }) readonly hideText!: boolean;
  @Prop({
    default: (): StatusOnInput => {
      return { status: "ok", statusDetail: { message: "", abbreviation: "" } };
    }
  })
  readonly status!: StatusOnInput;
  @Prop({ type: Boolean, default: false }) readonly noBorder!: boolean;
  @Prop({ type: Boolean, default: false }) readonly noShadows!: boolean;
  @Prop({ type: Boolean, default: false }) readonly leaveSpaceRight!: boolean;
}
</script>

<style>
.text-input-container {
  margin: var(--space-s) 0;
}

.text-input-container > div {
  display: flex;
  flex-direction: column;
  width: 100%;
}

textarea {
  border: 1px solid var(--neutral-7);
  border-radius: var(--border-radius-m);
  padding: var(--space-xs) var(--space-m);
  max-width: calc(100% - 2 * var(--space-m) - 2px * 1);
  min-width: calc(100% - 2 * var(--space-m) - 2px * 1);
  min-height: 30px;
  height: 55px;
  max-height: 250px;
  outline: none;
  color: var(--neutral-1);
  background-color: transparent;
  box-shadow: var(--box-shadow-input-inset),
    var(--box-shadow-on-light-bck-light);
}

textarea::placeholder {
  color: var(--neutral-7);
}

textarea:focus {
  border-color: var(--neutral-5);
}

textarea.ok {
  border-color: var(--ok-3);
  border-left: var(--space-xxs) solid var(--ok-3);
  padding-left: var(--space-s);
  box-shadow: var(--box-shadow-input-inset-ok),
    var(--box-shadow-on-light-bck-light-ok);
  background: var(--ok-10);
  color: var(--ok-1);
}

textarea.error {
  border-color: var(--error-4);
  border-left: var(--space-xxs) solid var(--error-4);
  padding-left: var(--space-s);
  box-shadow: var(--box-shadow-input-inset-error),
    var(--box-shadow-on-light-bck-light-error);
  color: var(--error-1);
  background: var(--error-10);
}

textarea.info {
  border-color: var(--yellow-4);
  border-left: var(--space-xxs) solid var(--yellow-4);
  padding-left: var(--space-s);
  box-shadow: var(--box-shadow-input-inset-info),
    var(--box-shadow-on-light-bck-light-info);
}

textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.text-input-container > div > span {
  font-size: 10px;
  color: var(--neutral-6);
  padding-left: var(--space-m);
  padding-top: var(--space-xxxs);
  min-height: 18px;
  max-width: calc(var(--min-width-m) - var(--space-m));
}

textarea.ok ~ span {
  color: var(--ok-2);
}

textarea.error ~ span {
  color: var(--error-2);
  font-weight: var(--font-bold-roboto);
}
textarea.info ~ span {
  font-weight: var(--font-bold-roboto);
}

textarea.no-border {
  border: 0;
}

textarea.no-shadows {
  box-shadow: none;
}
textarea.leave-space {
  width: initial;
  padding-right: 0;
}
</style>
