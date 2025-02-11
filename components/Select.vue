<script setup>
const model = defineModel()
</script>

<template>
    <div class="relative flex items-center w-fit">
        <div class="absolute left-2" v-if="$slots.icon">
            <slot name="icon"></slot>
        </div>
        <select v-model="model" :class="{ 'pl-10': $slots.icon }"
            class="py-2 px-3 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-tertiary focus:ring-tertiary disabled:opacity-50 disabled:pointer-events-none">
            <slot>
                <option disabled>-</option>
            </slot>
        </select>
    </div>
</template>