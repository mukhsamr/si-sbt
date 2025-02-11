<script setup lang="ts">


//======= Variables
const _loadingStudent: Ref<boolean> = ref(false)
const _loadingPlan: Ref<boolean> = ref(false)
const _loadingNote: Ref<boolean> = ref(false)
const studentList: Ref<StudentList[]> = ref([])
const student: Ref<Student> = ref({
    id: 0,
    name: '-',
    nickname: '-',
    age: 0,
    photo: null
})
const studentLatestPlan: Ref<Plan> = ref({
    id: 0,
    title: '-',
    count_plan: 0,
})
const studentLatestNote: Ref<Note> = ref({
    id: 0,
    note: '-',
    summary: '-',
    type: '-',
    author: '-',
    created_at: '-'
})






//======= Local Method
const _resetVariables = () => {
    student.value = {
        id: 0,
        name: '-',
        nickname: '-',
        age: 0,
        photo: null
    }
    studentLatestPlan.value = {
        id: 0,
        title: '-',
        count_plan: 0,
    }
    studentLatestNote.value = {
        id: 0,
        note: '-',
        summary: '-',
        type: '-',
        author: '-',
        created_at: '-'
    }
}
const findStudent = async (item: StudentList) => {
    _resetVariables()

    await useStudentsList(item)
    await getStudent(item)
    await getLatestPlan(item)
    await getLatestNote(item)
}




//======= Fetch
const getStudentsList = async () => {
    const { storage } = await useStudentsList()
    studentList.value = storage
}
const getStudent = async (item: StudentList) => {
    _loadingStudent.value = true

    const { data, success } = await studentService.show(item.id)
    if (success) {
        _loadingStudent.value = false

        if (data.student) {
            student.value = data.student
        }
    }
}
const getLatestPlan = async (item: StudentList) => {
    _loadingPlan.value = true
    const { data, success } = await studentService.getLatestPlan(item.id)

    if (success) {
        _loadingPlan.value = false

        if (data.plan) {
            studentLatestPlan.value = data.plan
        }
    }
}
const getLatestNote = async (item: StudentList) => {
    _loadingNote.value = true
    const { data, success } = await studentService.latestNote(item.id)

    if (success) {
        _loadingNote.value = false

        if (data.note) {
            studentLatestNote.value = data.note
        }
    }
}



//======= Hooks
onBeforeMount(async () => {
    await getStudentsList()
    const { selected } = await useStudentsList()

    const firstStudent = selected || studentList.value[0]
    if (firstStudent) {
        findStudent(firstStudent)
    }
})



