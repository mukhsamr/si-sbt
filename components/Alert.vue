<script setup lang="ts">

const props = defineProps({
    delay: Number
})

const color = ref('')
const message = ref('')
const display = ref(false)

const colors = {
    success: 'border-s-4 border-green-800 bg-green-50',
    danger: 'border-s-4 border-red-800 bg-red-50',
    info: 'border-s-4 border-primary bg-tertiary/50',
}
const iconColor = {
    success: 'border-green-100 bg-green-200 text-green-800',
    danger: 'border-red-100 bg-red-200 text-red-800',
    info: 'border-tertiary bg-secondary/80 text-primary',
}

const show = (data) => {
    color.value = data.type
    message.value = data.message
    display.value = true

    setTimeout(() => {
        display.value = false
    }, props.delay || 5000)
}

defineExpose({ show })
</script>

<template>
    <div class="p-4 my-2" :class="{ [colors[color]]: true, 'hidden': !display }" role="alert" tabindex="-1"
        aria-labelledby="hs-bordered-red-style-label">
        <div class="flex">
            <div class="shrink-0">
                <span class="inline-flex justify-center items-center size-8 rounded-full border-4"
                    :class="iconColor[color]">

                    <template v-if="color === 'success'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="size-4">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l5 5l10 -10" />
                        </svg>
                    </template>
                    <template v-if="color === 'danger'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="size-4">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M18 6l-12 12" />
                            <path d="M6 6l12 12" />
                        </svg>
                    </template>
                    <template v-if="color === 'info'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="size-6">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 9h.01" />
                            <path d="M11 12h1v4h1" />
                        </svg>
                    </template>
                </span>
            </div>
            <div class="ms-3">
                <h3 id="hs-bordered-red-style-label" class="text-gray-800 font-semibold">
                    <template v-if="color === 'success'">Success</template>
                    <template v-else-if="color === 'danger'">Error</template>
                    <template v-else-if="color === 'info'">Info</template>
                </h3>
                <p class="text-sm text-gray-700">
                    {{ message }}
                </p>
            </div>
        </div>
    </div>
</template>