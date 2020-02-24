<template>
  <div class="select-input-container" v-if="show">
    <h5 class="form-question">{{ title }}</h5>
    <div v-bind:class="{ open: open }">
      <div class="select-input-wrapper">
        <div class="selection-box">
          <text-input
            :placeholder="'Buscar'"
            :hideText="true"
            :noBorder="true"
            :noShadows="true"
            :leaveSpaceRight="true"
            :value="copySelected.title"
            :status="textStatus"
            v-on:keypress="search($event)"
            v-on:keypress.delete="search($event)"
            v-on:focus="toogleOpen(true, true)"
            v-on:blur="toogleOpen(false)"
            v-on:esc="toogleOpen(false)"
          ></text-input>
          <i class="fas fa-times" v-if="open" @click="changeOption({}, false)"></i>
          <i class="fas fa-angle-down" v-if="!open" @click="toogleOpen(true)"></i>
        </div>
      </div>
      <div class="select-input-options">
        <ul>
          <div v-for="(optionSection, index) in copyOptions" :key="index">
            <li
              v-for="option in optionSection"
              :class="{ active: option.id === copySelected.id }"
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
import { Component, Prop, Vue, Watch } from "nuxt-property-decorator";
import Fuse from "fuse.js";
import {
  OptionSelected,
  StatusOnInput,
  InputValueType,
  SelectInputValueType,
  Indexes
} from "../../../types/components";
import { TicketModule } from "../../../store/ticket";

@Component({})
export default class SelectInput extends Vue {
  @Prop({ type: String, required: true }) readonly title!: string;
  @Prop({ type: Array, required: true }) readonly options!: OptionSelected[][];
  @Prop({ type: String, required: true })
  readonly selected!: SelectInputValueType;
  @Prop({ type: String, required: true })
  readonly oldSelected!: SelectInputValueType;
  @Prop({ type: Boolean, default: false }) readonly open!: boolean;
  @Prop({ type: Boolean, default: false }) readonly show!: boolean;
  textStatus: StatusOnInput = {
    status: "",
    statusDetail: { message: "", abbreviation: "" }
  };
  @Prop({
    default: (): Indexes => {
      return { section: 0, input: 0 };
    }
  })
  readonly indexes!: Indexes;
  copyOptions: OptionSelected[][] = this.options;
  copySelected: OptionSelected = this.getSelectedById(this.selected);

  @Watch("options", { deep: true, immediate: true })
  onOptionsChanged(value: OptionSelected[][], oldValue: OptionSelected[][]) {
    this.copyOptions = value;
  }

  getSelectedById(id: string): OptionSelected {
    // @ts-ignore
    return this.options.flat().find(e => e.id === id) || { title: "", id: "" };
  }

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
    this.updateProperty("open", true);
    const options = this.options;
    // @ts-ignore: It ignores the error caused by the flat()
    const fuse = new Fuse(options.flat(), this.fuseOptions);
    const result = fuse.search(e.target.value);
    this.copyOptions = [[]];
    result.forEach(r => {
      let _r: any = r;
      this.copyOptions[0].push({ title: _r.item.title, id: _r.item.id });
    });
  }

  changeOption(option: OptionSelected) {
    this.updateInput("selected", option.id);
    this.copySelected = option;
    setTimeout(() => {
      this.updateProperty("open", false);
    }, 10);
    setTimeout(() => {
      this.copyOptions = this.options;
    }, 500);
  }

  toogleOpen(v: boolean, shouldClear: boolean = false) {
    if (!v) {
      this.updateProperty("selected", this.oldSelected);
    }
    this.updateProperty("open", v);
    if (shouldClear) {
      this.updateProperty("oldSelected", this.selected);
      this.updateProperty("selected", this.selected);
    }
  }

  updateInput(key: string, value: InputValueType) {
    TicketModule.updateInput({ key, value, indexes: this.indexes });
  }

  updateProperty(key: string, value: any) {
    TicketModule.updateProperty({ key, value, indexes: this.indexes });
  }
}
</script>

<style scoped>
.text-input-container {
  margin: 0;
  width: 100%;
}

.select-input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
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
  position: absolute;
  z-index: 991;
  background-color: var(--neutral-10);
}
.open .select-input-options {
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
