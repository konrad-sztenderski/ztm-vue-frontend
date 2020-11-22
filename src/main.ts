import {createApp} from 'vue';
import i18nPlugin from '@/i18n/i18nPlugin'

import 'jquery'
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap/dist/css/bootstrap.css'

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import i18nStrings from '@/i18n';

const app = createApp(App)
    .use(router)
    .use(store)
    .use(i18nPlugin, {
        locale: window.navigator.language,
        strings: i18nStrings
    });

app.mount('#app');