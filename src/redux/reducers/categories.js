// import {
//   CATEGORY_FETCHING,
//   CATEGORY_LOADING,
//   CATEGORY_PAGE,
//   CATEGORY_SEARCH,
//   CATEGORY_TOTAL,
// } from "../types/categories";

// const initialState = {
//   categories: [],
//   total: 0,
//   activePage: 1,
//   loading: false,
//   error: null,
//   search: "",
// };

// const categoryReducer = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case CATEGORY_LOADING:
//       return { ...state, loading: payload };
//     case CATEGORY_FETCHING:
//       return { ...state, categories: payload };
//     case CATEGORY_TOTAL:
//       return { ...state, total: payload };
//     case CATEGORY_PAGE:
//       return { ...state, activePage: payload };
//     case CATEGORY_SEARCH:
//       return { ...state, search: payload };
//   }
//   return state;
// };

// export default categoryReducer;

//*** OPTIMAL ***//

import { CATEGORY_ACTIONS } from "../types/categories";

const initialState = {
  allCategories: [],
  categories: [],
  total: 0,
  activePage: 1,
  loading: false,
  error: null,
  search: "",
  imageData: null,
  imageLoading: false,
  isModalLoading: false,
  isModalOpen: false,
  selected: null,
};

const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CATEGORY_ACTIONS:
      return { ...state, ...payload };
  }
  return state;
};

export default categoryReducer;
