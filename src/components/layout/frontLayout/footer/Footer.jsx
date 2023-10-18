import Facebook from "../../../../assets/icons/facebook-negative.svg";
import Twitter from "../../../../assets/icons/twitter-negative.svg";
import Instagram from "../../../../assets/icons/instagram-negative.svg";
import Linkedin from "../../../../assets/icons/linked-in-negative.svg";

import "./footerStyle.scss";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";

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
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="nav__item">
            <NavLink to="/blogs">Blog</NavLink>
          </li>
          <li className="nav__item">
            <NavLink to="/about">About Us</NavLink>
          </li>
          <li className="nav__item">
            <NavLink to="/register">Register</NavLink>
          </li>
          <li className="nav__item login__item">
            {isAuthenticated ? (
              <NavLink className="login__item__link" to="/account">
                Account
              </NavLink>
            ) : (
              <NavLink className="login__item__link" to="/login">
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
