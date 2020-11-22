<template>
    <table class="table">
        <thead>
        <tr>
            <th v-for="(header, idx) of headers" :key="idx" scope="col">{{ header }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(row, idx) of rows" :key="idx">
            <td v-for="(cell, key) in row" :key="key">
                <slot :name="key" :cell="cell"/>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import {Prop} from 'vue-property-decorator'
import {Vue} from 'vue-class-component';

export default class Table extends Vue {
    @Prop() readonly headers!: string[];
    @Prop() readonly rows!: { [key: string]: any }[];
}
</script>

<style scoped>

</style>