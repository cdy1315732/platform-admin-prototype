import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import '@platform/tokens/theme.css';
import '@platform/components/styles.css';
import { createApp } from 'vue';
import App from './App.vue';
import './styles.css';

createApp(App).use(ArcoVue).mount('#app');
