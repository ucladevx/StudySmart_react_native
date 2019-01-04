import { CHANGE_CATEGORY } from '../Actions/actions';

const initialState = {
  category: ' '
};

const CategoryReducer = (state = initialState, action) => {
  switch(action.type){
    case CHANGE_CATEGORY:
      return {
        ...state,
        category: action.category
      };
    default:
      return state;
  }
}

export default CategoryReducer;