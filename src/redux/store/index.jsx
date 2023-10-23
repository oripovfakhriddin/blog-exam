import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { applyMiddleware, combineReducers, createStore } from "redux";
import counterReducer from "../reducers/counter";
import languageReducer from "../reducers/language";
import categoryReducer from "../reducers/categories";
import usersReducer from "../reducers/users";
import thunk from "redux-thunk";
import { postsReducer } from "../reducers/posts";
import { commentsReducer } from "../reducers/comments";

const rootReducer = combineReducers({
  counter: counterReducer,
  language: languageReducer,
  categories: categoryReducer,
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));

const StoreProvider = ({ children }) => {
  return <Provider store={Store}>{children}</Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node,
};

export default StoreProvider;
