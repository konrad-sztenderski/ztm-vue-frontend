<template>
  <HelloWorld/>
</template>

<script>
import {Options, Vue} from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue';

@Options({
  components: {
    HelloWorld
  }
})
export default class Favourites extends Vue {
}
</script>

<style scoped>

</style>