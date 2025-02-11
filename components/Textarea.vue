<script setup lang="ts">

const props = defineProps({
    id: String
})
const uid = props.id || useUniqueId('text-')
const model = defineModel<string>()

</script>

<template>
    <textarea :id="uid" v-model="model"
        class="py-3 px-4 block w-full border-secondary/30 rounded text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none"
        rows="3">

    </textarea>
</template>