<template>
  <div class="text-input-container">
    <div>
      <input
        type="text"
        :disabled="isDisabled"
        :placeholder="placeholder"
        :class="{
          'error': status.status === 'error',
          'info': status.status === 'info',
          'ok': status.status === 'ok',
					'no-border': noBorder,
					'no-shadows': noShadows,
					'leave-space': leaveSpaceRight
				}"
        v-model="userValue"
        @keyup.esc="$emit('esc', $event)"
        @updateValue="onUpdateValue($event)"
        @focus="$emit('focus', $event)"
        @blur="makeValidation()"
      />
      <span v-if="!hideText">{{ helperText }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import {
  TextInputType,
  Requirement,
  Indexes,
  StatusOnInput,
  DynamicFormModule,
  TextInputValueType
} from "../../../types/components";
// import store from "store";
import { TicketModule } from "../../../store/ticket";
import { VolunteerModule } from "../../../store/volunteer";
import { validate } from "../../../utils";

@Component({})
export default class TextInput extends Vue {
  @Prop({ default: "" }) readonly helperText!: string;
  @Prop({ default: "" }) readonly placeholder!: string;
  @Prop({ default: "" }) readonly value!: TextInputValueType;
  @Prop({ default: false }) readonly isDisabled!: boolean;
  @Prop({ default: false }) readonly hideText!: boolean;
  @Prop({
    default: (): StatusOnInput => {
      return { status: "ok", statusDetail: { message: "", abbreviation: "" } };
    }
  })
  readonly status!: StatusOnInput;
  @Prop({ default: false }) readonly noBorder!: boolean;
  @Prop({ default: false }) readonly noShadows!: boolean;
  @Prop({ default: false }) readonly leaveSpaceRight!: boolean;
  @Prop({ default: "" }) readonly id!: string;
  @Prop({
    default: (): Indexes => {
      return { section: 0, input: 0 };
    }
  })
  readonly indexes!: Indexes;
  @Prop({ default: () => [] }) readonly validations!: Requirement[];
  @Prop({ type: String })
  readonly formModule!: DynamicFormModule;

  valueInput: string = this.value;

  public constructor() {
    super();
  }
  get userValue(): string {
    return this.value;
  }

  set userValue(value: string) {
    this.updateInput("value", value);
    this.valueInput = value;
  }

  makeValidation() {
    console.log("Make validation")
    validate(this.validations, this.valueInput, this.indexes, this.formModule);
  }

  updateInput(key: string, value: string) {
    switch (this.formModule) {
      case "ticket":
        TicketModule.updateInput({
          key,
          value,
          indexes: this.indexes
        });
        break;
      case "volunteer":
        VolunteerModule.updateInput({
          key,
          value,
          indexes: this.indexes
        });
        break;
    }
  }

  onUpdateValue(e) {
    this.$emit("keypress", e);
    if (this.status.status === "error" || this.status.status === "info") {
      this.makeValidation();
    }
  }
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

[type="text"] {
  border: 1px solid var(--neutral-7);
  border-radius: var(--border-radius-m);
  padding: var(--space-xs) var(--space-m);
  width: calc(100% - 2 * var(--space-m) - 2px * 1);
  outline: none;
  color: var(--neutral-1);
  background-color: transparent;
  box-shadow: var(--box-shadow-input-inset),
    var(--box-shadow-on-light-bck-light);
}

[type="text"]::placeholder {
  color: var(--neutral-7);
}

[type="text"].ok::placeholder {
  color: var(--ok-7);
}

[type="text"].error::placeholder {
  color: var(--error-7);
}

[type="text"].info::placeholder {
  color: var(--yellow-2);
}

[type="text"]:focus {
  border-color: var(--neutral-5);
}

[type="text"].ok {
  border-color: var(--ok-3);
  border-left: var(--space-xxs) solid var(--ok-3);
  padding-left: var(--space-s);
  box-shadow: var(--box-shadow-input-inset-ok),
    var(--box-shadow-on-light-bck-light-ok);
  background: var(--ok-10);
  color: var(--ok-1);
}

[type="text"].error {
  border-color: var(--error-4);
  border-left: var(--space-xxs) solid var(--error-4);
  padding-left: var(--space-s);
  box-shadow: var(--box-shadow-input-inset-error),
    var(--box-shadow-on-light-bck-light-error);
  color: var(--error-1);
  background: var(--error-10);
}

[type="text"].info {
  border-color: var(--yellow-4);
  border-left: var(--space-xxs) solid var(--yellow-4);
  padding-left: var(--space-s);
  box-shadow: var(--box-shadow-input-inset-info),
    var(--box-shadow-on-light-bck-light-info);
}

[type="text"]:disabled {
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

[type="text"].ok ~ span {
  color: var(--ok-2);
}

[type="text"].error ~ span {
  color: var(--error-2);
  font-weight: var(--font-bold-roboto);
}
[type="text"].info ~ span {
  font-weight: var(--font-bold-roboto);
}

[type="text"].no-border {
  border: 0;
}

[type="text"].no-shadows {
  box-shadow: none;
}
[type="text"].leave-space {
  width: initial;
  padding-right: 0;
}
</style>
