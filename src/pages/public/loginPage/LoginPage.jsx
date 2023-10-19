import { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

import { AuthContext } from "../../../context/AuthContext";

import request from "../../../server/request";
import { ROLE, TOKEN } from "../../../constants";
import loginSchema from "../../../schema/loginSchema";

import "./loginStyle.scss";

const LoginPage = () => {
  const { setRole, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (loginData) => {
    try {
      let {
        data: { token, role },
      } = await request.post("auth/login", loginData);
      setRole(role);
      setIsAuthenticated(true);
      Cookies.set(TOKEN, token);
      localStorage.setItem(ROLE, role);

      request.defaults.headers.Authorization = `Bearer ${token}`;

      if (role === "user") {
        navigate("/myposts");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <Fragment>
      <div className="container form__container">
        <h1 className="login__title">Login</h1>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <input placeholder="Username" {...register("username")} />
          {errors.username ? (
            <p className="text-danger">{errors.username.message}</p>
          ) : null}
          <input
            placeholder="Password"
            {...register("password")}
            type="password"
          />
          {errors.password ? (
            <p className="text-danger"> {errors.password.message}</p>
          ) : null}
          <input className="form__btn" value="Login" type="submit" />
        </form>
      </div>
    </Fragment>
  );
};

export default LoginPage;
