<template>
    <Menu/>
    <router-view/>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import Menu from '@/components/Menu.vue';
import ApiService from '@/impl/services/ApiService';
import {MutationsTypes} from '@/store/mutations';
import {BASE_MENU} from '@/store/state';

@Options({
    components: {
        Menu
    }
})
export default class App extends Vue {
    created() {
        if(this.$store.state.token !== null) {
            ApiService.isAuthorized(this.$store.state.token).catch(() => {
                this.$store.commit(MutationsTypes.REMOVE_USER);
                this.$store.commit(MutationsTypes.REMOVE_TOKEN);
                this.$store.commit(MutationsTypes.SET_MENU, BASE_MENU);
            });
        }
    }
}
</script>
