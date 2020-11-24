import {TOKEN, USER} from '@/store/LocalStorageKeys';

export type Menu = {
    href: string
    content: string
}

export type State = {
    menu: Menu[]
    user: string | null
    token: string | null
}

export const BASE_MENU: Menu[] = [{
    href: '/',
    content: 'menu.main'
}, {
    href: '/login',
    content: 'menu.login'
}, {
    href: '/register',
    content: 'menu.register'
}];

export const LOGGED_MENU: Menu[] = [{
    href: '/',
    content: 'menu.main'
}, {
    href: '/favourites',
    content: 'menu.favourites'
}, {
    href: '/logout',
    content: 'menu.logout'
}];

export const state: State = {
    menu: localStorage.getItem(TOKEN) ? LOGGED_MENU : BASE_MENU,
    user: localStorage.getItem(USER),
    token: localStorage.getItem(TOKEN),
}