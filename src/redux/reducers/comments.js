// import {
//   COMMENTS_FETCHING,
//   COMMENTS_LOADING,
//   COMMENTS_PAGE,
//   COMMENTS_SEARCH,
//   COMMENTS_TOTAL,
// } from "../types/comments";

// const initialState = {
//   comments: [],
//   loading: false,
//   total: 0,
//   activePage: 1,
//   search: "",
// };

// export const commentsReducer = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case COMMENTS_LOADING:
//       return { ...state, loading: payload };
//     case COMMENTS_FETCHING:
//       return { ...state, comments: payload };
//     case COMMENTS_TOTAL:
//       return { ...state, total: payload };
//     case COMMENTS_SEARCH:
//       return { ...state, search: payload };
//     case COMMENTS_PAGE:
//       return { ...state, activePage: payload };
//   }
//   return state;
// };



// *** OPTIMAL *** //

import { COMMENTS_ACTIONS } from "../types/comments";

const initialState = {
  comments: [],
  loading: false,
  total: 0,
  activePage: 1,
  search: "",
};

export const commentsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case COMMENTS_ACTIONS:
      return { ...state, ...payload };
  }
  return state;
};
