<template>
    <div class="container">
        <h1>{{$i18n('menu.register')}}</h1>
        <Form @sendForm="submitRegister"/>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import Form, {FormInputs} from '@/components/Form.vue';

@Options({
    components: {
        Form
    }
})
export default class Register extends Vue {

    submitRegister(inputs: FormInputs) {
        console.log(inputs);
    }
}
</script>

<style scoped>

</style>