<template>
    <div class="container">
        <Table :headers="table.headers" :rows="table.data">
            <template #id="{cell}">{{ cell }}</template>
            <template #name="{cell}">{{ cell }}</template>
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
    private readonly table = {
        headers: ['test', 'siema'],
        data: [{
            id: 1,
            name: 'wow'
        }]
    }
}
</script>

<style scoped>

</style>