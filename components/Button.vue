<script setup>

const props = defineProps({
    color: {
        type: String,
        default: 'primary',
    },
    size: {
        type: String,
        default: 'md',
    },
    loading: {
        type: Boolean,
        default: false,
    },
    icon: {
        type: String,
    }
})

const colors = {
    primary: 'bg-primary border-secondary text-white enabled:hover:bg-primary-dark',
    secondary: 'bg-secondary border-transparent text-white enabled:hover:bg-secondary-dark',
    neutral: 'bg-neutral border-secondary text-secondary-dark enabled:hover:bg-neutral-dark',
    danger: 'bg-danger border-secondary text-white enabled:hover:bg-danger-dark',
}[props.color]

const size = {
    sm: 'py-1.5 px-2.5 text-xs',
    md: 'py-2.5 px-3 text-sm',
}[props.size]

</script>

<template>
    <button type="button" class="flex items-center rounded disabled:cursor-not-allowed disabled:opacity-50"
        :class="[colors, size].join(' ')" :disabled="loading">
        <div class="mr-3" v-if="loading">
            <div class="animate-spin size-4 border-2 border-current border-y-transparent rounded-full" role="status"
                aria-label="loading">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <Icon :name="icon" class="me-2" v-else-if="icon" />
        <slot />
    </button>
</template>