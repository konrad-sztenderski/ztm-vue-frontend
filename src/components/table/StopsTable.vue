<template>
    <div>
        <Table :key="tableKey" :headers="table.headers" :rows="table.data" :colsKeys="table.colsKeys"
               :startIdx="(this.currPage.value - 1) * 10">
            <template #stopId="{cell}">{{cell}}</template>
            <template #stopName="{cell}">{{cell}}</template>
            <template #zoneName="{cell}">{{cell}}</template>
            <template #stopLat="{cell}">{{cell}}</template>
            <template #stopLon="{cell}">{{cell}}</template>
            <template #operations="{cell}">
                <slot :row="cell"/>
            </template>
        </Table>
        <Pagination :key="paginationKey" :lastPage="lastPage.value" :currPage="currPage.value"/>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import Table, {TableHeader} from '@/components/table/Table.vue';
import {Stop} from '@/impl/services/ApiTypes';
import {reactive} from 'vue';
import {Prop, Watch} from 'vue-property-decorator';
import Loader from '@/components/Loader.vue';
import Pagination from '@/components/table/Pagination.vue';

@Options({
    components: {Table, Loader, Pagination}
})
export default class StopsTable extends Vue {
    @Prop() private readonly stops!: Stop[];

    private table: {
        headers: TableHeader<Stop>[],
        colsKeys: string[],
        data: Stop[]
    } = {
        headers: [],
        colsKeys: [],
        data: []
    }
    private readonly MAX_ROW = 10;
    private paginationKey = 0;
    private tableKey = 0;
    private lastPage = reactive({value: this.MAX_ROW});
    private currPage = reactive({value: 1});

    created() {
        this.currPage.value = parseInt(this.$route.query.page as string) || 1;

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
            }, {
                value: this.$i18n('stops.table.operations')
            }],
            colsKeys: ['stopId', 'stopName', 'zoneName', 'stopLat', 'stopLon', 'operations'],
            data: this.stops
        }

        this.lastPage.value = Math.ceil(this.table.data.length / this.MAX_ROW);
    }

    @Watch('$route.query.page', {immediate: true, deep: true})
    onPageChange() {
        this.currPage.value = parseInt(this.$route.query.page as string);
        ++this.paginationKey;
        ++this.tableKey;
    }
}
</script>

<style>
.table-header {
    width:calc(100% * 1 / 6);
}
</style>