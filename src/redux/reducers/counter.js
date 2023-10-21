import { DECREMENT, INCREMENT } from "../types/counter";

const initialState = {
  counter: 0,
};

const counterReducer = (state = initialState, { type, payload }) => {
  const { counter } = state;
  switch (type) {
    case INCREMENT:
      return { ...state, counter: counter + payload };
    case DECREMENT:
      return { ...state, counter: counter - payload };
  }
  return state
};

export default counterReducer