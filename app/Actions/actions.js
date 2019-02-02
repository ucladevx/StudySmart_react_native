export const CHANGE_TIME = 'CHANGE_TIME';
export const CHANGE_DATE = 'CHANGE_DATE';


export const changeTime = time => ({
  type: CHANGE_TIME,
  time,
});
export const changeDate = date => ({
  type: CHANGE_DATE,
  date,
});
