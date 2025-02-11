<script setup>

const props = defineProps({
    uid: String,
    title: String,
})

</script>

<template>
    <div :id="uid"
        class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
        role="dialog" tabindex="-1" aria-labelledby="hs-vertically-centered-modal-label">
        <div
            class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
            <div class="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
                <div class="p-4 overflow-y-auto">
                    <slot name="body" />
                </div>
                <div class="flex justify-center items-center gap-x-2 py-3 px-4">
                    <slot name="footer" />
                </div>
            </div>
        </div>
    </div>
</template>