<template>
    <Menu/>
    <router-view/>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import Menu from '@/components/Menu.vue';

@Options({
    components: {
        Menu
    }
})
export default class App extends Vue {
}
</script>
