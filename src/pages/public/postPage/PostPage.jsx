import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import request from "../../../server/request";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getCatePostImage } from "../../../utils";
import { trueDate } from "../../../constants";
import User from "../../../assets/icons/user.png";
import "./postpage.scss";

const PostPage = () => {
  let { postsId } = useParams();
  const [data, setdata] = useState(null);

  useEffect(() => {
    const getData = async () => {
      let { data } = await request.get(`post/${postsId}`);
      setdata(data);
    };
    getData();
  }, [postsId]);

  return (
    <Fragment>
      <div className="container">
        <div className="post-content">
          <LazyLoadImage
            className="post-image"
            effect="blur"
            src={getCatePostImage(data?.photo)}
          />
        </div>
        <div>
          <div className="container-md post-text">
            <div className="user">
              <img className="user-icon" src={User} alt="" />
              <div className="user-info">
                <h5>
                  {data?.user?.first_name} {data?.user?.last_name}
                </h5>
                <h6>Posted on {trueDate(data?.createdAt)}</h6>
              </div>
            </div>
            <h2>{data?.title}</h2>
            <p>{data?.description}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PostPage;
