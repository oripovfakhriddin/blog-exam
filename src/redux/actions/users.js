// import { LIMIT_USERS } from "../../constants";
// import request from "../../server/request";
// import {
//   USERS_FETCHING,
//   USERS_LOADING,
//   USERS_PAGE,
//   USERS_SEARCH,
//   USERS_TOTAL,
// } from "../types/users";

// export const getUsers = (page = 1, search = "") => {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: USERS_LOADING, payload: true });
//       const {
//         data: {
//           data,
//           pagination: { total },
//         },
//       } = await request.get("user", {
//         params: { page, limit: LIMIT_USERS, search },
//       });
//       const users = data?.map((el) => ({ ...el, key: el?._id }));
//       dispatch({ type: USERS_FETCHING, payload: users });
//       dispatch({ type: USERS_TOTAL, payload: total });
//     } finally {
//       dispatch({ type: USERS_LOADING, payload: false });
//     }
//   };
// };

// export const changePage = (page) => {
//   return (dispatch) => {
//     dispatch({ type: USERS_PAGE, payload: page });
//     dispatch(getUsers(page));
//   };
// };

// export const searchUsers = (search) => {
//   return (dispatch) => {
//     dispatch({ type: USERS_SEARCH, payload: search });
//     dispatch({ type: USERS_PAGE, payload: 1 });
//     dispatch(getUsers(1, search));
//   };
// };

// *** OPTIMAL *** //

import { LIMIT_USERS } from "../../constants";
import request from "../../server/request";
import { USERS_ACTIONS } from "../types/users";

const updateStateChange = (payload) => {
  return { type: USERS_ACTIONS, payload };
};

export const getUsers = (page = 1, search = "") => {
  return async (dispatch) => {
    try {
      dispatch(updateStateChange({ loading: true }));
      const {
        data: {
          data,
          pagination: { total },
        },
      } = await request.get("user", {
        params: { page, limit: LIMIT_USERS, search },
      });
      const users = data?.map((el) => ({ ...el, key: el?._id }));
      dispatch(updateStateChange({ users }));
      dispatch(updateStateChange({ total }));
    } finally {
      dispatch(updateStateChange({ loading: false }));
    }
  };
};

export const changePage = (page, search) => {
  return (dispatch) => {
    dispatch(updateStateChange({ activePage: page }));
    dispatch(getUsers(page, search));
  };
};

export const searchUsers = (search) => {
  return (dispatch) => {
    dispatch(updateStateChange({ search }));
    dispatch(updateStateChange({ activePage: 1 }));
    dispatch(getUsers(1, search));
  };
};

export const controlModal = (payload) => (dispatch) => {
  dispatch(updateStateChange({ isModalOpen: payload }));
};

export const showModal = (form) => async (dispatch) => {
  dispatch(
    updateStateChange({ selected: null, imageData: null, isModalOpen: true })
  );
  form.resetFields();
};

export const uploadImage = (file) => {
  return async (dispatch) => {
    try {
      dispatch(updateStateChange({ imageLoading: true }));
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await request.post("auth/upload", formData);
      dispatch(updateStateChange({ imageData: data }));
    } finally {
      dispatch(updateStateChange({ imageLoading: false }));
    }
  };
};

export const sendUsers = (newValues, selected, form, activePage, search) => {
  return async (dispatch) => {
    try {
      dispatch(updateStateChange({ isModalLoading: true }));
      selected === null
        ? await request.post("user", newValues)
        : await request.put(`user/${selected}`, newValues);
      dispatch(updateStateChange({ isModalOpen: false, imageData: null }));
      dispatch(getUsers(activePage, search));
      form.resetFields();
    } finally {
      dispatch(updateStateChange({ isModalLoading: false }));
    }
  };
};

export const editUsers = (form, id) => {
  return async (dispatch) => {
    dispatch(updateStateChange({ selected: id, isModalOpen: true }));
    const { data } = await request.get(`user/${id}`);
    dispatch(updateStateChange({ imageData: data.photo }));
    form.setFieldsValue(data);
  };
};

export const deleteUser =
  ({ id, search }) =>
  async (dispatch) => {
    await request.delete(`user/${id}`);
    dispatch(getUsers(1, search));
    dispatch(updateStateChange({ activePage: 1 }));
  };
