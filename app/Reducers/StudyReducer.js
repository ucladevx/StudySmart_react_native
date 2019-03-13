import {
  CHANGE_TIME, CHANGE_DATE, CHANGE_DURATION, CHANGE_ROOM, CHANGE_LOCATION, LOAD_DATA
} from '../Actions/actions';

const initialState = {
  time: '',
  date: '',
  duration: 0,
  room: '',
  location: '',
  data: []

};

const StudyReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TIME:
      return {
        ...state,
        time: action.time
      };
    case CHANGE_DATE:
      return {
        ...state,
        date: action.date
      };
    case CHANGE_DURATION:
      return {
        ...state,
        duration: action.duration
      };
    case CHANGE_ROOM:
      return {
        ...state,
        room: action.room
      };
    case CHANGE_LOCATION:
      return {
        ...state,
        location: action.location
      };
    case LOAD_DATA:
    return {
      ...state,
      data: action.data
    };
    default:
      return state;
  }
};

export default StudyReducer;
