<script setup lang="ts" generic="T extends any">

const props = withDefaults(
    defineProps<{
        id?: string,
        placeholder?: string,
        items: T[],
        search: Array<string>
    }>(), {
    id: 'search',
    placeholder: 'Cari',
})

const model = defineModel<string>()
const showBox = ref(false)
const activeList = ref(0)
const filteredItems = ref(props.items)
const emit = defineEmits(['getItem'])

watch(model, (item) => {
    showBox.value = item ? true : false

    if (item) {
        filteredItems.value = props.items.filter((val: any) => {
            return props.search.some((attr) => {
                const param = val[attr]
                return param?.toLowerCase().includes(item.toLowerCase())
            })
        })
    }
})

const selectList = (event: { key: string; preventDefault: () => void; }) => {

    if (isEmpty(props.items)) {
        return
    }

    showBox.value = true
    const lists = document.querySelector('#box-' + props.id)?.childNodes as NodeListOf<HTMLElement>


    if (event.key === 'ArrowDown') {
        event.preventDefault()
        if (activeList.value < lists.length - 2) {
            activeList.value++
        }

        lists[activeList.value].focus()
    }

    if (event.key === 'ArrowUp') {
        event.preventDefault()
        if (activeList.value - 2 > -1) {
            activeList.value--
        }
        lists[activeList.value].focus()
    }
}
const onClick = (item: any) => {
    emit('getItem', item)
    showBox.value = false
    activeList.value = 0
}

</script>

<template>
    <div class="relative max-w-xs">
        <label for="search" class="sr-only">Search</label>
        <Input :id="id" v-model="model" type="search" class="pl-10" :placeholder="placeholder" @keydown="selectList"
            autocomplete="off" />
        <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
            <Icon name="tabler:search" />
        </div>

        <div class="scrollbar absolute min-w-40 max-w-96 border max-h-56 overflow-y-auto bg-white z-50 mt-2 shadow-md"
            :class="{ 'hidden': !showBox }" :id="'box-' + id">
            <button v-for="item in filteredItems" tabindex="0"
                class="block w-full text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none border-0 py-2 px-3"
                @click="onClick(item)" @keydown="selectList">
                <slot :item="item" />
            </button>
        </div>
    </div>
</template>