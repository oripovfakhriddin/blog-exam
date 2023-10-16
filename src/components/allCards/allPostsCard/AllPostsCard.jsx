import { Fragment } from "react"
import PropTypes from "prop-types"
import "./allPostsCardStye.scss"
import { Link } from "react-router-dom"
import { ENDPOINT } from "../../../constants"

const AllPostsCard = ({ category, description, photo, title,  }) => {
  return (
    <Fragment>
      <div className="container posts__container">
        <div className="posts__img__box">
          <img src={`${ENDPOINT}upload/${photo._id}.jpg`} alt={title} />
        </div>
        <div className="posts__content__box">
          <Link className="posts__category__title"> { category?.name } </Link>
          <h3 className="posts__title">{ title }</h3>
          <p className="posts__description"> {description} </p>
        </div>
      </div>
    </Fragment>
  )
}

AllPostsCard.propTypes = {
  category: PropTypes.object, 
  description: PropTypes.string,  
  photo: PropTypes.object, 
  title: PropTypes.string, 
}

export default AllPostsCard