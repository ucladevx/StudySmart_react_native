export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
export const CHANGE_CLASS = 'CHANGE_CLASS';
export const STORE_RESOURCES = 'STORE_RESOURCES';
export const CHANGE_PROFESSOR = 'CHANGE_PROFESSOR';
export const CHANGE_EXAM = 'CHANGE_EXAM';

export const changeCategory = category => ({
  type: CHANGE_CATEGORY,
  category,
});
export const changeClass = course => ({
  type: CHANGE_CLASS,
  class: course,
});
export const storeResources = resources => ({
  type: STORE_RESOURCES,
  resources,
});
export const changeProfessor = professor => ({
  type: CHANGE_PROFESSOR,
  professor,
});
export const changeExam = exam => ({
  type: CHANGE_EXAM,
  exam,
});
