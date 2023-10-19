import Facebook from "../../../../assets/icons/facebook-negative.svg";
import Twitter from "../../../../assets/icons/twitter-negative.svg";
import Instagram from "../../../../assets/icons/instagram-negative.svg";
import Linkedin from "../../../../assets/icons/linked-in-negative.svg";
import AboutIcon from "../../../../assets/icons/about__icon.svg";
import AccountIcon from "../../../../assets/icons/account__icon.svg";
import HomeIcon from "../../../../assets/icons/home__icon.svg";
import PostIcon from "../../../../assets/icons/post__icon.svg";
import RegIcon from "../../../../assets/icons/reg__icon.svg";
import LogIcon from "../../../../assets/icons/login__icon.svg";

import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import "./footerStyle.scss";

const Footer = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <footer>
      <div className="container footer__container">
        <div className="footer__left__box">
          <p>Finstreet 118 2561 Fintown</p>
          <div>
            <a
              className="email__link"
              href="mailto: fakhriddinoripov0731@gmail.com"
            >
              Hello@finsweet.com
            </a>
            <a href="tel: +998 90 6949416"> 020 7993 2905 </a>
          </div>
        </div>
        <div className="footer__right__box">
          <ul className="footer__list">
            <li className="footer__item">
              <a target="true" href="">
                <img src={Facebook} alt="Social App" />
              </a>
            </li>
            <li className="footer__item">
              <a target="true" href="">
                <img src={Twitter} alt="Social App" />
              </a>
            </li>
            <li className="footer__item">
              <a target="true" href="">
                <img src={Instagram} alt="Social App" />
              </a>
            </li>
            <li className="footer__item">
              <a target="true" href="">
                <img src={Linkedin} alt="Social App" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__navbar">
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink className="login__item__link" to="/">
              <img src={HomeIcon} alt="" />
              <span>Home</span>
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink className="login__item__link" to="/blogs">
              <img src={PostIcon} alt="" />
              <span>Blog</span>
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink className="login__item__link" to="/about">
              <img src={AboutIcon} alt="" />
              <span>About</span>
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink className="login__item__link" to="/register">
              <img src={RegIcon} alt="" />
              <span>Register</span>
            </NavLink>
          </li>
          <li className="nav__item">
            {isAuthenticated ? (
              <NavLink className="login__item__link" to="/account">
                <img src={AccountIcon} alt="" />
                <span>Account</span>
              </NavLink>
            ) : (
              <NavLink className="login__item__link" to="/login">
                <img src={LogIcon} alt="" />
                <span>Login</span>
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
