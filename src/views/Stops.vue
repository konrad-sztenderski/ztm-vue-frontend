<template>
    <div class="container">
        <div v-if="success" class="text-success m-2">
            {{success}}
        </div>
        <div v-if="error" class="text-danger m-2">
            {{error}}
        </div>
        <StopsTable v-if="!loading" :stops="stops">
            <template #default="{row}">
                <span @click="(e) => {
                    e.stopPropagation();
                    addToFavourites(row.stopId)
                }" class="cursor-pointer text-info font-weight-bold">{{$i18n('table.add')}}
                </span>
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
    private success = '';
    private error = '';
    private loading = true;
    private stops!: Stop[];

    created() {
        ApiService.getStops().then(stops => {
            this.stops = stops;
            this.loading = false;
        });
    }

    addToFavourites(stopId: number) {
        ApiService.addFavourites(this.$store.state.token ?? '', stopId).then(() => {
            this.success = `${this.$i18n('table.success.add')} ${stopId}`;
            this.error = '';
        }).catch(e => {
            this.error = e;
            this.success = '';
        })
    }
}
</script>

<style scoped>

</style>