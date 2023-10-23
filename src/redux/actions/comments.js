// import { LIMIT_COMMENTS } from "../../constants";
// import request from "../../server/request";
// import {
//   COMMENTS_FETCHING,
//   COMMENTS_LOADING,
//   COMMENTS_TOTAL,
// } from "../types/comments";

// export const getComments = (page = 1, search = "") => {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: COMMENTS_LOADING, payload: true });
//       const {
//         data: {
//           data,
//           pagination: { total },
//         },
//       } = await request.get("comment", {
//         params: { page, limit: LIMIT_COMMENTS, search },
//       });
//       const comments = data?.map((el) => ({ ...el, key: el?._id }));
//       dispatch({ type: COMMENTS_FETCHING, payload: comments });
//       dispatch({ type: COMMENTS_TOTAL, payload: total });
//     } finally {
//       dispatch({ type: COMMENTS_LOADING, payload: false });
//     }
//   };
// };

// *** OPTIMAL *** //

import { LIMIT_COMMENTS } from "../../constants";
import request from "../../server/request";
import { COMMENTS_ACTIONS } from "../types/comments";

const updateStateChange = (payload) => {
  return { type: COMMENTS_ACTIONS, payload };
};

export const getComments = (page = 1, search = "") => {
  return async (dispatch) => {
    try {
      dispatch(updateStateChange({ loading: true }));
      const {
        data: {
          data,
          pagination: { total },
        },
      } = await request.get("comment", {
        params: { page, limit: LIMIT_COMMENTS, search },
      });
      const comments = data?.map((el) => ({ ...el, key: el?._id }));
      dispatch(updateStateChange({ comments }));
      dispatch(updateStateChange({ total }));
    } finally {
      dispatch(updateStateChange({ loading: false }));
    }
  };
};
