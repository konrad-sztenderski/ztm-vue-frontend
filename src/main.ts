import {createApp} from 'vue'
// @ts-ignore
import {createStore} from 'vuex'
import App from '@/App.vue';
import router from '@/router';

console.log(createStore)

const app = createApp(App)
    .use(router)
    .use(createStore({}));

app.mount('#app');