import {createApp} from 'vue';
// @ts-ignore
import {createStore} from 'vuex';
import i18nPlugin from '@/i18n/i18n'

import 'jquery'
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap/dist/css/bootstrap.css'

import App from '@/App.vue';
import router from '@/router';
import i18nStrings from '@/i18n';

const app = createApp(App)
    .use(router)
    .use(i18nPlugin, {
        locale: window.navigator.language,
        strings: i18nStrings
    })
    .use(createStore({}));

app.mount('#app');