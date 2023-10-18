import { Fragment } from "react";
import PropTypes from "prop-types";
import "./allPostsCardStye.scss";
import { Link } from "react-router-dom";
import { ENDPOINT } from "../../../constants";
import { getCatePostImage } from "../../../utils";

const AllPostsCard = ({ category, description, photo, title, _id }) => {
  return (
    <Fragment>
      <div className="container posts__container">
        <div className="posts__img__box">
          <img src={getCatePostImage(photo)} alt={title} />
        </div>
        <div className="posts__content__box">
          <Link className="posts__category__title"> {category?.name} </Link>
          <Link to={`/blogs?${_id}`} className="posts__title">
            {title}
          </Link>
          <p className="posts__description"> {description} </p>
        </div>
      </div>
    </Fragment>
  );
};

AllPostsCard.propTypes = {
  category: PropTypes.object,
  description: PropTypes.string,
  photo: PropTypes.object,
  title: PropTypes.string,
  _id: PropTypes.string,
};

export default AllPostsCard;
