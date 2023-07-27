import { createStore } from 'redux';
import rootReducers from './services/Reducer';
const store = createStore(rootReducers);
export default store;
