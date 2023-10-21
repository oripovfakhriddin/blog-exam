import { LIMIT_CATEGORY } from "../../constants";
import request from "../../server/request";
import {
  CATEGORY_FETCHING,
  CATEGORY_LOADING,
  CATEGORY_PAGE,
  CATEGORY_SEARCH,
  CATEGORY_TOTAL,
} from "../types/categories";

export const getCategories = (page = 1, search = "") => {
  return async (dispatch) => {
    try {
      dispatch({ type: CATEGORY_LOADING, payload: true });
      const {
        data: {
          data,
          pagination: { total },
        },
      } = await request.get("category", {
        params: { page, limit: LIMIT_CATEGORY, search },
      });
      const categories = data?.map((el) => ({ ...el, key: el?._id }));
      dispatch({ type: CATEGORY_FETCHING, payload: categories });
      dispatch({ type: CATEGORY_TOTAL, payload: total });
    } finally {
      dispatch({ type: CATEGORY_LOADING, payload: false });
    }
  };
};

export const changePage = (page) => {
  return (dispatch) => {
    dispatch({ type: CATEGORY_PAGE, payload: page });
    dispatch(getCategories(page));
  };
};

export const searchCategories = (search) => {
  return (dispatch) => {
    dispatch({ type: CATEGORY_SEARCH, payload: search });
    dispatch({ type: CATEGORY_PAGE, payload: 1 });
    dispatch(getCategories(1, search));
  };
};
