export const noteService = {

    async index() {
        const api = useApi()
        return api.handleApiError(() =>
            $fetch('/notes', {
                method: 'GET',
                baseURL: api.baseURL,
                headers: api.headers,
            })
        )
    },

    async show(noteId: number) {
        const api = useApi()
        return api.handleApiError(() =>
            $fetch('/notes/' + noteId, {
                method: 'GET',
                baseURL: api.baseURL,
                headers: api.headers,
            })
        )
    },

    async store(request: object) {
        const api = useApi()
        return api.handleApiError(() =>
            $fetch('/notes', {
                method: 'POST',
                baseURL: api.baseURL,
                headers: api.headers,
                body: JSON.stringify(request)
            })
        )
    },
}