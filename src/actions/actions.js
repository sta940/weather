export function setActivePlace(placeIndex) {
    return {
        type: 'SET_ACTIVE_PLACE',
        placeIndex
    };
}

export function setActiveDay(dayIndex) {
    return {
        type: 'SET_ACTIVE_DAY',
        dayIndex
    };
}

export function fetchDataSuccess(fetchedData) {
    return {
        type: 'FETCH_DATA_SUCCESS',
        fetchedData
    };
}

export function fetchData(url) {
    return (dispatch) => {
        fetch(url)
        .then(res => res.json())
        .then(json => {
            dispatch(fetchDataSuccess(json));
        })
        .catch((err)=>console.log(err));
    };
}
