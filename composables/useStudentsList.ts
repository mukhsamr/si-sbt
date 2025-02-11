export const useStudentsList = async (item?: StudentList) => {

    const getStorage = (): StudentList[] => JSON.parse(localStorage.getItem('studentsList') || '[]')
    const getSelected = (): Student => JSON.parse(localStorage.getItem('selectedStudentsList') || '{}')

    if (item) {
        localStorage.setItem('selectedStudentsList', JSON.stringify(item))
    }

    if (isEmpty(getStorage())) {
        const { data, success } = await studentService.index()
        if (success) {
            localStorage.setItem('studentsList', JSON.stringify(data.students))
        }
    }


    return { storage: getStorage(), selected: getSelected() }
};