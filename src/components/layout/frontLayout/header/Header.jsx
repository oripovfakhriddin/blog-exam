import { NavLink } from "react-router-dom";
import SiteLogo from "../../../../assets/icons/site-logo.svg";
import "./headerStyle.scss";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import changeLanguage from "../../../../redux/actions/language";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { language: lang, languageType } = useSelector(
    (state) => state.language
  );

  return (
    <header>
      <div className="container header__container">
        <div className="site__logo__box">
          {isAuthenticated ? (
            <NavLink to="/myposts">
              <h2 className="my__posts__title">{lang.myBlogs}</h2>
            </NavLink>
          ) : (
            <NavLink to="/">
              <img src={SiteLogo} alt="Site Logo" />
            </NavLink>
          )}
        </div>
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to="/">{lang.home}</NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/blogs">{lang.blogs}</NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/about">{lang.about}</NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/register">{lang.register}</NavLink>
            </li>
            <li className="nav__item login__item">
              {isAuthenticated ? (
                <NavLink className="login__item__link" to="/account">
                  {lang.account}
                </NavLink>
              ) : (
                <NavLink className="login__item__link" to="/login">
                  {lang.login}
                </NavLink>
              )}
            </li>
            <li>
              <select
                value={languageType}
                onChange={(e) => {
                  dispatch(changeLanguage(e.target.value));
                }}
                name="language"
                id="lang"
                className="language__select"
              >
                <option value="en">EN</option>
                <option value="uz">UZ</option>
              </select>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
