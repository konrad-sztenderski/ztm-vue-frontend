<template>
    <nav>
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="{disabled: currPage === 1}">
                <router-link class="page-link" :to="{query: {page: 1}}" append :event="prevPage ? 'click' : ''">
                    First
                </router-link>
            </li>
            <li v-for="i in range(this.start, this.end)" class="page-item" :class="{'active': i === currPage}" :key="i">
                <span v-if="i === currPage" class="page-link">
                    {{i}}
                    <span class="sr-only">(current)</span>
                </span>
                <router-link v-else class="page-link" :to="{query: {page: i}}" append>
                    {{i}}
                </router-link>
            </li>
            <li class="page-item" :class="{disabled: currPage === lastPage}">
                <router-link class="page-link" :to="{query: {page: lastPage}}" append :event="lastPage ? 'click' : ''">
                    Last
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

export default class Pagination extends Vue {
    @Prop() readonly lastPage!: number;
    @Prop() readonly currPage!: number;
    @Prop({default: 2}) readonly radius!: number;

    private start!: number;
    private end!: number;
    private prevPage!: number;
    private nextPage!: number;

    created() {
        this.start = Math.max(this.currPage - this.radius, 1);
        this.end = Math.min(this.currPage + this.radius, this.lastPage);
        this.prevPage = this.currPage - 1 > 0 ? this.currPage - 1 : 0;
        this.nextPage = this.currPage + 1 <= this.lastPage ? this.currPage + 1 : 0;
    }

    private range(a: number, b: number): number[] {
        let r = [];
        for(let i = a; i <= b; i++) {
            r.push(i);
        }
        return r;
    }
}
</script>

<style scoped>

</style>