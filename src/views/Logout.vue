<template>
    <div class="container">
        <div v-if="!loading" class="text-success text-center">
            {{$i18n('logout.success')}}
        </div>
        <div v-else-if="error" class="text-danger text-center">
            {{error}}
        </div>
        <Loader v-else/>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import Loader from '@/components/Loader.vue';
import ApiService from '@/impl/services/ApiService';
import {MutationsTypes} from '@/store/mutations';
import {BASE_MENU} from '@/store/state';

@Options({
    components: {
        Loader
    }
})
export default class Logout extends Vue {
    private loading = true;
    private error = '';

    created() {
        if(this.$store.state.token === null) {
            this.error = this.$i18n('logout.notLogged');
        } else {
            ApiService.logoutUser(this.$store.state.token).then(() => {
                this.$store.commit(MutationsTypes.REMOVE_USER);
                this.$store.commit(MutationsTypes.REMOVE_TOKEN);
                this.$store.commit(MutationsTypes.SET_MENU, BASE_MENU);
                this.loading = false;
            }).catch(e => {
                this.error = e;
            });
        }
    }
}
</script>

<style scoped>

</style>