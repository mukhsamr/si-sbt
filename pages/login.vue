<script setup lang="ts">

//======= Variables
const validation = ref(null)
const formLogin = reactive({
    _loading: false,
    username: null,
    password: null,
})



//======= Local Methods
const _setToken = (token: string) => {
    const cookie = useCookie('token')
    cookie.value = token
}


//======= Fetch
const submitFormLogin = async () => {
    formLogin._loading = true
    const { data, success } = await authService.login(formLogin)

    if (success) {
        _setToken(data.token)
        navigateTo('/')
    }
    if (!success) {
        const { message } = data
        validation.value = message
    }

    formLogin._loading = false
}




definePageMeta({
    layout: false
})
</script>

<template>
    <Title>Login</Title>
    <div class="flex justify-center bg-neutral h-svh">
        <form @submit.prevent="submitFormLogin" class="bg-white shadow rounded p-4 h-64 max-h-fit min-w-96 mt-40">
            <h3 class="text-2xl font-semibold mb-4">SBT</h3>
            <div class="space-y-2">
                <Input class="w-full" v-model="formLogin.username" id="username" placeholder="Username" required />
                <Input class="w-full" v-model="formLogin.password" id="password" placeholder="Password" type="password"
                    required />
                <span class="text-xs text-danger-dark">{{ validation }}</span>
            </div>
            <Button class="mt-4 w-full justify-center" type="submit" :loading="formLogin._loading">Login</Button>
        </form>
    </div>
</template>