import { Fragment } from "react";
import "./registerStyle.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import registerSchema from "../../../schema/registerSchema";
import request from "../../../server/request";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });
  const navigate = useNavigate()
  const registerFunc = async (data) => {
    try {
      await request.post("auth/register", data)
      navigate("/login")
      toast.success("Registration succesfuly")
    } catch (err) {
      toast.error("Un successfuly")
    }
  };

  return (
    <Fragment>
      <section>
        <div className="container">
          <div className="register__password__box">
            <form onSubmit={handleSubmit(registerFunc)}>
              <label>First name</label>
              <input placeholder="First name" {...register("first_name")} />
              {errors.first_name ? (
                <p className="text-danger">{errors.first_name.message}</p>
              ) : null}
              <label>First name</label>
              <input placeholder="Username" {...register("last_name")} />
              {errors.last_name ? (
                <p className="text-danger">{errors.last_name.message}</p>
              ) : null}
              <label>Username</label>
              <input placeholder="Username" {...register("username")} />
              {errors.username ? (
                <p className="text-danger">{errors.username.message}</p>
              ) : null}
              <label>Password</label>
              <input
                placeholder="Password"
                {...register("password")}
                type="password"
              />
              {errors.password ? (
                <p className="text-danger"> {errors.password.message}</p>
              ) : null}
              <button>Register</button>
            </form>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default RegisterPage;
