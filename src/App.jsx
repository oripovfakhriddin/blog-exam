import { Fragment, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FrontLayout from "./components/layout/frontLayout";
import BlogPage from "./pages/public/blogPage/BlogPage";
import AboutPage from "./pages/public/aboutPage/AboutPage";
import RegisterPage from "./pages/public/registerPage/RegisterPage";
import MyPostsPage from "./pages/user/myPostsPage/MyPostsPage";
import LoginPage from "./pages/public/loginPage/LoginPage";
import AccountPage from "./pages/account/AccountPage";
import DashboardPage from "./pages/admin/dashboardPage/DashboardPage";
import NotFoundPage from "./pages/public/notFoundPage/NotFoundPage";
import HomePage from "./pages/public/homePage/HomePage";
import { AuthContext } from "./context/AuthContext";
import AccountEditPage from "./pages/accountEditPage/AccountEditPage";
import CategoryPage from "./pages/public/categoryPage/CategoryPage";
import PostPage from "./pages/public/postPage/PostPage";
import AdminLayout from "./components/layout/adminLayout/AdminLayout";
import UsersPage from "./pages/admin/usersPage/UsersPage";
import CategoriesPage from "./pages/admin/categoriesPage/CategoriesPage";
import PostsPage from "./pages/admin/postsPage/PostsPage";

function App() {
  const { role, isAuthenticated } = useContext(AuthContext);

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route element={<FrontLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/blogs/:postsId" element={<PostPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {isAuthenticated ? (
              <Route path="/myposts" element={<MyPostsPage />} />
            ) : null}
            <Route path="/login" element={<LoginPage />} />
            {isAuthenticated ? (
              <Route path="/account" element={<AccountPage />} />
            ) : null}
            {isAuthenticated ? (
              <Route path="/account/edit" element={<AccountEditPage />} />
            ) : null}
          </Route>
          {isAuthenticated && role === "admin" ? (
            <Route element={<AdminLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/posts" element={<PostsPage />} />
            </Route>
          ) : null}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
