export default defineNuxtRouteMiddleware((to, from) => {
    const cookie = useCookie('token')

    if (to.path === '/login') {
        return
    }

    if (!cookie.value) {
        return navigateTo('/login')
    }
})