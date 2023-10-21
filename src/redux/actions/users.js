import { LIMIT_USERS } from "../../constants";
import request from "../../server/request";
import {
  USERS_FETCHING,
  USERS_LOADING,
  USERS_PAGE,
  USERS_SEARCH,
  USERS_TOTAL,
} from "../types/users";

export const getUsers = (page = 1, search = "") => {
  return async (dispatch) => {
    try {
      dispatch({ type: USERS_LOADING, payload: true });
      const {
        data: {
          data,
          pagination: { total },
        },
      } = await request.get("user", {
        params: { page, limit: LIMIT_USERS, search },
      });
      const users = data?.map((el) => ({ ...el, key: el?._id }));
      dispatch({ type: USERS_FETCHING, payload: users });
      dispatch({ type: USERS_TOTAL, payload: total });
    } finally {
      dispatch({ type: USERS_LOADING, payload: false });
    }
  };
};

export const changePage = (page) => {
  return (dispatch) => {
    dispatch({ type: USERS_PAGE, payload: page });
    dispatch(getUsers(page));
  };
};

export const searchUsers = (search) => {
  return (dispatch) => {
    dispatch({ type: USERS_SEARCH, payload: search });
    dispatch({ type: USERS_PAGE, payload: 1 });
    dispatch(getUsers(1, search));
  };
};
