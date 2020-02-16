<template>
  <div class="select-input-container">
    <h5 class="form-question">{{ title }}</h5>
    <div v-bind:class="{ open: open }">
      <div class="select-input-wrapper">
        <div class="selection-box">
          <TextInput
            :placeholder="'Buscar'"
            :hideText="true"
            :noBorder="true"
            :noShadows="true"
            :leaveSpaceRight="true"
            :value="optionSelected.title"
            v-on:keypress="search($event)"
            v-on:focus="$emit('toogleOpen', true, true)"
            v-on:blur="$emit('toogleOpen', false)"
            v-on:esc="$emit('toogleOpen', false)"
          ></TextInput>
          <i class="fas fa-times" v-if="open" @click="$emit('change', {}, false)"></i>
          <i class="fas fa-angle-down" v-if="!open" @click="$emit('toogleOpen', true)"></i>
        </div>
      </div>
      <div class="select-input-options">
        <ul>
          <div v-for="(optionSection, index) in copyOptions" :key="index">
            <li
              v-for="option in optionSection"
              :class="{ active: option.id === optionSelected.id }"
              :key="option.id"
              v-on:click="changeOption(option)"
            >{{ option.title }}</li>
            <div class="select-input-divider" v-if="copyOptions.length - 1 !== index"></div>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import Fuse from "fuse.js";
import { OptionSelected } from "../../../types/components";

@Component({})
export default class SelectInput extends Vue {
  @Prop({ type: String, required: true }) title!: string;
  @Prop({ type: Array, required: true }) options!: OptionSelected[][];
  @Prop({ type: Object, required: true }) optionSelected!: OptionSelected;
  @Prop({ type: Boolean, default: false }) open!: boolean;

  copyOptions: OptionSelected[][] = this.options;

  fuseOptions = {
    shouldSort: true,
    findAllMatches: true,
    includeMatches: true,
    threshold: 0.5,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["title"]
  };

  search(e) {
    this.$emit("open", true);
    // @ts-ignore: It ignores the error caused by the flat()
    const fuse = new Fuse(this.options.flat(), this.fuseOptions);
    const result = fuse.search(e.target.value);
    this.copyOptions = [[]];
    result.forEach(r => {
      let _r: any = r;
      this.copyOptions[0].push({ title: _r.item.title, id: _r.item.id });
    });
  }

  changeOption(option) {
    setTimeout(() => {
      this.copyOptions = this.options;
    }, 500);
    this.$emit("change", option);
  }
}
</script>

<style scoped>
.text-input-container {
  margin: 0;
  width: 100%;
}

.select-input-container {
  padding: var(--space-s) var(--space-l);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: var(--space-s) auto;
  width: calc(100% - 2 * var(--space-l));
}

.select-input-container > div {
  width: 100%;
  box-shadow: var(--box-shadow-on-light-bck-light);
  margin-top: var(--space-xxs);
}

.select-input-wrapper {
  border: 1px solid var(--neutral-7);
  border-radius: var(--border-radius-m);
  color: var(--neutral-1);
  background-color: transparent;
  box-shadow: var(--box-shadow-input-inset),
    var(--box-shadow-on-light-bck-light);
  position: relative;
  text-align: left;
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  z-index: 990;
}

.select-input-wrapper .selection-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.open .select-input-wrapper {
  border-radius: var(--border-radius-m) var(--border-radius-m) 0 0;
  border-bottom: 1px solid var(--neutral-8);
}

.select-input-wrapper [type="text"] {
  border: none;
  width: inherit;
  box-shadow: none;
  padding-right: 0;
}
.select-input-wrapper i {
  background: var(--neutral-9);
  top: 0;
  right: 0;
  border-radius: 0 var(--border-radius-m) var(--border-radius-m) 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--space-xs) var(--space-s);
  font-size: 15px;
  border-left: var(--space-xxs) solid var(--neutral-10);
  cursor: pointer;
}
.open .select-input-wrapper i {
  background: transparent;
  font-size: 12px;
  color: var(--neutral-6);
  margin-top: 2px;
  border-left: none;
  padding: var(--space-xs) var(--space-s);
}
.select-input-options {
  max-height: 0;
  transition: var(--transition-slow) all ease-in-out;
}
.open .select-input-options {
  position: absolute;
  width: 100%;
  z-index: 991;
  background-color: var(--neutral-10);
  max-height: 50vh;
}

@keyframes overflowShown {
  from {
    overflow: hidden;
  }
  99% {
    overflow: hidden;
  }
  to {
    overflow: auto;
  }
}

.select-input-options ul {
  overflow: hidden;
  max-height: 0;
  box-shadow: var(--box-shadow-on-light-bck-light);
  list-style: none;
  border-radius: 0 0 var(--border-radius-m) var(--border-radius-m);
  font-size: 13px;
  color: var(--neutral-3);
  transition: var(--transition-slow) all ease-in-out;
  transition-property: max-height, overflow;
}

.open .select-input-options ul {
  max-height: 50vh;
  overflow: auto;
  animation-name: overflowShown;
  animation-duration: var(--transition-slow);
  border: 1px solid var(--neutral-7);
  border-top: none;
}
.select-input-options ul li {
  padding: var(--space-xxs) calc(var(--space-m) - 5px);
  cursor: pointer;
  border-left: 5px solid transparent;
  transition: var(--transition-fast) all ease;
}

.select-input-options ul li.active {
  background: var(--primary-10);
  border-left: 5px solid var(--primary-6);
}

.select-input-options ul li:hover {
  background: var(--neutral-9);
  border-left: 5px solid var(--primary-4);
}

.select-input-divider {
  height: 1px;
  background: var(--neutral-8);
  width: 100%;
  margin: var(--space-xxs) 0;
}
</style>
