<template>
    <div class="container">
        <StopsTable v-if="!loading" :stops="stops">
            <template #default="{row}">
                tak {{row.stopId}}
            </template>
        </StopsTable>
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
export default class Stops extends Vue {
    private loading = true;
    private stops!: Stop[];

    created() {
        ApiService.getStops().then(stops => {
            this.stops = stops;
            this.loading = false;
        });
    }
}
</script>

<style scoped>

</style>