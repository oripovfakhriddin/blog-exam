import PropTypes from "prop-types";
import "./ourCardStyle.scss";

const OurCard = ({ content, title, text }) => {
  return (
    <div>
      <h5 className="our__content">{content}</h5>
      <h3 className="our__title">{title}</h3>
      <p className="our__text">{text}</p>
    </div>
  );
};

OurCard.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  content: PropTypes.string,
};

export default OurCard;
