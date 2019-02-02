import StudyReducer from './app/Reducers/StudyReducer'
import {combineReducers, createStore} from 'redux';

const rootReducer = combineReducers({
  study: StudyReducer
});

const configureStore = () => {
  return createStore(rootReducer);
}


export default configureStore;