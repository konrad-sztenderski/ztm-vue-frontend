<template>
    <div class="container">
        <Table :headers="table.headers" :rows="table.data">
            <template #direction="{cell}">{{cell}}</template>
            <template #estimatedTime="{cell}">{{cell}}</template>
            <template #delay="{cell}">{{cell}}</template>
            <template #favourites="{cell}">
                <a :href="`#${cell}`">+</a>
            </template>
        </Table>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import Table from '@/components/Table.vue';

@Options({
    components: {Table}
})
export default class Stops extends Vue {
    private table!: {
        headers: string[],
        data: {
            direction: string,
            estimatedTime: string,
            delay: string,
            favourites: string,
        }[]
    }

    created() {
        this.table = {
            headers: [this.$i18n('stops.table.direction'), this.$i18n('stops.table.estimatedTime'), this.$i18n('stops.table.delay'), this.$i18n('stops.table.favourites')],
            data: [{
                direction: 'Oliwa',
                estimatedTime: '18:20',
                delay: '-52s',
                favourites: 'T201R12',
            }]
        }
    }
}
</script>

<style scoped>

</style>