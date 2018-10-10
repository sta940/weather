import { combineReducers } from 'redux';
import { weatherData , activePlace,activeDay } from './reducers';

export default combineReducers({
    weatherData ,
    activePlace,
    activeDay
});
