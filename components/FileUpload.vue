<script setup>
const isDragging = ref(false)
const fileInfo = ref(null)

const handleDragEnter = () => {
    isDragging.value = true
}

const handleDragLeave = () => {
    isDragging.value = false
}

const handleDrop = (e) => {
    isDragging.value = false
    const file = e.dataTransfer.files[0]
    if (file) {
        handleFile(file)
    }
}

const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
        handleFile(file)
    }
}

const handleFile = (file) => {
    fileInfo.value = {
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type || 'tidak diketahui'
    }

    // Emit event untuk parent component
    emit('file-selected', file)
}

const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Define emits
const emit = defineEmits(['file-selected'])
</script>

<template>
    <div>
        <div class="p-8 border-2 border-dashed rounded w-full flex justify-center items-center flex-col text-center transition duration-300 ease-in-out"
            :class="{ 'border-secondary': isDragging }" @dragenter.prevent="handleDragEnter"
            @dragleave.prevent="handleDragLeave" @dragover.prevent @drop.prevent="handleDrop">
            <a href="#" class="rounded-full bg-gray-200 p-4" @click="$refs.fileInput.click()">
                <IconUpload size="24" />
            </a>
            <div class="text-sm mt-4">Drag & drop file disini atau pilih file</div>
            <input type="file" ref="fileInput" @change="handleFileChange" hidden>
        </div>

        <div v-if="fileInfo" class="preview">
            <div class="file-info">
                <strong>File terupload:</strong><br>
                Nama: {{ fileInfo.name }}<br>
                Ukuran: {{ fileInfo.size }}<br>
                Tipe: {{ fileInfo.type }}
            </div>
        </div>
    </div>
</template>


<style scoped>
.drop-zone {
    /* width: 300px; */
    height: 200px;
    /* border: 2px dashed #ccc; */
    /* border-radius: 8px; */
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: center; */
    /* flex-direction: column; */
    /* padding: 20px; */
    /* text-align: center; */
    /* margin: 20px auto; */
    transition: border .3s ease;
}

.drop-zone.dragover {
    border-color: #000;
    background: #f0f0f0;
}

.drop-zone p {
    margin: 0;
    color: #666;
}

.preview {
    margin-top: 20px;
}

.file-info {
    margin-top: 10px;
    font-size: 14px;
}

button {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #45a049;
}
</style>