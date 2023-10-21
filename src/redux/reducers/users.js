import {
  USERS_FETCHING,
  USERS_LOADING,
  USERS_PAGE,
  USERS_SEARCH,
  USERS_TOTAL,
} from "../types/users";

const initialState = {
  users: [],
  total: 0,
  activePage: 1,
  loading: false,
  error: null,
  search: "",
};

const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USERS_LOADING:
      return { ...state, loading: payload };
    case USERS_FETCHING:
      return { ...state, users: payload };
    case USERS_TOTAL:
      return { ...state, total: payload };
    case USERS_PAGE:
      return { ...state, activePage: payload };
    case USERS_SEARCH:
      return { ...state, search: payload };
  }
  return state;
};

export default usersReducer;
