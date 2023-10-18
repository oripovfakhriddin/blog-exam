import { Fragment } from "react";
import PropTypes from "prop-types";
import PostsCard from "../allCards/postsCard/postsCard";

const PostsPaginate = ({ data }) => {
  return (
    <Fragment>
      {data.map((post) => {
        return <PostsCard key={post._id} {...post} />;
      })}
    </Fragment>
  );
};

PostsPaginate.propTypes = {
  data: PropTypes.array,
};

export default PostsPaginate;