definePageMeta({
    breadcrumb: [
        {
            label: 'Dashboard',
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

    <div class="border rounded-t py-4 px-6 mt-4">
        <div class="flex items-center">
            <img :src="student.photo || '/default.jpg'" class="shrink-0 w-24 h-24 object-cover object-top rounded-full"
                alt="profile">
            <div class="flex flex-col w-full text-sm ml-6">
                <div class="grid grid-cols-5 gap-x-2">
                    <div class="col-span-2 w-full flex justify-between">
                        <span class="text-sm">Nama</span>
                        <span>:</span>
                    </div>
                    <p class="col-span-3 text-sm">{{ student.name || '-' }}</p>
                </div>
                <div class="grid grid-cols-5 gap-x-2">
                    <div class="col-span-2 w-full flex justify-between">
                        <span class="text-smm">Panggilan</span>
                        <span>:</span>
                    </div>
                    <p class="col-span-3 text-sm">{{ student.nickname || '-' }}</p>
                </div>
                <div class="grid grid-cols-5 gap-x-2">
                    <div class="col-span-2 w-full flex justify-between">
                        <span class="text-sm">Usia</span>
                        <span>:</span>
                    </div>
                    <p class="col-span-3 text-sm">{{ student.age || '-' }}</p>
                </div>
            </div>
        </div>
    </div>

    <div class="border rounded-b border-t-0 bg-neutral-light p-3">
        <div class="grid grid-cols-3 justify-items-center">
            <div class="flex items-center gap-x-2">
                <Icon name="tabler:school" size="28" />
                <div class="flex flex-col">
                    <span class="text-xs text-gray-600">Pondok</span>
                    <span class="text-sm font-semibold">2</span>
                </div>
            </div>
            <div class="flex items-center gap-x-2">
                <Icon name="tabler:umbrella" size="28" />
                <div class="flex flex-col">
                    <span class="text-xs text-gray-600">Payung</span>
                    <span class="text-sm font-semibold">2 SMA</span>
                </div>
            </div>
            <div class="flex items-center gap-x-2">
                <Icon name="tabler:chart-bar" size="28" />
                <div class="flex flex-col">
                    <span class="text-xs text-gray-600">Level</span>
                    <span class="text-sm font-semibold">2</span>
                </div>
            </div>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4">
        <div class="border rounded p-3 lg:p-4">
            <template v-if="_loadingPlan">
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
                <div class="flex items-center gap-x-2">
                    <Icon name="tabler:target-arrow" size="24" />
                    <span class="text-sm">Action Plan</span>
                </div>
                <div class="mt-4">
                    <p class="text-sm">{{ studentLatestPlan.title }}</p>
                    <p class="text-xs text-gray-400">{{ studentLatestPlan.count_plan }} Action Plan</p>
                </div>
                <Button size="sm" class="ml-auto" @click="navigateTo('/plan')">Lihat Detail</Button>
            </template>
        </div>

        <div class="border rounded p-3">
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
                <div class="flex items-center gap-x-2">
                    <Icon name="tabler:note" size="24" />
                    <span class="text-sm">Catatan</span>
                </div>
                <div class="mt-4">
                    <p class="text-sm">
                        {{ studentLatestNote.summary }}
                    </p>
                    <span class="text-xs text-gray-400">Oleh: {{ studentLatestNote.author }}</span>
                </div>
                <Button size="sm" class="ml-auto" @click="navigateTo('/plan')">Lihat Detail</Button>
            </template>
        </div>
    </div>

    <div class="grid grid-cols-5 gap-x-2 mt-2">
        <div class="col-span-3 rounded border p-3">
            <div>
                <label class="text-xs mb-2">Inisiatif</label>
                <div class="rounded border">
                    <div class="w-[50%] rounded bg-secondary p-2" />
                </div>
            </div>
            <div class="mt-2">
                <label class="text-xs mb-2">Kontrol Diri</label>
                <div class="rounded border">
                    <div class="w-[75%] rounded bg-secondary p-2" />
                </div>
            </div>
            <div class="mt-2">
                <label class="text-xs mb-2">Kontrol Potensi</label>
                <div class="rounded border">
                    <div class="w-[25%] rounded bg-secondary p-2" />
                </div>
            </div>
            <div class="mt-2">
                <label class="text-xs mb-2">Mengahrgai Karya</label>
                <div class="rounded border">
                    <div class="w-[85%] rounded bg-secondary p-2" />
                </div>
            </div>
        </div>
        <div class="col-span-2 space-y-2 grid grid-cols-1">
            <div class="border rounded p-3">
                <div class="flex items-center gap-x-3">
                    <Icon name="tabler:heart" size="24" />
                    <div>
                        <label class="text-xs text-gray-600 mb-2">Nilai Karakter</label>
                        <p class="text-sm font-semibold">BSB</p>
                    </div>
                </div>
            </div>
            <div class="border rounded p-3 space-y-3">
                <div class="flex items-center gap-x-3">
                    <Icon name="tabler:book" size="24" />
                    <div>
                        <label class="text-xs text-gray-600 mb-2">PLP Tahfidz</label>
                        <p class="text-sm font-semibold">PLP 3</p>
                    </div>
                </div>
                <div class="flex items-center gap-x-3">
                    <Icon name="tabler:devices" size="24" />
                    <div>
                        <label class="text-xs text-gray-600 mb-2">PLP IT</label>
                        <p class="text-sm font-semibold">Aksel DKV</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>