<template>
    <div class="container">
        <StopsTable v-if="!loading" :stops="stops">
            <template #default="{row}">
                tak {{row.stopId}}
            </template>
        </StopsTable>
        <div v-else-if="error" class="text-danger text-center">
            {{error}}
        </div>
        <Loader v-else/>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import StopsTable from '@/components/table/StopsTable.vue';
import {Stop} from '@/impl/services/ApiTypes';
import ApiService from '@/impl/services/ApiService';
import Loader from '@/components/Loader.vue';

@Options({
    components: {StopsTable, Loader}
})
export default class Favourites extends Vue {
    private loading = true;
    private stops!: Stop[];
    private error: string = '';

    created() {
        ApiService.getFavourites().then(stops => {
            this.stops = stops;
            this.loading = false;
        }).catch(e => {
            this.error = e;
        });
    }
}
</script>

<style scoped>

</style>