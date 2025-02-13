<script setup lang="ts">


//======= Variables
const _loadingStudent: Ref<boolean> = ref(false)
const _loadingPlan: Ref<boolean> = ref(false)
const _loadingPlans: Ref<boolean> = ref(false)

const studentList: Ref<StudentList[]> = ref([])
const student: Ref<Student> = ref({
    id: 0,
    name: '-',
    nickname: '-',
    age: 0,
    photo: null
})
const studentPlans: Ref<Plan[]> = ref([])
const studentPlan: Ref<Plan> = ref({
    id: 0,
    title: '-',
    pdf: '',
    updated_at: '_'
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
    studentPlan.value = {
        id: 0,
        title: '-',
        pdf: '',
        updated_at: '_'
    }
    studentPlans.value = []

}
const findStudent = async (item: StudentList) => {
    _resetVariables()

    await useStudentsList(item)
    await getStudent(item)
    await getPlans(item)
}
const getStudentsLite = async () => {
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
const getPlans = async (item: StudentList) => {
    _loadingPlans.value = true

    const { data, success } = await studentService.getPlans(item.id)
    if (success) {
        _loadingPlans.value = false

        if (!isEmpty(data.plans)) {
            studentPlans.value = data.plans
        }
    }
}
const getPlan = async (item: Plan) => {
    _loadingPlan.value = true

    const { data, success } = await studentService.getPlan(student.value.id, item.id)
    if (success) {
        _loadingPlan.value = false

        if (!isEmpty(data.plan)) {
            studentPlan.value = data.plan
        }
    }
}



//======= Hooks
onBeforeMount(() => {
    getStudentsLite()
})
onMounted(async () => {
    const { selected } = await useStudentsList()

    if (!isEmpty(selected)) {
        await findStudent(selected)
    }
})



definePageMeta({
    breadcrumb: [
        {
            label: 'Action Plan',
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
        <template v-if="_loadingPlans">
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
            </div>

            <div class="mt-2 max-h-[400px] overflow-y-auto scrollbar space-y-1">
                <template v-for="plan in studentPlans">
                    <button class="block w-full text-left hover:bg-neutral py-2 px-3 rounded border"
                        :class="{ 'bg-neutral': plan.id == studentPlan.id }" @click="getPlan(plan)">
                        <p class="text-sm">
                            {{ plan.title }}
                        </p>
                        <span class="text-xs text-gray-500 mt-1">Dibuat: {{ plan.created_at }}</span>
                    </button>
                </template>
            </div>

        </div>
        <div class="col-span-4">
            <template v-if="_loadingPlan">
                <div class="animate-pulse border p-8 rounded">
                    <div class="bg-slate-50 border rounded p-8 flex flex-col items-center justify-center">
                        <Icon name="tabler:loader" size="124" class="text-gray-400 mb-4 animate-spin" />
                        <span class="text-gray-400">
                            Mencari File.
                        </span>
                    </div>
                </div>
            </template>
            <template v-else>
                <template v-if="!studentPlan?.pdf">
                    <div class="bg-slate-50 border rounded p-8 flex flex-col items-center justify-center">
                        <span class="text-gray-600">
                            Pilih Action Plan dari daftar.
                        </span>
                    </div>
                </template>
                <template v-else>
                    <object :data="studentPlan.pdf" type="application/pdf" class="w-full aspect-[210/290]">
                        <div class="bg-slate-50 border rounded p-8 flex flex-col items-center justify-center">
                            <Icon name="tabler:file-off" size="124" class="text-gray-400 mb-4" />
                            <span class="text-gray-400">
                                File tidak ditemukan.
                            </span>
                        </div>
                    </object>
                </template>
            </template>
        </div>
    </div>

</template>