<script setup>

const props = defineProps({
    uid: String,
    title: String,
    isForm: Boolean,
    action: {
        type: Function,
        default: () => { }
    }
})

</script>

<template>
    <div :id="uid"
        class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none">
        <div
            class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
            <component @submit.prevent="action" :is="isForm ? 'form' : 'div'">
                <div class="flex flex-col bg-white border shadow-sm rounded pointer-events-auto">
                    <div class="flex justify-between items-center py-3 px-4 border-b">
                        <h3 class="font-semibold text-gray-800">
                            {{ title }}
                        </h3>
                        <button type="button"
                            class="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                            :data-hs-overlay="`#${uid}`">
                            <span class="sr-only">Close</span>
                            <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="p-4 overflow-y-auto">
                        <slot name="body" />
                    </div>
                    <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                        <slot name="footer" />
                    </div>
                </div>
            </component>
        </div>
    </div>
</template>