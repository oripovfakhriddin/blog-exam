import { Fragment } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "./allCategoryCardStyle.scss";
import { getCatePostImage } from "../../../utils";

const AllCategoryCard = ({ name, _id, description, photo }) => {
  return (
    <Fragment>
      <NavLink to={`/category/${_id}`} className="category__card__box">
        <div className="category__card__img__box">
          <img
            src={
              getCatePostImage(photo) &&
              "https://static.thenounproject.com/png/1194689-200.png"
            }
            alt={name}
          />
        </div>
        <div className="category__content__box">
          <h2 className="category__card__title">{name}</h2>
          <p className="category__card__text"> {description} </p>
        </div>
      </NavLink>
    </Fragment>
  );
};

AllCategoryCard.propTypes = {
  name: PropTypes.string,
  _id: PropTypes.string,
  description: PropTypes.string,
  photo: PropTypes.object,
};

export default AllCategoryCard;
