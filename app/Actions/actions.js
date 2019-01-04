export const CHANGE_CATEGORY = 'CHANGE_CATEGORY'

export const changeCategory = category => {
  console.log("RESET", category)
    return {
      type: CHANGE_CATEGORY,
      category: category,
    }
  }