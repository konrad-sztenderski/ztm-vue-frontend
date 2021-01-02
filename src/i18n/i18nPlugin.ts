import {App} from '@vue/runtime-core';

type Strings = {
    [key: string]: string | Strings
}

type Options = {
    locale: string
    strings: Strings
}

export default {
    install: (app: App, options: Options) => {
        app.config.globalProperties.$i18n = (key: string): string => {
            return key.split('.')
                .reduce((o, i): string | Strings => {
                    if(typeof o === 'object') {
                        return o[i];
                    } else if(o === 'string') {
                        return o;
                    }
                    return key;
                }, options.strings[options.locale] ?? options.strings[Object.keys(options.strings)[0]]) as string
        }

        app.provide('i18n', options)
    }
}