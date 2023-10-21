import { Fragment, useEffect } from "react";
import "./postspage.scss";
import { useDispatch, useSelector } from "react-redux";
import { Button, Flex, Image, Input, Pagination, Space, Table } from "antd";
import { LIMIT_POSTS } from "../../../constants";
import {
  changePage,
  getPosts,
  searchPosts,
} from "../../../redux/actions/posts";
import { getCatePostImage } from "../../../utils";
import { Link } from "react-router-dom";
const PostsPage = () => {
  const dispatch = useDispatch();
  const { posts, loading, total, activePage, search } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const columns = [
    {
      title: "Image",
      dataIndex: "photo",
      key: "photo",
      render: (data) => (
        <Image height={100} width={150} src={getCatePostImage(data)} />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (data) => <p>{data?.["name"]}</p>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (data) => <p>{data?.slice(0, 20)}...</p>,
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (data) => {
        return (
          <Space size="middle">
            <Button type="primary">Edit</Button>
            <Button type="primary" danger>
              Delete
            </Button>
            <Link to={`/blogs /${data}`} type="primary">
              More
            </Link>
          </Space>
        );
      },
    },
  ];

  return (
    <Fragment>
      <Table
        title={() => (
          <Flex justify="space-between" gap={36} align="center">
            <h1>Posts ({total})</h1>
            <Input
              value={search}
              onChange={(e) => dispatch(searchPosts(e.target.value))}
              style={{ width: "auto", flexGrow: 1 }}
              placeholder="Searching..."
            />
            <Button type="dashed">Add posts</Button>
          </Flex>
        )}
        pagination={false}
        loading={loading}
        columns={columns}
        dataSource={posts}
      />
      {total > LIMIT_POSTS ? (
        <Pagination
          total={total}
          current={activePage}
          pageSize={LIMIT_POSTS}
          onChange={(page) => {
            changePage(page);
          }}
        />
      ) : null}
    </Fragment>
  );
};

export default PostsPage;
