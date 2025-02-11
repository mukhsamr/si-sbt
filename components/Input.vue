<script setup>
const props = defineProps({
    id: String,
    validation: {
        type: Array,
        default: () => []
    }
})

const uid = props.id || useUniqueId('inp-')
const model = defineModel()


defineOptions({
    inheritAttrs: false
})
</script>

<template>
    <div>
        <input v-bind="$attrs" v-model="model" :id="uid"
            class="py-2 px-3 block w-full border-secondary/30 shadow-sm rounded text-sm focus:z-10 focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none">
        <span class="text-xs text-red-500">{{ validation.toString() }}</span>
    </div>
</template>