// import { LIMIT_POSTS } from "../../constants";
// import request from "../../server/request";
// import {
//   POSTS_FETCHING,
//   POSTS_LOADING,
//   POSTS_PAGE,
//   POSTS_SEARCH,
//   POSTS_TOTAL,
// } from "../types/posts";

// export const getPosts = (page = 1, search = "") => {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: POSTS_LOADING, payload: true });
//       const {
//         data: {
//           data,
//           pagination: { total },
//         },
//       } = await request.get("post", {
//         params: { page, limit: LIMIT_POSTS, search },
//       });
//       const posts = data.map((el) => ({ ...el, key: el?._id }));
//       dispatch({ type: POSTS_FETCHING, payload: posts });
//       dispatch({ type: POSTS_TOTAL, payload: total });
//     } finally {
//       dispatch({ type: POSTS_LOADING, payload: false });
//     }
//   };
// };

// export const changePage = (page) => {
//   return (dispatch) => {
//     dispatch({ type: POSTS_PAGE, payload: page });
//     dispatch(getPosts(page));
//   };
// };

// export const searchPosts = (search) => {
//   return (dispatch) => {
//     dispatch({ type: POSTS_SEARCH, payload: search });
//     dispatch({ type: POSTS_PAGE, payload: 1 });
//     dispatch(getPosts(1, search));
//   };
// };

//*** OPTIMAL  ***/

import { LIMIT_POSTS } from "../../constants";
import request from "../../server/request";
import { POSTS_ACTIONS } from "../types/posts";

const updateStateChange = (payload) => {
  return { type: POSTS_ACTIONS, payload };
};

export const getPosts = (page = 1, search = "") => {
  return async (dispatch) => {
    try {
      dispatch(updateStateChange({ loading: true }));
      const {
        data: {
          data,
          pagination: { total },
        },
      } = await request.get("post", {
        params: { page, limit: LIMIT_POSTS, search },
      });
      const posts = data.map((el) => ({ ...el, key: el?._id }));
      dispatch(updateStateChange({ posts }));
      dispatch(updateStateChange({ total }));
    } finally {
      dispatch(updateStateChange({ loading: false }));
    }
  };
};

export const changePage = (page) => {
  return (dispatch) => {
    dispatch(updateStateChange({ activePage: page }));
    dispatch(getPosts(page));
  };
};

export const searchPosts = (search) => {
  return (dispatch) => {
    dispatch(updateStateChange({ search }));
    dispatch(updateStateChange({ activePage: 1 }));
    dispatch(getPosts(1, search));
  };
};

export const uploadImage = (file) => {
  return async (dispatch) => {
    try {
      dispatch(updateStateChange({ imageLoading: true }));
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await request.post("upload", formData);
      console.log(data);
    } finally {
      dispatch(updateStateChange({ imageLoading: false }));
    }
  };
};

export const showModal = (form) => {
  return async (dispatch) => {
    dispatch(
      updateStateChange({ isModalOpen: true, imageData: null, selected: null })
    );
    form.resetFields();
  };
};

export const controlModal = (payload) => {
  return async (dispatch) => {
    dispatch(updateStateChange({ isModalOpen: payload }));
  };
};
