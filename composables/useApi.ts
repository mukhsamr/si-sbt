export const useApi = () => {
    const config = useRuntimeConfig()

    const token = useCookie('token').value
    const baseURL = config.public.apiBase
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    }

    const handleApiError = async (apiCall: any) => {
        try {
            const response = await apiCall()
            return { data: response, success: true }
        } catch (error: any) {

            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        return { data: error.response._data, success: false }
                    case 422:
                        return { data: error.response._data, success: false }
                    case 500:
                        useState('isError').value = true
                        return { data: error.response, success: false }
                    default:
                        break;
                }
            }

            return { data: { message: 'Something went wrong' }, success: false }

        }
    }

    return {
        baseURL,
        headers,
        handleApiError
    }
}