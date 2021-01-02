import {createApp} from 'vue';

import App from '@/App.vue';
import router from '@/router';
import store, {Store} from '@/store';
import i18nStrings from '@/i18n';
import i18nPlugin from '@/i18n/i18nPlugin'

import 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap/dist/css/bootstrap.css';
import '@/assets/main.css';

import 'reflect-metadata';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: Store,
        $i18n: (key: string) => string
    }
}

const app = createApp(App)
    .use(router)
    .use(store)
    .use(i18nPlugin, {
        locale: window.navigator.language,
        strings: i18nStrings
    });

app.mount('#app');