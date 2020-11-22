export type Menu = {
    href: string
    content: string
}

export type State = {
    menu: Menu[]
    username: string
}

export const BASE_MENU: Menu[] = [{
    href: '/',
    content: 'menu.main'
}, {
    href: '/login',
    content: 'menu.login'
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
    menu: BASE_MENU,
    username: '',
}