import Vue from 'vue' 
import VueQrcodeReader from "vue-qrcode-reader";

Vue.component('qrcode-stream', VueQrcodeReader);
Vue.use(VueQrcodeReader);
