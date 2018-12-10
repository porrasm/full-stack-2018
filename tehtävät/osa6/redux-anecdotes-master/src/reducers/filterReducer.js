const filterReducer = (state = null, action) => {

    switch (action.type) {
        case 'filter-change':
            return action.filter
        default:
            return state
    }
}

export const filterChange = (filter) => {
    return { type: 'filter-change', filter }
}

export default filterReducer