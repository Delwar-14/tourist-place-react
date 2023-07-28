export const SET_FORM_DATA = 'SET_FORM_DATA';
export const DELETE_ROW_DATA = 'DELETE_ROW_DATA';
export const UPDATE_ROW_DATA = 'UPDATE_ROW_DATA';
export const SET_CURRENT_ROW_DATA = 'SET_UPDATE_ROW_DATA';
export const SEARCH_FILTER = 'SEARCH_FILTER';
export const FILTER = 'FILTER';
export const ASC = 'asc';
export const DESC = 'desc';
export const NORMAL = '';

//set input form data
export function setInputFormData(data) {
    return {
        type: SET_FORM_DATA,
        payload: {
            name: data.name.value,
            address: data.address.value,
            rating: data.rating.value,
            type: data.type.value,
            image: data.image.value,
            id: new Date().getTime().toString()
        }
    }
}

//delete row data
export const deleteRowData = (id) => {
    return {
        type: DELETE_ROW_DATA,
        id: id
    }
}

//update row data
export const updateRowData = (update) => {
    return {
        type: UPDATE_ROW_DATA,
        payload: {
            data: update,
        }
    }
}

//sort order 
export const orderFilter = (order) => {
    let nextOrder = order.order;
    if (nextOrder === NORMAL)
        nextOrder = ASC;
    else if (nextOrder === ASC)
        nextOrder = DESC;
    else
        nextOrder = NORMAL;

    return {
        type: FILTER,
        payload: {
            data: nextOrder,
        }
    }
}

//search input
export const searchFilter = (searchInput) => {
    return {
        type: SEARCH_FILTER,
        payload: {
            data: searchInput?.name,
        }
    }
}
