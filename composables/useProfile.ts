export const useProfile = () => {

    const _profile: Ref<Profile> = ref({})
    const getProfile = async (): Promise<Profile> => {

        if (_profile.value.id) {
            return _profile.value
        }

        const { data, success } = await authService.profile()
        if (success) {
            _profile.value = data.profile
        }

        return _profile.value
    }


    return { getProfile }
};