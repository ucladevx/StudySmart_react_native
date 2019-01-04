import CategoryReducer from './app/Reducers/CategoryReducer'
import {combineReducers, createStore} from 'redux';

const rootReducer = combineReducers({
  category: CategoryReducer
});

const configureStore = () => {
  return createStore(rootReducer);
}


export default configureStore;