export const studentService = {

    async index() {
        const api = useApi()

        return api.handleApiError(() =>
            $fetch('/students', {
                method: 'GET',
                baseURL: api.baseURL,
                headers: api.headers,
            })
        )
    },

    async show(studentId: number) {
        const api = useApi()

        return api.handleApiError(() =>
            $fetch('/students/' + studentId, {
                method: 'GET',
                baseURL: api.baseURL,
                headers: api.headers,
            })
        )
    },

    async notes(studentId: number) {
        const api = useApi()

        return api.handleApiError(() =>
            $fetch(`/students/${studentId}/notes`, {
                method: 'GET',
                baseURL: api.baseURL,
                headers: api.headers,
            })
        )
    },

    async latestNote(studentId: number) {
        const api = useApi()

        return api.handleApiError(() =>
            $fetch(`/students/${studentId}/latest-note`, {
                method: 'GET',
                baseURL: api.baseURL,
                headers: api.headers,
            })
        )
    },

    async getPlans(studentId: number) {
        const api = useApi()

        return api.handleApiError(() =>
            $fetch(`/students/${studentId}/plans`, {
                method: 'GET',
                baseURL: api.baseURL,
                headers: api.headers,
            })
        )
    },

    async getPlan(studentId: number, planId: number) {
        const api = useApi()

        return api.handleApiError(() =>
            $fetch(`/students/${studentId}/plans/${planId}`, {
                method: 'GET',
                baseURL: api.baseURL,
                headers: api.headers,
            })
        )
    },

    async getLatestPlan(studentId: number) {
        const api = useApi()

        return api.handleApiError(() =>
            $fetch(`/students/${studentId}/latest-plan`, {
                method: 'GET',
                baseURL: api.baseURL,
                headers: api.headers,
            })
        )
    },

    async getBio(studentId: number) {
        const api = useApi()

        return api.handleApiError(() =>
            $fetch(`/students/${studentId}/bio`, {
                method: 'GET',
                baseURL: api.baseURL,
                headers: api.headers,
            })
        )
    },
}