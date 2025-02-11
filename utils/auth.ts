export const authService = {

    async login(request: object) {
        const api = useApi()
        return await api.handleApiError(() =>
            $fetch('/auth/login', {
                method: 'POST',
                baseURL: api.baseURL,
                headers: api.headers,
                body: JSON.stringify(request)
            })
        )
    },

    async logout() {
        const api = useApi()
        return await api.handleApiError(() =>
            $fetch('/auth/logout', {
                method: 'POST',
                baseURL: api.baseURL,
                headers: api.headers,
            })
        )
    },

    async profile() {
        const api = useApi()
        return await api.handleApiError(() =>
            $fetch('/auth/profile', {
                method: 'GET',
                baseURL: api.baseURL,
                headers: api.headers,
            })
        )
    }
}