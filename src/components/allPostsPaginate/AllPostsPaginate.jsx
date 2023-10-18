import { Fragment } from "react";
import PropTypes from "prop-types";
import AllPostsCard from "../allCards/allPostsCard/AllPostsCard";

const AllPostsPaginate = ({ data, categoryId }) => {
  return (
    <Fragment>
      {data.map((post) => { 
        if (post?.category?._id === categoryId) {
          return <AllPostsCard key={post._id} {...post} />; 
        }
        return <AllPostsCard key={post._id} {...post} />; 
      })}
    </Fragment>
  );
};

AllPostsPaginate.propTypes = {
  data: PropTypes.array,
  categoryId: PropTypes.string,
};

export default AllPostsPaginate;
