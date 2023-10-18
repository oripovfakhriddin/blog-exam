import { Fragment } from "react";
import PropTypes from "prop-types";
import "./postsCard.scss";
import { Link } from "react-router-dom";
import { getCatePostImage } from "../../../utils";

const PostsCard = ({ category, description, photo, title, _id, deletePost}) => {
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
          <div className="action__box" >
            <button className="btn btn__edit">Edit</button>
            <button onClick={()=>{deletePost(_id)}} className="btn btn__delete">Delete</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

PostsCard.propTypes = {
  category: PropTypes.object,
  description: PropTypes.string,
  photo: PropTypes.object,
  title: PropTypes.string,
  _id: PropTypes.string,
  deletePost: PropTypes.func
};

export default PostsCard;
