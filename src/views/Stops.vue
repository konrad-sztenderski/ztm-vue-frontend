<template>
    <div class="container">
        <Table v-if="!loading" :key="tableKey" :headers="table.headers" :rows="table.data" :rowsKeys="table.rowsKeys"
               :startIdx="(this.currPage.value - 1) * 10">
            <template #stopId="{cell}">{{cell}}</template>
            <template #stopName="{cell}">{{cell}}</template>
            <template #zoneName="{cell}">{{cell}}</template>
            <template #stopLat="{cell}">{{cell}}</template>
            <template #stopLon="{cell}">{{cell}}</template>
        </Table>
        <Loader v-else/>
        <Pagination v-if="!loading" :key="paginationKey" :lastPage="lastPage.value" :currPage="currPage.value"/>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import Table, {TableHeader} from '@/components/Table.vue';
import ApiService from '@/impl/services/ApiService';
import {Stop} from '@/impl/services/ApiTypes';
import Loader from '@/components/Loader.vue';
import Pagination from '@/components/Pagination.vue';
import {reactive} from 'vue';
import {Watch} from 'vue-property-decorator';

@Options({
    components: {Table, Loader, Pagination}
})
export default class Stops extends Vue {
    private table: {
        headers: TableHeader<Stop>[],
        rowsKeys: string[],
        data: Stop[]
    } = {
        headers: [],
        rowsKeys: [],
        data: []
    }
    private readonly MAX_ROW = 10;
    private loading = true;
    private paginationKey = 0;
    private tableKey = 0;
    private lastPage = reactive({value: this.MAX_ROW});
    private currPage = reactive({value: 1});

    created() {
        this.currPage.value = parseInt(this.$route.query.page as string);

        ApiService.getStops().then(stops => {
            this.table = {
                headers: [{
                    value: this.$i18n('stops.table.stopId'),
                    sort: (a: Stop, b: Stop) => a.stopId - b.stopId
                }, {
                    value: this.$i18n('stops.table.stopName'),
                    sort: (a: Stop, b: Stop): number => {
                        if(a.stopName === null) return -1;
                        if(b.stopName === null) return 1;

                        return a.stopName.localeCompare(b.stopName);
                    }
                }, {
                    value: this.$i18n('stops.table.zoneName'),
                    sort: (a: Stop, b: Stop): number => {
                        if(a.zoneName === null) return -1;
                        if(b.zoneName === null) return 1;

                        return a.zoneName.localeCompare(b.zoneName);
                    }
                }, {
                    value: this.$i18n('stops.table.stopLat'),
                    sort: (a: Stop, b: Stop) => a.stopLat - b.stopLat
                }, {
                    value: this.$i18n('stops.table.stopLon'),
                    sort: (a: Stop, b: Stop) => a.stopLon - b.stopLon
                }],
                rowsKeys: ['stopId', 'stopName', 'zoneName', 'stopLat', 'stopLon'],
                data: stops
            }

            this.lastPage.value = Math.ceil(this.table.data.length / this.MAX_ROW);
        }).catch(e => console.log(e)).finally(() => this.loading = false);
    }

    @Watch('$route.query.page', {immediate: true, deep: true})
    onPageChange() {
        this.currPage.value = parseInt(this.$route.query.page as string);
        ++this.paginationKey;
        ++this.tableKey;
    }
}
</script>

<style scoped>

</style>