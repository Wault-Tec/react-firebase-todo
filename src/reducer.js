export function reducer(state, action) {
    switch (action.type) {
        case 'title':
            return {...state, title: action.payload};
        case 'description':
            return {...state, description: action.payload};
        case 'date':
            return {...state, completionDate: action.payload}; 
        case 'fileName':
            return {...state, fileName: action.payload}
        default:
            return state
    }
}