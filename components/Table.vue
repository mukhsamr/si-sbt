<script setup>

const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    }
})

</script>

<template>
    <div class="border border-tertiary/50 rounded">
        <div class="p-4 border-b" v-if="$slots.panel">
            <slot name="panel" />
        </div>

        <div class="flex flex-col">
            <div class="overflow-x-auto">
                <div class="min-w-full inline-block align-middle">
                    <div class="overflow-hidden">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-secondary-dark">
                                <slot name="header" />
                            </thead>
                            <tbody class="divide-y divide-gray-200 relative [&_tr:hover]:bg-gray-100">
                                <template v-if="loading">
                                    <div
                                        class="absolute inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center">
                                        <div class="animate-spin inline-block size-8 border-[4px] border-current border-t-transparent text-secondary rounded-full"
                                            role="status" aria-label="loading">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                        <p class="text-sm text-gray-800 ml-4">Sedang mengambil data...</p>
                                    </div>
                                </template>
                                <slot name="body">
                                    <tr>
                                        <Td class="text-center text-gray-800 italic" colspan="99">Tidak ada data</Td>
                                    </tr>
                                </slot>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>