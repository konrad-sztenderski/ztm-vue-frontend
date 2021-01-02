<template>
    <div class="container">
        <Table v-if="!loading" :headers="table.headers" :rows="table.data" :colsKeys="table.colsKeys">
            <template #headsign="{cell}">{{cell}}</template>
            <template #routeId="{cell}">{{cell}}</template>
            <template #theoreticalTime="{cell}">{{cell}}</template>
            <template #delayInSeconds="{cell}">{{cell}}s</template>
            <template #estimatedTime="{cell}">{{cell}}</template>
        </Table>
        <div v-else-if="error" class="text-danger text-center">
            {{error}}
        </div>
        <Loader v-else/>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import ApiService, {ZTMDelay} from '@/impl/services/ApiService';
import Loader from '@/components/Loader.vue';
import Table from '@/components/table/Table.vue';

@Options({
    components: {
        Table,
        Loader
    }
})
export default class Stop extends Vue {
    private loading = true;
    private error = '';

    private table: {
        headers: any[],
        colsKeys: string[],
        data: ZTMDelay['delay']
    } = {
        headers: [],
        colsKeys: [],
        data: []
    }

    created() {
        if(this.$route.params.id) {
            ApiService.getStopInfo(parseInt(this.$route.params.id as string)).then(delays => {
                this.table = {
                    headers: [{
                        value: this.$i18n('stop.table.headsign'),
                        sort: (a: ZTMDelay['delay'][0], b: ZTMDelay['delay'][0]): number => {
                            return a.headsign.localeCompare(b.headsign);
                        }
                    }, {
                        value: this.$i18n('stop.table.routeId'),
                        sort: (a: ZTMDelay['delay'][0], b: ZTMDelay['delay'][0]) => a.routeId - b.routeId
                    }, {
                        value: this.$i18n('stop.table.theoreticalTime'),
                        sort: (a: ZTMDelay['delay'][0], b: ZTMDelay['delay'][0]): number => {
                            return a.theoreticalTime.localeCompare(b.theoreticalTime);
                        }
                    }, {
                        value: this.$i18n('stop.table.delayInSeconds'),
                        sort: (a: ZTMDelay['delay'][0], b: ZTMDelay['delay'][0]) => a.delayInSeconds - b.delayInSeconds
                    }, {
                        value: this.$i18n('stop.table.estimatedTime'),
                        sort: (a: ZTMDelay['delay'][0], b: ZTMDelay['delay'][0]): number => {
                            return a.estimatedTime.localeCompare(b.estimatedTime);
                        }
                    }],
                    colsKeys: ['headsign', 'routeId', 'theoreticalTime', 'delayInSeconds', 'estimatedTime'],
                    data: delays
                }
                this.loading = false;
            }).catch(e => {
                this.error = e;
            });
        } else {
            this.error = this.$i18n('stop.invalid');
        }
    }
}
</script>

<style>
.table-header {
    width:calc(100% * 1 / 5);
}
</style>