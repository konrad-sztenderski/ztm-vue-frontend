<template>
    <form @submit="onSubmit">
        <div class="form-group">
            <label for="login">{{$i18n('form.login')}}</label>
            <input v-model="login" type="text" class="form-control" id="login" :placeholder="$i18n('form.login')">
        </div>
        <div class="form-group">
            <label for="password">{{$i18n('form.password')}}</label>
            <input v-model="password" type="password" class="form-control" id="password"
                   :placeholder="$i18n('form.password')">
        </div>
        <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary">{{$i18n('form.submit')}}</button>
        </div>
    </form>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import {Emit} from 'vue-property-decorator';

export type FormInputs = {
    login: string
    password: string
}

export default class Form extends Vue {
    private login: string = '';
    private password: string = '';

    @Emit('sendForm')
    onSubmit(e: Event): FormInputs {
        e.preventDefault();

        return {
            login: this.login,
            password: this.password
        };
    }
}
</script>

<style scoped>

</style>