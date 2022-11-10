import {
  BRAND_ADD,
  GET_ALL_BRANDS,
  GET_BRAND_PAGINATE,
  GET_BRAND_BY_ID,
} from "../types";

export default function brandsReducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_BRANDS:
      return { ...state, all: action.payload };
    case BRAND_ADD:
      return { ...state, lastAdded: action.payload };
    case GET_BRAND_PAGINATE:
      return { ...state, byPaginate: action.payload };
    case GET_BRAND_BY_ID:
      return { ...state, byId: action.payload };
    default:
      return state;
  }
}
