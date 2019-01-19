import {
  CHANGE_CATEGORY, CHANGE_CLASS, STORE_RESOURCES, CHANGE_PROFESSOR, CHANGE_EXAM
} from '../Actions/actions';

const initialState = {
  category: 'Main',
  class: '',
  resources: [],
  professor: '',
  exam: ''
};

const ResourcesReducer = (state = initialState, action) => {
// console.log(state)
  switch (action.type) {
    case CHANGE_CATEGORY:
      return {
        ...state,
        category: action.category
      };
    case CHANGE_CLASS:
      return {
        ...state,
        class: action.class
      };
    case STORE_RESOURCES:
      return {
        ...state,
        resources: action.resources
      };
    case CHANGE_PROFESSOR:
      return {
        ...state,
        professor: action.professor
      };
    case CHANGE_EXAM:
      return {
        ...state,
        exam: action.exam
      };
    default:
      return state;
  }
};

export default ResourcesReducer;
