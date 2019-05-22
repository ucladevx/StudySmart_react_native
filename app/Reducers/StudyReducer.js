import {
  CHANGE_TIME, CHANGE_DATE, CHANGE_DURATION, CHANGE_ROOM, CHANGE_LOCATION, LOAD_HILLDATA, LOAD_LIBRARYDATA
} from '../Actions/actions';

const initialState = {
  time: 'Now',
  date: 'Today',
  duration: 0,
  room: '',
  location: ['Anywhere'],
  hillData: [],
  libraryData: [],

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
    case LOAD_HILLDATA:
      return {
        ...state,
        hillData: action.hillData
      };
    case LOAD_LIBRARYDATA:
      return {
        ...state,
        libraryData: action.libraryData
      };
    default:
      return state;
  }
};

export default StudyReducer;
