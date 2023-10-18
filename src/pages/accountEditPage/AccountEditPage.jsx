import { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./accounteditStyle.scss";
import getUserImage from "../../utils";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import editUserSchema from "../../schema/editUserSchema";
import request from "../../server/request";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import editUserPasswordSchema from "../../schema/editUserPasswordSchema";

const AccountEditPage = () => {
  const navigate = useNavigate();
  const { user, getUser } = useContext(AuthContext);
  const [userPhoto, setUserPhoto] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(editUserSchema) });

  const {
    register: chpregister,
    handleSubmit: chphandleSubmit,
    formState: { errors: chperrors },
  } = useForm({ resolver: yupResolver(editUserPasswordSchema) });

  useEffect(() => {
    setUserPhoto(user?.photo);
    let newUser = { ...user, ["birthday"]: user?.birthday?.split("T")[0] };
    reset({ ...newUser });
  }, [user?.photo, reset, user]);

  const handleChange = async (e) => {
    try {
      let formData= new FormData();
      formData.append("file", e.file.originFileObj);
      await request.put("auth/upload", formData)
      getUser()
    } catch (err) {
      toast.error(err.response.data)
    }
  }

  const handleSubmitForm = async (data) => {
    await request.put("auth/details", data);
    navigate("/account");
    getUser();
    toast.success("Edit user successfuly");
  };

  const changePasswordUser = async (data) => {
    try {
      if (data.confirmPassword === data.newPassword) {
        await request.put("auth/password", data);
        toast.success("Password edit successfuly");
        navigate("/account")
      } else {
        toast.error("New password !== Confirm Password");
      }
    } catch (err) {
      toast.error(err.response.data)
    }
  };

  return (
    <Fragment>
      <section id="user__edit">
        <div className="container">
          <Tabs>
            <TabList>
              <Tab>Edit user</Tab>
              <Tab>Change Password</Tab>
            </TabList>

            <TabPanel>
              <form onSubmit={handleSubmit(handleSubmitForm)}>
                <div className="form__box">
                  <div className="upload__image__box">
                    <h2>Add Image:</h2>
                    <input onChange={handleChange} type="file" />
                    <div>
                      <img
                        src={
                          userPhoto
                            ? getUserImage(userPhoto)
                            : "https://cdn.iconscout.com/icon/free/png-256/free-laptop-user-1-1179329.png?f=webp"
                        }
                      />
                    </div>
                  </div>
                  <div className="upload__info__box">
                    <div>
                      <label>First name</label>
                      <input
                        placeholder="First name"
                        className="user__info__input"
                        {...register("first_name")}
                      />
                      {errors.first_name ? (
                        <p className="text-danger">
                          {errors.first_name.message}
                        </p>
                      ) : null}
                    </div>
                    <div>
                      <label>Last name </label>
                      <input
                        placeholder="Last name"
                        className="user__info__input"
                        {...register("last_name")}
                      />
                      {errors.last_name ? (
                        <p className="text-danger">
                          {errors.last_name.message}
                        </p>
                      ) : null}
                    </div>
                    <div>
                      <label>Username</label>
                      <input
                        placeholder="Username"
                        className="user__info__input"
                        {...register("username")}
                      />
                      {errors.username ? (
                        <p className="text-danger">{errors.username.message}</p>
                      ) : null}
                    </div>
                    <div>
                      <label>Address</label>
                      <input
                        placeholder="Address"
                        className="user__info__input"
                        {...register("address")}
                      />
                      {errors.address ? (
                        <p className="text-danger">{errors.address.message}</p>
                      ) : null}
                    </div>
                    <div>
                      <label>Email</label>
                      <input
                        placeholder="Email"
                        className="user__info__input"
                        {...register("email")}
                      />
                      {errors.email ? (
                        <p className="text-danger">{errors.email.message}</p>
                      ) : null}
                    </div>
                    <div>
                      <label>Phone Number</label>
                      <input
                        placeholder="Phone Number"
                        className="user__info__input"
                        {...register("phoneNumber")}
                      />
                      {errors.phoneNumber ? (
                        <p className="text-danger">
                          {errors.phoneNumber.message}
                        </p>
                      ) : null}
                    </div>
                    <div>
                      <label>Info</label>
                      <input
                        placeholder="Info"
                        className="user__info__input"
                        {...register("info")}
                      />
                      {errors.info ? (
                        <p className="text-danger">{errors.info.message}</p>
                      ) : null}
                    </div>
                    <div>
                      <label>Birthday</label>
                      <input
                        type="date"
                        placeholder="Birthday"
                        className="user__info__input"
                        {...register("birthday")}
                      />
                      {errors.birthday ? (
                        <p className="text-danger">{errors.birthday.message}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="edit__btn__box">
                  <button type="submit" className="edit__btn">
                    Save User
                  </button>
                </div>
              </form>
            </TabPanel>
            <TabPanel>
              <div className="change__password__box">
                <form onSubmit={chphandleSubmit(changePasswordUser)}>
                  <div>
                    <label>Current password</label>
                    <input
                      {...chpregister("currentPassword")}
                      placeholder="Old password"
                      type="password"
                    />
                    {chperrors.currentPassword ? (
                      <p className="text-danger">
                        {chperrors.currentPassword.message}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label>New password</label>
                    <input
                      {...chpregister("newPassword")}
                      placeholder="New password"
                      type="password"
                    />
                    {chperrors.newPassword ? (
                      <p className="text-danger">
                        {chperrors.newPassword.message}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label>Confirm password</label>
                    <input
                      {...chpregister("confirmPassword")}
                      placeholder="Confirm password"
                      type="password"
                    />
                    {chperrors.confirmPassword ? (
                      <p className="text-danger">
                        {chperrors.confirmPassword.message}
                      </p>
                    ) : null}
                  </div>
                  <button type="submit">Save Password</button>
                </form>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </section>
    </Fragment>
  );
};

export default AccountEditPage;
