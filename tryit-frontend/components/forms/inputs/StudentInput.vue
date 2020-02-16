<template>
  <div class="are-u-student-container">
    <div class="question">
      <span class="opening-question-mark">¿</span>
      <span class="closing-question-mark">?</span>
      <span class="you-are">Eres...</span>
      <CheckboxDetail
        id="'student'"
        :text="'estudiante'"
        :checked="isStudent"
        :className="'student-checkbox'"
        @change="updateAnswer($event, isUpmStudent)"
      ></CheckboxDetail>
      <CheckboxDetail
        id="'upm-student'"
        :text="'de la UPM'"
        :checked="isUpmStudent"
        :className="'upm-checkbox'"
        @change="updateAnswer(isStudent, $event)"
      ></CheckboxDetail>
    </div>
    <p class="small answer">{{answer}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { CheckboxDetail } from "../../";

@Component({
  components: { CheckboxDetail }
})
export default class StudentInput extends Vue {
  @Prop({ type: Boolean, required: true }) isStudent!: boolean;
  @Prop({ type: Boolean, required: true }) isUpmStudent!: boolean;
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
    } else if (this.isStudent) {
      if (!isStudent) {
        this.answer = this.posibleAnswers.nonStudent;
        isUpmStudent = false;
      }
    } else if (!this.isStudent && !this.isUpmStudent) {
      if (isUpmStudent) {
        this.answer = this.posibleAnswers.studentUPM;
        isStudent = true;
        isUpmStudent = true;
      }
    }
    this.isStudent = isStudent;
    this.isUpmStudent = isUpmStudent;
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
  left: 30px;
  top: -21px;
}

.closing-question-mark {
  right: 44px;
  top: -30px;
}
.answer {
  margin-top: var(--space-xs);
}
</style>
