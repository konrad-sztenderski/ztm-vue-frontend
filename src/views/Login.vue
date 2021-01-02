<template>
    <div class="container">
        <h1>{{$i18n('menu.login')}}</h1>
        <div v-if="error" class="text-danger">
            {{error}}
        </div>
        <Form @sendForm="submitLogin"/>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import Form, {FormInputs} from '@/components/Form.vue';
import ApiService from '@/impl/services/ApiService';
import {MutationsTypes} from '@/store/mutations';
import {LOGGED_MENU} from '@/store/state';

@Options({
    components: {
        Form
    }
})
export default class Login extends Vue {
    private error = '';

    submitLogin(inputs: FormInputs) {
        ApiService.loginUser(inputs.login, inputs.password).then(token => {
            this.$store.commit(MutationsTypes.SET_TOKEN, token);
            this.$store.commit(MutationsTypes.SET_USER, inputs.login);
            this.$store.commit(MutationsTypes.SET_MENU, LOGGED_MENU);
            this.$router.push('/favourites');
        }).catch(e => {
            this.error = e;
        });
    }
}
</script>

<style scoped>

</style>