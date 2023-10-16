import { Fragment } from "react"
import PropTypes from "prop-types"
import "./heroSection.scss"
import { NavLink } from "react-router-dom";
import { trueDate } from "../../constants";

const HeroSection = ({data}) => {
  const { category, description, title, user, _id, createdAt } = data
  return (
    <Fragment>
      <div className="container hero__container">
        <h4 className="hero__category__title">Posted on {category?.name}</h4>
        <h2 className="hero__title">{title}</h2>
        <p className="hero__created__at">By <span>{user?.first_name} {user?.last_name} </span>| {trueDate(createdAt)} </p>
        <p className="hero__text">{description}</p>
        <NavLink  to={`blogs? ${_id}`} className="hero__btn" >Read more </NavLink>
      </div>
    </Fragment>
  )
}

HeroSection.propTypes = {
  data: PropTypes.object
}

export default HeroSection