<template>
    <div class="container">
        <h1>{{$i18n('menu.register')}}</h1>
        <div v-if="error" class="text-danger">
            {{error}}
        </div>
        <div v-if="success" class="text-success">
            {{success}}
        </div>
        <Form @sendForm="submitLogin"/>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import Form, {FormInputs} from '@/components/Form.vue';
import ApiService from '@/impl/services/ApiService';

@Options({
    components: {
        Form
    }
})
export default class Login extends Vue {
    private error = '';
    private success = '';

    submitLogin(inputs: FormInputs) {
        ApiService.registerUser(inputs.login, inputs.password).then(() => {
            this.success = this.$i18n('register.success');
            this.error = '';
        }).catch(e => {
            this.error = e;
            this.success = '';
        });
    }
}
</script>

<style scoped>

</style>