import {
  CHANGE_TIME, CHANGE_DATE
} from '../Actions/actions';

const initialState = {
  time: '',
  date: ''
};

const StudyReducer = (state = initialState, action) => {
  // console.log(state)
  switch (action.type) {
    case CHANGE_TIME:
      return {
        ...state,
        time: action.time
      };
    case CHANGE_DATE:
      return {
        ...state,
        day: action.day
      };
    default:
      return state;
  }
};

export default StudyReducer;
