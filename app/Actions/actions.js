export const CHANGE_TIME = 'CHANGE_TIME';
export const CHANGE_DATE = 'CHANGE_DATE';
export const CHANGE_DURATION = 'CHANGE_DURATION';
export const CHANGE_ROOM = 'CHANGE_ROOM';
export const CHANGE_LOCATION = 'CHANGE_LOCATION';
export const LOAD_DATA = 'LOAD_DATA';
export const CHANGE_UNSTYLEDTIME = 'CHANGE_UNSTYLEDTIME'


export const changeTime = time => ({
  type: CHANGE_TIME,
  time,
});
export const changeDate = date => ({
  type: CHANGE_DATE,
  date,
});
export const changeDuration = duration => ({
  type: CHANGE_DURATION,
  duration,
});

export const changeRoom = room => ({
  type: CHANGE_ROOM,
  room,
});

export const changeLocation = location => ({
  type: CHANGE_LOCATION,
  location,
});

export const loadData = data => ({
  type: LOAD_DATA,
  data,
});

export const changeUnstyledTime = unstyledTime => ({
  type: CHANGE_UNSTYLEDTIME,
  unstyledTime,
});
