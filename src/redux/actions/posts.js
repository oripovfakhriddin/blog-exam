import { LIMIT_POSTS } from "../../constants";
import request from "../../server/request";
import {
  POSTS_FETCHING,
  POSTS_LOADING,
  POSTS_PAGE,
  POSTS_SEARCH,
  POSTS_TOTAL,
} from "../types/posts";

export const getPosts = (page = 1, search = "") => {
  return async (dispatch) => {
    try {
      dispatch({ type: POSTS_LOADING, payload: true });
      const {
        data: {
          data,
          pagination: { total },
        },
      } = await request.get("post", {
        params: { page, limit: LIMIT_POSTS, search },
      });
      const posts = data.map((el) => ({ ...el, key: el?._id }));
      dispatch({ type: POSTS_FETCHING, payload: posts });
      dispatch({ type: POSTS_TOTAL, payload: total });
    } finally {
      dispatch({ type: POSTS_LOADING, payload: false });
    }
  };
};

export const searchPosts = (search) => {
  return (dispatch) => {
    dispatch({ type: POSTS_SEARCH, payload: search });
    dispatch({ type: POSTS_PAGE, payload: 1 });
    dispatch(getPosts(1, search));
  };
};

export const changePage = (page) => {
  return (dispatch) => {
    dispatch({ type: POSTS_PAGE, payload: page });
    dispatch(getPosts(page));
  };
};
