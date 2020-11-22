<template>
    <div id="nav" class="d-flex justify-content-center">
        <router-link v-for="link of $store.state.menu" :key="link.href" :to="link.href" class="m-2">
            {{ $i18n(link.content) }}
        </router-link>
    </div>
</template>
<script lang="ts">
import {Vue} from 'vue-class-component';

export default class Menu extends Vue {

}
</script>

<style scoped>
#nav {
    padding:30px;
}

#nav a {
    font-weight:bold;
    color:#2c3e50;
}

#nav a.router-link-exact-active {
    color:#42b983;
}
</style>