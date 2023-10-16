import { NavLink } from "react-router-dom"
import SiteLogo from "../../../../assets/icons/site-logo.svg"
import "./headerStyle.scss"
import { useContext } from "react"
import { AuthContext } from "../../../../context/AuthContext"

const Header = () => {

  const { isAuthenticated, role } = useContext( AuthContext )

  return (
    <header>
      <div className="container header__container">
        <div className="site__logo__box">
          { isAuthenticated && role === "user" ? <NavLink to="/myposts">
            <h2 className="my__posts__title">My Blogs</h2>
          </NavLink>  : <NavLink to="/">
            <img src={ SiteLogo } alt="Site Logo" />
          </NavLink>}
        </div>
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to="/">
                Home
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/blogs">
                Blog
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/about">
                About Us
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/register">
                Register
              </NavLink>
            </li>
            <li className="nav__item login__item">
              { isAuthenticated ?  <NavLink className="login__item__link" to="/account">
                Account
              </NavLink>  : <NavLink className="login__item__link" to="/login">
                Login
              </NavLink>}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header