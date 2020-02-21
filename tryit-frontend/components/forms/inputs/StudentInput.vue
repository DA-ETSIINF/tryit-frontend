<template>
  <div class="are-u-student-container">
    <div class="question-wrapper">
      <span class="opening-question-mark">¿</span>
      <span class="closing-question-mark">?</span>
      <span class="you-are">Eres...</span>
      <CheckboxDetail
        :id="'student'"
        :text="'estudiante'"
        :checked="_isStudent"
        :className="'student-checkbox'"
        @change="updateAnswer($event, _isUpmStudent)"
      ></CheckboxDetail>
      <CheckboxDetail
        :id="'upm-student'"
        :text="'de la UPM'"
        :checked="_isUpmStudent"
        :className="'upm-checkbox'"
        @change="updateAnswer(_isStudent, $event)"
      ></CheckboxDetail>
    </div>
    <p class="small answer">{{answer}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { CheckboxDetail } from "../../";
import { validate } from "../../../utils";
import {
  Indexes,
  Requirement,
  DynamicFormModule,
  StudentInputValueType
} from "../../../types/components";

@Component({
  components: { CheckboxDetail }
})
export default class StudentInput extends Vue {
  @Prop({ type: Boolean, required: true }) readonly isStudent!: boolean;
  @Prop({ type: Boolean, required: true }) readonly isUpmStudent!: boolean;
  @Prop({ default: "" }) readonly value!: StudentInputValueType;
  @Prop({
    default: (): Indexes => {
      return { section: 0, input: 0 };
    }
  })
  readonly indexes!: Indexes;
  @Prop({ default: () => [] }) readonly validations!: Requirement[];
  @Prop({ type: String })
  readonly formModule!: DynamicFormModule;

  _isStudent: boolean = this.isStudent;
  _isUpmStudent: boolean = this.isUpmStudent;

  answer: string = "";

  private posibleAnswers = {
    studentUPM: "Sí, soy estudiante de la UPM",
    student: "Sí, soy estudiante pero NO de la UPM",
    nonStudent: "No, no soy estudiante"
  };

  created() {
    this.updateAnswer(this.isStudent, this.isUpmStudent);
  }

  updateAnswer(isStudent: boolean, isUpmStudent: boolean) {
    if (isStudent && isUpmStudent) {
      this.answer = this.posibleAnswers.studentUPM;
    } else if (isStudent && !isUpmStudent) {
      this.answer = this.posibleAnswers.student;
    } else if (!isStudent && !isUpmStudent) {
      this.answer = this.posibleAnswers.nonStudent;
    } else if (this._isStudent) {
      if (!isStudent) {
        this.answer = this.posibleAnswers.nonStudent;
        isUpmStudent = false;
      }
    } else if (!this._isStudent && !this._isUpmStudent) {
      if (isUpmStudent) {
        this.answer = this.posibleAnswers.studentUPM;
        isStudent = true;
        isUpmStudent = true;
      }
    }
    this._isStudent = isStudent;
    this._isUpmStudent = isUpmStudent;

    this.makeValidation();
  }

  makeValidation() {
    const value: StudentInputValueType = {
      isStudent: this._isStudent,
      isUpmStudent: this._isUpmStudent
    };
    validate(this.validations, value, this.indexes, this.formModule);
  }
}
</script>

<style>
.are-u-student-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--neutral-2);
  position: relative;
  width: 250px;
  margin: 0 auto;
}

.question-wrapper {
  position: relative;
  width: 130px;
}

.are-u-student-container .checkbox-container .checkbox-info {
  margin-left: var(--space-xs);
}
.are-u-student-container .checkbox-container .checkbox-info label {
  color: var(--neutral-32);
  font-style: var(--source-sans-pro);
  font-weight: var(--font-regular);
}

.student-checkbox {
  margin: var(--space-xxxs) var(--space-s);
  margin-right: 0;
  margin-top: var(--space-xxs);
}

.upm-checkbox {
  margin: var(--space-xs) calc(2 * var(--space-s));
  margin-right: 0;
}
.opening-question-mark,
.closing-question-mark {
  position: absolute;
  font-size: 80px;
  font-style: var(--roboto);
  font-weight: var(--font-bold-roboto);
  opacity: 0.15;
  color: var(--neutral-6);
}

.opening-question-mark {
  left: -44px;
  top: -14px;
  transform: rotate(-5deg);
}

.closing-question-mark {
  right: -30px;
  top: -30px;
  transform: rotate(4deg);
}
.answer {
  margin-top: var(--space-s);
  margin-bottom: 0;
  text-align: center;
  width: inherit;
}
</style>
