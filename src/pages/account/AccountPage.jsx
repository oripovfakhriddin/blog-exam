import { Fragment, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { AuthContext } from "../../context/AuthContext";
import getUserImage from "../../utils";

import "./accountPageStyle.scss";
import { trueDate } from "../../constants";

const AccountPage = () => {
  const { user, userLoading, logOutFunc } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Fragment>
      <section id="user">
        {userLoading ? (
          <h1>LOADING....</h1>
        ) : (
          <div className="container">
            <div className="user__box">
              <div className="user__img__box">
                <LazyLoadImage
                  effect="blur"
                  src={
                    user?.photo
                      ? getUserImage(user?.photo)
                      : "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
                  }
                  alt="salom"
                />
              </div>
              <div className="user__info__box">
                <div>
                  <p className="user__info__name">Full Name: </p>
                  <h2 className="user__info__title">
                    {user?.first_name} {user?.last_name}
                  </h2>
                </div>
                <div>
                  <p className="user__info__name">Bithday: </p>
                  <p className="user__info__title">
                    {trueDate(user?.birthday)}
                  </p>
                </div>
                <div>
                  <p className="user__info__name">Address: </p>
                  <p className="user__info__title">{user?.address}</p>
                </div>
                <div>
                  <p className="user__info__name">Email: </p>
                  <p className="user__info__title">{user?.email}</p>
                </div>
                <div>
                  <p className="user__info__name">Info: </p>
                  <p className="user__info__title">{user?.info}</p>
                </div>
                <div>
                  <p className="user__info__name">Phone Number: </p>
                  <p className="user__info__title">{user?.phoneNumber}</p>
                </div>
              </div>
            </div>
            <div className="action__user__box">
              <NavLink className="edit__user__btn" to="/account/edit">
                Edit
              </NavLink>
              <button
                className="delete__user__btn"
                onClick={() => {
                  logOutFunc(navigate);
                }}
              >
                Log out{" "}
              </button>
            </div>
          </div>
        )}
      </section>
    </Fragment>
  );
};

export default AccountPage;
