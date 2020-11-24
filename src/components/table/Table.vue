<template>
    <table class="table text-center">
        <thead>
        <tr>
            <th v-for="(header, idx) of headers" scope="col" class="cursor-pointer table-header" :key="idx"
                @click="() => sortData(header.sort, idx)">
                {{header.value}}
            </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(row, idx) of showData.value" :key="idx">
            <td v-for="key in colsKeys" :key="key">
                <slot :name="key" :cell="row[key] !== undefined ? row[key] : row"/>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import {Prop} from 'vue-property-decorator';
import {Vue} from 'vue-class-component';
import {reactive} from 'vue';

export type TableHeader<R> = {
    sort?: (a: R, b: R) => number
    value: string
}

export default class Table extends Vue {
    @Prop() readonly headers!: TableHeader<any>[];
    @Prop() readonly rows!: { [key: string]: any }[];
    @Prop() readonly colsKeys!: string[];
    @Prop({default: 10}) readonly maxRows!: number;
    @Prop({default: 0}) readonly startIdx!: number;

    private showData = reactive({value: []});
    private lastIdxSort = -1;
    private lastSort = 1;

    created() {
        this.showData.value = this.rows.slice(this.startIdx, this.startIdx + this.maxRows) as never[];
    }

    sortData(sort: undefined | ((a: any, b: any) => number), idx: number) {
        if(sort !== undefined) {
            if(this.lastIdxSort === idx) {
                this.lastSort = -1 * this.lastSort;
            }
            this.showData.value = this.rows.sort(((a, b) => sort(a, b) * this.lastSort)).slice(this.startIdx, this.startIdx + this.maxRows) as never[];
            this.lastIdxSort = idx;
        }
    }
}
</script>

<style scoped>
.table-header:hover {
    background:#42b983;
}
</style>