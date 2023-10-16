import { Fragment } from "react"
import OurCard from "../../../components/allCards/ourCard/OurCard"

import FirstImage from "../../../assets/images/about_icon.png"
import SecondImage from "../../../assets/images/about__image.png"



import "./aboutStyle.scss"

const AboutPage = () => {
  return (
    <Fragment>
      <section id="our">
        <div className="container">
          <div className="our__box">
            <OurCard 
              title="Creating valuable content for creatives all around the world"
              content="Our mision"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus." />
            <OurCard 
              title="Creating valuable content for creatives all around the world"
              content="Our mision"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus." />
          </div>
          
        </div>
      </section>
      <section id="our__team">
        <div className="container">
          <div className="our__team__container__firts">
            <div className="first">
              <h2 className="title">
                Our team of creatives
              </h2>
              <h4 className="text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
              </h4>
              <p className="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.
              </p>
            </div>
            <div className="about__image__box">
              <img src={FirstImage} alt="Image" />
            </div>
          </div>
          <div className="our__team__container__second">
            <div className="about__image__box">
              <img src={SecondImage} alt="Image" />
            </div>
            <div>
              <h2 className="title">
                Why we started this Blog
              </h2>
              <h4 className="text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
              </h4>
              <p className="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default AboutPage