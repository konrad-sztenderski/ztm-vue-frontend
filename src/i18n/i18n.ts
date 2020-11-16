import {App} from '@vue/runtime-core';

interface Strings {
    [key: string]: string | Strings
}

interface Options {
    locale: string
    strings: Strings
}

export default {
    install: (app: App, options: Options) => {
        app.config.globalProperties.$i18n = (key: string) => {
            return key.split('.')
                .reduce((o, i) => {
                    if(o) {
                        // @ts-ignore
                        return o[i];
                    }
                }, options.strings[options.locale] ?? options.strings[Object.keys(options.strings)[0]])
        }

        app.provide('i18n', options)
    }
}