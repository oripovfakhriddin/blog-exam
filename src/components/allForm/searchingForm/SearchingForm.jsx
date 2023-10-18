import { Fragment } from "react";
import PropTypes from "prop-types";

import "./searchingStyle.scss";

const SearchingForm = ({ searchValue, handleSearchClick }) => {
  return (
    <Fragment>
      <div className="container">
        <form className="searching__form">
          <input
            value={searchValue}
            onChange={(e) => {
              handleSearchClick(e.target.value);
            }}
            placeholder="Searching..."
            type="text"
          />
        </form>
      </div>
    </Fragment>
  );
};
SearchingForm.propTypes = {
  searchValue: PropTypes.string,
  handleSearchClick: PropTypes.func,
};

export default SearchingForm;
