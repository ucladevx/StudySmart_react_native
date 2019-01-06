export const CHANGE_CATEGORY = 'CHANGE_CATEGORY'
export const CHANGE_CLASS = 'CHANGE_CLASS'
export const STORE_RESOURCES = 'STORE_RESOURCES'
export const CHANGE_PROFESSOR = 'CHANGE_PROFESSOR'
export const CHANGE_EXAM = 'CHANGE_EXAM'

export const changeCategory = category => {
    return {
      type: CHANGE_CATEGORY,
      category: category,
    }
  }
  export const changeClass = course => {
    return {
      type: CHANGE_CLASS,
      class: course,
    }
  }
  export const storeResources = resources => {
    return {
      type: STORE_RESOURCES,
      resources: resources,
    }
  }
  export const changeProfessor = professor => {
    return {
      type: CHANGE_PROFESSOR,
      professor: professor,
    }
  }
  export const changeExam = exam => {
    return {
      type: CHANGE_EXAM,
      exam: exam,
    }
  }