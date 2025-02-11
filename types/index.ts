export { };

declare global {

    interface Breadcrumb {
        label: string,
        path?: string
    }

    interface Student {
        id: number,
        name: string,
        nickname: string
        age: number
        photo: string | null
    }

    interface StudentList {
        id: number,
        name: string,
        nickname: string
    }

    interface Note {
        id: number,
        note: string,
        summary: string
        type: string
        author: string,
        created_at?: string
    }

    interface Plan {
        id: number
        title: string
        count_plan?: number
        plan_details?: PlanDetails[]
        created_at?: string
        updated_at?: string
    }

    interface PlanDetails {
        id: number
        type: string
        content: string
        updated_at?: string
    }


    interface StudentBio {
        id: number,
        nik: string
        nis: string
        name: string,
        age: number
        nickname: string
        birth_date: string
        birth_order: string
        birth_place: string
        school: string
        gender: boolean
        height?: number | null
        weight?: number | null
        photo?: string | null
        is_graduate?: boolean
        family?: Family
    }

    interface Family {
        id: number,
        kk: string,
        father_name: string
        mother_name: string
        father_job: string
        mother_job: string
        children: string
        address: string
    }
}