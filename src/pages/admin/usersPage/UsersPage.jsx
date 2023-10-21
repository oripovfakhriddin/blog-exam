import { Fragment } from "react";
import "./userspage.scss";
import { LIMIT_USERS } from "../../../constants";
import { Button, Flex, Image, Input, Pagination, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  changePage,
  getUsers,
  searchUsers,
} from "../../../redux/actions/users";
import getUserImage from "../../../utils";
import { Link } from "react-router-dom";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { total, users, loading, activePage, search } = useSelector(
    (state) => state.users
  );
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);


  const columns = [
    {
      title: "Image",
      dataIndex: "photo",
      key: "photo",
      render: (data) => <Image height={50} src={getUserImage(data)} />,
    },
    {
      title: "Full name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (data) => (
        <Space size="middle">
          <Button type="primary">Edit</Button>
          <Button type="primary" danger>
            Delete
          </Button>
          <Link to={`/categories/${data}`} type="primary">
            See posts
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <Fragment>
      <Table
        scroll={{
          x: 1000,
        }}
        title={() => (
          <Flex justify="space-between" gap={36} align="center">
            <h1>Users ({total})</h1>
            <Input
              value={search}
              onChange={(e) => dispatch(searchUsers(e.target.value))}
              style={{ width: "auto", flexGrow: 1 }}
              placeholder="Searching..."
            />
            <Button type="dashed">Add users</Button>
          </Flex>
        )}
        pagination={false}
        loading={loading}
        dataSource={users}
        columns={columns}
      />
      {total > LIMIT_USERS ? (
        <Pagination
          total={total}
          pageSize={LIMIT_USERS}
          current={activePage}
          onChange={(page) => dispatch(changePage(page))}
        />
      ) : null}
    </Fragment>
  );
};

export default UsersPage;
