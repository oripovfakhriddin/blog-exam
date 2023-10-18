import { Fragment } from "react";
import PropTypes from "prop-types";
import PostsCard from "../allCards/postsCard/PostsCard";

const PostsPaginate = ({ data, deletePost }) => {
  return (
    <Fragment>
      {data?.map((post) => {
        return <PostsCard key={post?._id} {...post} deletePost={deletePost} />;
      })}
    </Fragment>
  );
};

PostsPaginate.propTypes = {
  data: PropTypes.array,
  deletePost: PropTypes.func
};

export default PostsPaginate;
