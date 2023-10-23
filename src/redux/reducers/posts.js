// import {
//   POSTS_FETCHING,
//   POSTS_LOADING,
//   POSTS_PAGE,
//   POSTS_SEARCH,
//   POSTS_TOTAL,
// } from "../types/posts";

// const initialState = {
//   posts: [],
//   loading: false,
//   search: "",
//   total: 0,
//   activePage: 1,
// };

// export const postsReducer = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case POSTS_LOADING:
//       return { ...state, loading: payload };
//     case POSTS_FETCHING:
//       return { ...state, posts: payload };
//     case POSTS_TOTAL:
//       return { ...state, total: payload };
//     case POSTS_PAGE:
//       return { ...state, activePage: payload };
//     case POSTS_SEARCH:
//       return { ...state, search: payload };
//   }
//   return state;
// };

//*** OPTIMAL  ***//

import { POSTS_ACTIONS } from "../types/posts";

const initialState = {
  posts: [],
  loading: false,
  search: "",
  total: 0,
  activePage: 1,
  isModalOpen: false,
  isModalLoading: false,
  imageLoading: false,
  imageData: null,
  selected: null,
  postsCategories: null,
};

export const postsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case POSTS_ACTIONS:
      return { ...state, ...payload };
  }
  return state;
};
