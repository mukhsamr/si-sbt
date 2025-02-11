<script setup lang="ts">


//======= Variables
const token = useCookie('token')
const route = useRoute();
const breadcrumb: Ref<Breadcrumb[]> = ref([])



//======= Local Method
const _closeOverlay = () => {
    // @ts-ignore
    HSOverlay.close(document.querySelector('#sidebar'))
}
const _isActiveRoute = (name: string) => {
    return route.name === name
}
const _getBreadcrumb = () => {
    breadcrumb.value = route.meta.breadcrumb as Breadcrumb[]
}
watch(
    () => route.path,
    () => {
        _getBreadcrumb()
        _closeOverlay()
    }
);



//======= Fetch
const logout = async () => {
    const { success } = await authService.logout()

    if (success) {
        token.value = ''
        window.location.reload()
    }
}


//======= Hooks
onBeforeMount(() => {
    _getBreadcrumb()
})

</script>

<template>
    <header
        class="hidden lg:flex sticky top-0 inset-x-0 flex-wrap md:justify-start md:flex-nowrap z-[48] w-full bg-white border shadow py-4 lg:ps-[260px]">
        <nav class="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">

            <div class="w-full flex items-center justify-end ms-auto md:justify-between gap-x-1 md:gap-x-3">

                <div class="flex items-center lg:text-xl">
                    <template v-for="(item, index) in breadcrumb">
                        <NuxtLink class="text-gray-400 hover:text-gray-800" :to="item.path" v-if="item.path">
                            {{ item.label }}
                        </NuxtLink>
                        <span class="text-gray-800" v-else>{{ item.label }}</span>
                        <Icon name="tabler:chevron-right" size="20" v-if="index < breadcrumb.length - 1" />
                    </template>
                </div>

                <div class="flex flex-row items-center justify-end gap-1">

                </div>
            </div>
        </nav>
    </header>

    <div class="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden">
        <div class="flex items-center justify-between py-4">
            <div class="flex items-center lg:text-xl">
                <template v-for="(item, index) in breadcrumb">
                    <NuxtLink class="text-gray-400 hover:text-gray-800" :to="item.path" v-if="item.path">
                        {{ item.label }}
                    </NuxtLink>
                    <span class="text-gray-800" v-else>{{ item.label }}</span>
                    <Icon name="tabler:chevron-right" size="20" v-if="index < breadcrumb.length - 1" />
                </template>
            </div>

            <button type="button" data-hs-overlay="#sidebar" aria-controls="sidebar" aria-label="Toggle navigation">
                <span class="sr-only">Toggle Navigation</span>
                <Icon name="tabler:menu-2" size="24" />
            </button>
        </div>
    </div>

    <div id="sidebar"
        class="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-secondary-dark pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 ">
        <div class="px-6">
            <a class="flex-none text-xl font-semibold text-white" href="#" aria-label="Brand">SDT</a>
        </div>

        <nav class="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>

            <ul class="space-y-1.5">
                <li>
                    <NuxtLink to="/" class="nav-link" :class="{ 'bg-secondary': _isActiveRoute('index') }">
                        <Icon name="tabler:home" class="text-white" />
                        Dashboard
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/student/note" class="nav-link"
                        :class="{ 'bg-secondary': _isActiveRoute('student-note') }">
                        <Icon name="tabler:note" class="text-white" />
                        Catatan
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/student/plan" class="nav-link"
                        :class="{ 'bg-secondary': _isActiveRoute('student-plan') }">
                        <Icon name="tabler:target-arrow" class="text-white" />
                        Action Plan
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/student" class="nav-link"
                        :class="{ 'bg-secondary': _isActiveRoute('student-index') }">
                        <Icon name="tabler:users" class="text-white" />
                        Biodata Santri
                    </NuxtLink>
                </li>



                <div class="text-sm text-neutral-dark/80 truncate pt-4">My Space</div>
                <li>
                    <NuxtLink to="/note" class="nav-link" :class="{ 'bg-secondary': _isActiveRoute('note') }">
                        <Icon name="tabler:notes" class="text-white" />
                        Catatan Saya
                    </NuxtLink>
                </li>

            </ul>

            <Button color="danger" icon="tabler:logout" @click="logout" class="mt-8">Logout</Button>
        </nav>
    </div>

</template>

<style scoped>
.nav-link {
    @apply w-full flex items-center py-2 px-2.5 gap-3 text-sm text-white rounded hover:bg-secondary;
}
</style>