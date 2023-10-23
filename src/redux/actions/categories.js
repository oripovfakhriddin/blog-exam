// import { LIMIT_CATEGORY } from "../../constants";
// import request from "../../server/request";
// import {
//   CATEGORY_FETCHING,
//   CATEGORY_LOADING,
//   CATEGORY_PAGE,
//   CATEGORY_SEARCH,
//   CATEGORY_TOTAL,
// } from "../types/categories";

// export const getCategories = (page = 1, search = "") => {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: CATEGORY_LOADING, payload: true });
//       const {
//         data: {
//           data,
//           pagination: { total },
//         },
//       } = await request.get("category", {
//         params: { page, limit: LIMIT_CATEGORY, search },
//       });
//       const categories = data?.map((el) => ({ ...el, key: el?._id }));
//       dispatch({ type: CATEGORY_FETCHING, payload: categories });
//       dispatch({ type: CATEGORY_TOTAL, payload: total });
//     } finally {
//       dispatch({ type: CATEGORY_LOADING, payload: false });
//     }
//   };
// };

// export const changePage = (page) => {
//   return (dispatch) => {
//     dispatch({ type: CATEGORY_PAGE, payload: page });
//     dispatch(getCategories(page));
//   };
// };

// export const searchCategories = (search) => {
//   return (dispatch) => {
//     dispatch({ type: CATEGORY_SEARCH, payload: search });
//     dispatch({ type: CATEGORY_PAGE, payload: 1 });
//     dispatch(getCategories(1, search));
//   };
// };

// *** OPTIMAL ***//

import { LIMIT_CATEGORY } from "../../constants";
import request from "../../server/request";
import { CATEGORY_ACTIONS } from "../types/categories";

const updateStateChange = (payload) => {
  return { type: CATEGORY_ACTIONS, payload };
};

export const getCategories = (page = 1, search = "") => {
  return async (dispatch) => {
    try {
      dispatch(updateStateChange({ loading: true }));
      const {
        data: {
          data,
          pagination: { total },
        },
      } = await request.get("category", {
        params: { page, limit: LIMIT_CATEGORY, search },
      });
      const categories = data?.map((el) => ({ ...el, key: el?._id }));
      dispatch(updateStateChange({ categories }));
      dispatch(updateStateChange({ total }));
    } finally {
      dispatch(updateStateChange({ loading: false }));
    }
  };
};

export const changePage = (page) => {
  return (dispatch) => {
    dispatch(updateStateChange({ activePage: page }));
    dispatch(getCategories(page));
  };
};

export const searchCategories = (search) => {
  return (dispatch) => {
    dispatch(updateStateChange({ search }));
    dispatch(updateStateChange({ activePage: 1 }));
    dispatch(getCategories(1, search));
  };
};

export const showModal = (form) => {
  return async (dispatch) => {
    dispatch(
      updateStateChange({ selected: null, imageData: null, isModalOpen: true })
    );
    form.resetFields();
  };
};

export const controlModal = (payload) => {
  return (dispatch) => {
    dispatch(updateStateChange({ isModalOpen: payload }));
  };
};

export const uploadImage = (file) => {
  return async (dispatch) => {
    try {
      dispatch(updateStateChange({ imageLoading: true }));
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await request.post("upload", formData);
      dispatch(updateStateChange({ imageData: data }));
    } finally {
      dispatch(updateStateChange({ imageLoading: false }));
    }
  };
};

export const sendCategories = (values, selected, form, search, activePage) => {
  return async (dispatch) => {
    try {
      dispatch(updateStateChange({ isModalLoading: true }));
      selected === null
        ? await request.post("category", values)
        : await request.put(`category/${selected}`, values);
      dispatch(updateStateChange({ isModalOpen: false, imageData: null }));
      dispatch(getCategories(activePage, search));
      form.resetFields();
    } finally {
      dispatch(updateStateChange({ isModalLoading: false }));
    }
  };
};

export const editCategories = (form, id) => {
  return async (dispatch) => {
    dispatch(updateStateChange({ isModalOpen: true, selected: id }));
    const { data } = await request.get(`category/${id}`);
    dispatch(updateStateChange({ imageData: data?.photo }));
    form.setFieldsValue(data);
  };
};

export const deleteCategories = (id, search) => {
  return async (dispatch) => {
    await request.delete(`category/${id}`);
    dispatch(getCategories(1, search));
    dispatch(updateStateChange({ activePage: 1 }));
  };
};
