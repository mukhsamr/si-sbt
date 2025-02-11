<script setup lang="ts">


//======= Variables
const _loadingStudent: Ref<boolean> = ref(false)
const _loadingNote: Ref<boolean> = ref(false)
const _loadingNotes: Ref<boolean> = ref(false)

const studentList: Ref<StudentList[]> = ref([])
const student: Ref<Student> = ref({
    id: 0,
    name: '-',
    nickname: '-',
    age: 0,
    photo: null
})
const studentNotes: Ref<Note[]> = ref([])
const studentNote: Ref<Note> = ref({
    id: 0,
    note: '-',
    summary: '-',
    type: '-',
    author: '-',
    created_at: '_'
})
const formAddNote = ref({
    _loading: false,
    student_id: 0,
    note: '',
    type: ''
})





//======= Local Method
const _closeModal = (select: string) => {
    // @ts-ignore
    HSOverlay.close(select)
}
const _resetVariables = () => {
    student.value = {
        id: 0,
        name: '-',
        nickname: '-',
        age: 0,
        photo: null
    }
    studentNotes.value = []
    studentNote.value = {
        id: 0,
        note: '-',
        summary: '-',
        type: '-',
        author: '-',
        created_at: '_'
    }
}
const findStudent = async (item: StudentList) => {
    _resetVariables()
    await useStudentsList(item)
    await getStudent(item)
    await getNotes(item)
}
const getStudentsList = async () => {
    const { storage } = await useStudentsList()
    studentList.value = storage
}




//======= Fetch
const getStudent = async (item: StudentList) => {
    _loadingStudent.value = true
    const { data, success } = await studentService.show(item.id)
    if (success) {
        _loadingStudent.value = false

        if (!isEmpty(data.student)) {
            student.value = data.student
        }
    }
}
const getNotes = async (item: StudentList) => {
    _loadingNotes.value = true
    const { data, success } = await studentService.notes(item.id)
    if (success) {
        _loadingNotes.value = false

        if (!isEmpty(data.notes)) {
            studentNotes.value = data.notes
        }
    }
}
const getNote = async (item: Note) => {
    _loadingNote.value = true
    const { data, success } = await noteService.show(item.id)
    if (success) {
        _loadingNote.value = false

        if (!isEmpty(data.note)) {
            studentNote.value = data.note
        }
    }
}
const createNote = async () => {
    formAddNote.value._loading = true
    formAddNote.value.student_id = student.value.id
    const { success } = await noteService.store(formAddNote.value)
    if (success) {
        formAddNote.value._loading = true
        _closeModal('#add-note')
        await getNotes(student.value)
    }
}



//======= Hooks
onBeforeMount(async () => {
    await getStudentsList()
    const { selected } = await useStudentsList()
    if (!isEmpty(selected)) {
        await findStudent(selected)
    }
})



definePageMeta({
    breadcrumb: [
        {
            label: 'Catatan',
        }
    ]
})
</script>

<template>
    <div class="flex items-center gap-x-2">
        <SearchBox :items="studentList" :search="['name', 'nickname']" v-slot="{ item }"
            @get-item="(item) => findStudent(item)">
            <div class="p-1">
                <p class="text-sm">{{ item.nickname }}</p>
                <p class="text-xs text-gray-400">{{ item.name }}</p>
            </div>
        </SearchBox>
        <template v-if="_loadingStudent">
            <div class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-primary rounded-full"
                role="status" aria-label="loading">
                <span class="sr-only">Loading...</span>
            </div>
        </template>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-7 gap-4 mt-4">
        <div class="col-span-3">

            <div class="border rounded py-4 px-6">
                <div class="flex items-center">
                    <img :src="student.photo || '/default.jpg'"
                        class="shrink-0 w-24 h-24 object-cover object-top rounded-full" alt="profile">
                    <div class="flex flex-col text-sm ml-6">
                        <div class="grid grid-cols-3 gap-4">
                            <p class="col-span-1">Nama </p>
                            <p class="col-span-2">: {{ student.name || '-' }}</p>
                        </div>
                        <div class="grid grid-cols-3 gap-4">
                            <p class="col-span-1">Panggilan </p>
                            <p class="col-span-2">: {{ student.nickname || '-' }}</p>
                        </div>
                        <div class="grid grid-cols-3 gap-4">
                            <p class="col-span-1">Usia </p>
                            <p class="col-span-2">: {{ student.age || '-' }}</p>
                        </div>
                    </div>
                </div>
                <Button class="mt-4 w-full justify-center" icon="tabler:copy-plus" data-hs-overlay="#add-note"
                    :disabled="student.id == 0">
                    Tambah Catatan
                </Button>
            </div>

            <div class="mt-2 max-h-[400px] overflow-y-auto scrollbar space-y-1">
                <template v-for="note in studentNotes">
                    <button class="block w-full text-left hover:bg-neutral py-2 px-3 rounded border"
                        :class="{ 'bg-neutral': note.id == studentNote.id }" @click="getNote(note)">
                        <p class="text-sm">
                            {{ note.summary }}
                        </p>
                        <div class="flex justify-between mt-1">
                            <span class="text-xs text-gray-500">Oleh: {{ note.author }}</span>
                            <span class="text-xs text-gray-500">Dibuat: {{ note.created_at }}</span>
                        </div>
                    </button>
                </template>
            </div>

        </div>
        <div class="col-span-4">
            <div class="border rounded p-8">
                <template v-if="_loadingNote">
                    <div class="animate-pulse">
                        <p class="h-4 bg-gray-200 rounded-full" style="width: 40%;"></p>

                        <ul class="mt-5 space-y-3">
                            <li class="w-full h-4 bg-gray-200 rounded-full"></li>
                            <li class="w-full h-4 bg-gray-200 rounded-full"></li>
                            <li class="w-full h-4 bg-gray-200 rounded-full"></li>
                            <li class="w-full h-4 bg-gray-200 rounded-full"></li>
                        </ul>
                    </div>
                </template>
                <template v-else>
                    <p>{{ studentNote.note }}</p>
                    <div class="mt-4 text-sm text-gray-400">Dibuat: {{ studentNote.created_at }}</div>
                </template>
            </div>
        </div>
    </div>


    <!-- Overlay -->
    <Modal uid="add-note" is-form title="Tambah Catatan" :action="createNote">
        <template #body>
            <div>
                <label for="note">Catatan</label>
                <Textarea v-model="formAddNote.note" id="note" placeholder="Tambah Catatan" required />
            </div>

            <div class="mt-4">
                <span>Tipe</span>
                <div class="flex gap-x-2">
                    <label for="positive-type"
                        class="flex p-3 w-full bg-white border rounded text-sm focus:border-primary focus:ring-primary">
                        <input required type="radio" name="note-type" v-model="formAddNote.type" value="1"
                            class="shrink-0 mt-0.5 border border-gray-200 rounded-full text-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none"
                            id="positive-type">
                        <span class="text-sm ms-3">Baik</span>
                    </label>

                    <label for="negative-type"
                        class="flex p-3 w-full bg-white border border-gray-200 rounded text-sm focus:border-primary focus:ring-primary">
                        <input required type="radio" name="note-type" v-model="formAddNote.type" value="0"
                            class="shrink-0 mt-0.5 border-gray-200 rounded-full text-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none"
                            id="negative-type">
                        <span class="text-sm ms-3">Buruk</span>
                    </label>
                </div>
            </div>
        </template>
        <template #footer>
            <Button color="neutral" data-hs-overlay="#add-note">Tutup</Button>
            <Button type="submit" :loading="formAddNote._loading">Simpan</Button>
        </template>
    </Modal>
</template>