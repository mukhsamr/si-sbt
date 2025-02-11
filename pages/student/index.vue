<script setup lang="ts">


//======= Variables
const _loadingBio: Ref<boolean> = ref(false)

const studentList: Ref<StudentList[]> = ref([])
const studentBio: Ref<StudentBio> = ref({
    id: 0,
    nik: '-',
    nis: '-',
    name: '-',
    age: 0,
    nickname: '-',
    birth_date: '-',
    birth_order: '-',
    birth_place: '-',
    school: '-',
    gender: true,
})
const studentFamily: Ref<Family> = ref({
    id: 0,
    kk: '-',
    father_name: '-',
    mother_name: '-',
    father_job: '-',
    mother_job: '-',
    children: '-',
    address: '-',
})





//======= Local Method
const _resetVariables = () => {
    studentBio.value = {
        id: 0,
        nik: '-',
        nis: '-',
        name: '-',
        age: 0,
        nickname: '-',
        birth_date: '-',
        birth_order: '-',
        birth_place: '-',
        school: '-',
        gender: true,
    }
    studentFamily.value = {
        id: 0,
        kk: '-',
        father_name: '-',
        mother_name: '-',
        father_job: '-',
        mother_job: '-',
        children: '-',
        address: '-',
    }
}
const findStudent = async (item: StudentList) => {
    _resetVariables()
    await useStudentsList(item)
    await getStudentBio(item)
}




//======= Fetch
const getStudentsList = async () => {
    const { storage } = await useStudentsList()
    studentList.value = storage
}
const getStudentBio = async (item: StudentList) => {
    _loadingBio.value = true
    const { data, success } = await studentService.getBio(item.id)
    if (success) {
        _loadingBio.value = false

        if (!isEmpty(data.student)) {
            studentBio.value = data.student

            if (!isEmpty(data.student.family)) {
                studentFamily.value = data.student.family
            }
        }
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
            label: 'Biodata Santri',
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
        <template v-if="_loadingBio">
            <div class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-primary rounded-full"
                role="status" aria-label="loading">
                <span class="sr-only">Loading...</span>
            </div>
        </template>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-7 gap-2 mt-4">
        <div class="col-span-2">
            <img :src="studentBio.photo || '/default.jpg'" class="shrink-0 w-52 lg:w-72 object-cover rounded"
                alt="profile">
        </div>
        <div class="col-span-5 grid grid-cols-1 gap-2">
            <div class="border rounded p-4">
                <template v-if="_loadingBio">
                    <div class="animate-pulse">
                        <p class="h-4 bg-gray-200 rounded-full" style="width: 40%;"></p>

                        <ul class="mt-5 space-y-3">
                            <li class="w-full h-4 bg-gray-200 rounded-full"></li>
                            <li class="w-full h-4 bg-gray-200 rounded-full"></li>
                            <li class="w-full h-4 bg-gray-200 rounded-full"></li>
                            <li class="w-full h-4 bg-gray-200 rounded-full"></li>
                            <li class="w-full h-4 bg-gray-200 rounded-full"></li>
                            <li class="w-full h-4 bg-gray-200 rounded-full"></li>
                            <li class="w-full h-4 bg-gray-200 rounded-full"></li>
                            <li class="w-full h-4 bg-gray-200 rounded-full"></li>
                        </ul>
                    </div>
                </template>
                <template v-else>
                    <h1 class="text-xl">Biodata</h1>
                    <div class="mt-2">
                        <ul class="text-sm space-y-1">
                            <li>
                                <span class="text-gray-400">Nama:</span>
                                <span class="ml-2">{{ studentBio.name }}</span>
                            </li>
                            <li>
                                <span class="text-gray-400">Panggilan:</span>
                                <span class="ml-2">{{ studentBio.nickname }}</span>
                            </li>
                            <li>
                                <span class="text-gray-400">TTL:</span>
                                <span class="ml-2">{{ studentBio.birth_place }}, {{ studentBio.birth_date }}</span>
                                <span v-if="studentBio.age" class="font-semibold text-secondary ml-1">
                                    ({{ studentBio.age }} tahun)
                                </span>
                            </li>
                            <li>
                                <span class="text-gray-400">NIK:</span>
                                <span class="ml-2">{{ studentBio.nik }}</span>
                            </li>
                            <li>
                                <span class="text-gray-400">NIS:</span>
                                <span class="ml-2">{{ studentBio.nis }}</span>
                            </li>
                            <li>
                                <span class="text-gray-400">Anak Ke:</span>
                                <span class="ml-2">{{ studentBio.birth_order }}</span>
                            </li>
                            <li>
                                <span class="text-gray-400">Asal Sekolah:</span>
                                <span class="ml-2">{{ studentBio.school }}</span>
                            </li>
                            <li>
                                <span class="text-gray-400">Berat:</span>
                                <span class="ml-2">{{ studentBio.weight }} kg</span>
                            </li>
                            <li>
                                <span class="text-gray-400">Tinggi:</span>
                                <span class="ml-2">{{ studentBio.height }} cm</span>
                            </li>
                        </ul>
                    </div>
                </template>
            </div>
            <div class="border rounded p-4">
                <template v-if="_loadingBio">
                    <div class="animate-pulse">
                        <p class="h-4 bg-gray-200 rounded-full" style="width: 40%;"></p>

                        <ul class="mt-5 space-y-3">
                            <li class="w-full h-4 bg-gray-200 rounded-full"></li>
                            <li class="w-full h-4 bg-gray-200 rounded-full"></li>
                            <li class="w-full h-4 bg-gray-200 rounded-full"></li>
                            <li class="w-full h-4 bg-gray-200 rounded-full"></li>
                            <li class="w-full h-4 bg-gray-200 rounded-full"></li>
                            <li class="w-full h-4 bg-gray-200 rounded-full"></li>
                            <li class="w-full h-4 bg-gray-200 rounded-full"></li>
                            <li class="w-full h-4 bg-gray-200 rounded-full"></li>
                        </ul>
                    </div>
                </template>
                <template v-else>
                    <h1 class="text-xl">Keluarga</h1>
                    <div class="mt-2">
                        <ul class="text-sm space-y-1">
                            <li>
                                <span class="text-gray-400">KK:</span>
                                <span class="ml-2">{{ studentFamily.kk }}</span>
                            </li>
                            <li>
                                <span class="text-gray-400">Ayah:</span>
                                <span class="ml-2">{{ studentFamily.father_name }}</span>
                            </li>
                            <li>
                                <span class="text-gray-400">Ibu:</span>
                                <span class="ml-2">{{ studentFamily.mother_name }}</span>
                            </li>
                            <li>
                                <span class="text-gray-400">Pekerjaan Ayah:</span>
                                <span class="ml-2">{{ studentFamily.father_job }}</span>
                            </li>
                            <li>
                                <span class="text-gray-400">Pekerjaan Ibu:</span>
                                <span class="ml-2">{{ studentFamily.mother_job }}</span>
                            </li>
                            <li>
                                <span class="text-gray-400">Jumlah Anak:</span>
                                <span class="ml-2">{{ studentFamily.children }}</span>
                            </li>
                            <li>
                                <span class="text-gray-400">Alamat:</span>
                                <span class="ml-2">{{ studentFamily.address }}</span>
                            </li>
                        </ul>
                    </div>
                </template>
            </div>
        </div>
    </div>


</template>