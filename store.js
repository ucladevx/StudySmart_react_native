import { combineReducers, createStore } from 'redux';
import StudyReducer from './app/Reducers/StudyReducer';

const rootReducer = combineReducers({
  study: StudyReducer
});

const configureStore = () => createStore(rootReducer);


export default configureStore;
