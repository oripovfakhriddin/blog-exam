import "./dashboardStyle.scss";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../redux/actions/categories";
import { Fragment } from "react";
import { Card, Col, Image, Row, Spin } from "antd";
import { getPosts } from "../../../redux/actions/posts";
import { getUsers } from "../../../redux/actions/users";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { total: totalCate, loading: loadingCate } = useSelector(
    (state) => state.categories
  );
  const { total: totalPosts, loading: loadingPosts } = useSelector(
    (state) => state.posts
  );
  const { total: totalUsers, loading: loadingUsers } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getUsers());
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <Fragment>
      <Spin
        tip="Loading"
        size="large"
        spinning={loadingCate && loadingPosts && loadingUsers}
      >
        <Row center="xs" gutter={[24, 24]}>
          <Col className="gutter-row" xs={24} sm={16} md={12} lg={8}>
            <Card
              hoverable
              style={{
                padding: "20px",
                width: 340,
                backgroundColor: "#5a595a",
              }}
              cover={
                <Image
                  style={{
                    borderRadius: "10px",
                  }}
                  height={250}
                  alt="example"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_upzZ7ljAZIdBCo1AL1A3BPA5i_b2K1HI4w&usqp=CAU"
                />
              }
            >
              <h3 style={{ color: "white" }}>
                Users:{" "}
                {loadingUsers ? (
                  <Spin spinning={loadingUsers} size="small" />
                ) : (
                  totalUsers
                )}
              </h3>
            </Card>
          </Col>
          <Col className="gutter-row" xs={24} sm={16} md={12} lg={8}>
            <Card
              hoverable
              style={{
                padding: "20px",
                width: 340,
                backgroundColor: "#5a595a",
              }}
              cover={
                <Image
                  style={{
                    borderRadius: "10px",
                  }}
                  height={250}
                  alt="example"
                  src="https://static6.depositphotos.com/1112859/621/i/450/depositphotos_6219942-stock-photo-search-of-data-isolated-3d.jpg"
                />
              }
            >
              <h3 style={{ color: "white" }}>
                Categories:{" "}
                {loadingCate ? (
                  <Spin spinning={loadingCate} size="small" />
                ) : (
                  totalCate
                )}
              </h3>
            </Card>
          </Col>
          <Col className="gutter-row" xs={24} sm={16} md={12} lg={8}>
            <Card
              hoverable
              style={{
                padding: "20px",
                width: 340,
                backgroundColor: "#5a595a",
              }}
              cover={
                <Image
                  style={{
                    borderRadius: "10px",
                  }}
                  height={250}
                  alt="Posts"
                  src="https://media.sproutsocial.com/uploads/2022/04/Best-times-to-post-2022_BTTP-Social-Media.jpg"
                />
              }
            >
              <h3 style={{ color: "white" }}>
                Posts:{" "}
                {loadingPosts ? (
                  <Spin spinning={loadingPosts} size="small" />
                ) : (
                  totalPosts
                )}
              </h3>
            </Card>
          </Col>
          <Col className="gutter-row" xs={24} sm={16} md={12} lg={8}>
            <Card
              hoverable
              style={{
                padding: "20px",
                width: 340,
                backgroundColor: "#5a595a",
              }}
              cover={
                <Image
                  style={{
                    borderRadius: "10px",
                  }}
                  height={250}
                  alt="Posts"
                  src="https://media.sproutsocial.com/uploads/2022/04/Best-times-to-post-2022_BTTP-Social-Media.jpg"
                />
              }
            >
              <h3 style={{ color: "white" }}>
                Posts:{" "}
                {loadingPosts ? (
                  <Spin spinning={loadingPosts} size="small" />
                ) : (
                  totalPosts
                )}
              </h3>
            </Card>
          </Col>
        </Row>
      </Spin>
    </Fragment>
  );
};

export default DashboardPage;
