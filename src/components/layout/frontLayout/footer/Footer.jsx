
import Facebook from "../../../../assets/icons/facebook-negative.svg"
import Twitter from "../../../../assets/icons/twitter-negative.svg"
import Instagram from "../../../../assets/icons/instagram-negative.svg"
import Linkedin from "../../../../assets/icons/linked-in-negative.svg"

import "./footerStyle.scss"

const Footer = () => {
  return (
    <footer>
      <div className="container footer__container">
        <div className="footer__left__box">
          <p>Finstreet 118 2561 Fintown</p>
          <div>
            <a className="email__link" href="mailto: fakhriddinoripov0731@gmail.com">Hello@finsweet.com</a>
            <a href="tel: +998 90 6949416"> 020 7993 2905 </a>
          </div>
        </div>
        <div className="footer__right__box">
          <ul className="footer__list">
            <li className="footer__item">
              <a target="true" href="">
                <img src={ Facebook } alt="Social App" />
              </a>
            </li>
            <li className="footer__item">
              <a target="true" href="">
                <img src={ Twitter } alt="Social App" />
              </a>
            </li>
            <li className="footer__item">
              <a target="true" href="">
                <img src={ Instagram } alt="Social App" />
              </a>
            </li>
            <li className="footer__item">
              <a target="true" href="">
                <img src={ Linkedin } alt="Social App" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer