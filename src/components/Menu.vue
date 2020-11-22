<template>
    <div id="nav">
        <router-link v-for="link of this.$store.menu" :key="link.href" :to="link.href">{{ $i18n(link.content) }}
        </router-link>
    </div>
</template>
<script>
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