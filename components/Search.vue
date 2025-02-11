<script setup>
const props = defineProps({
    placeholder: String,
    id: {
        type: String,
        default: 'search',
    },
})

const clearText = () => {
    model.value = ''
}

const model = defineModel()

</script>

<template>
    <div class="relative max-w-xs">
        <label for="search" class="sr-only">Search</label>
        <Input :id="id" v-model="model" type="search" class="pl-10" :placeholder="placeholder" />
        <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
            <IconSearch size="16" class="text-gray-400" />
        </div>
    </div>
</template>