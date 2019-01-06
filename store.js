import ResourcesReducer from './app/Reducers/ResourcesReducer'
import {combineReducers, createStore} from 'redux';

const rootReducer = combineReducers({
  resources: ResourcesReducer
});

const configureStore = () => {
  return createStore(rootReducer);
}


export default configureStore;