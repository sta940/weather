export function weatherData(state = {}, action) {
    switch (action.type) {
        case 'FETCH_DATA_SUCCESS':
            return action.fetchedData;
        default:
            return state;
    }
}

export function activePlace(state = 0, action) {
    switch (action.type) {
        case 'SET_ACTIVE_PLACE':
            return action.placeIndex;
        default:
            return state;
    }
}

export function activeDay(state = 0, action) {
    switch (action.type) {
        case 'SET_ACTIVE_DAY':
            return action.dayIndex;
        default:
            return state;
    }
}

