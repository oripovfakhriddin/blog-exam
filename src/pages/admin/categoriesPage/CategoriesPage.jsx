import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Flex, Image, Input, Pagination, Space, Table } from "antd";
import {
  changePage,
  getCategories,
  searchCategories,
} from "../../../redux/actions/categories";
import { LIMIT_CATEGORY } from "../../../constants";

import "./categoriespage.scss";
import { getCatePostImage } from "../../../utils";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { categories, total, loading, activePage, search } = useSelector(
    (state) => state.categories
  );
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const columns = [
    {
      title: "Image",
      dataIndex: "photo",
      key: "photo",
      render: (data) => <Image height={50} src={getCatePostImage(data)} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (data) => <p>{data.slice(0, 50)}...</p>,
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
            <h1>Categories ({total})</h1>
            <Input
              value={search}
              onChange={(e) => dispatch(searchCategories(e.target.value))}
              style={{ width: "auto", flexGrow: 1 }}
              placeholder="Searching..."
            />
            <Button type="dashed">Add category</Button>
          </Flex>
        )}
        pagination={false}
        loading={loading}
        dataSource={categories}
        columns={columns}
      />
      {total > LIMIT_CATEGORY ? (
        <Pagination
          key="salom"
          total={total}
          pageSize={LIMIT_CATEGORY}
          current={activePage}
          onChange={(page) => dispatch(changePage(page))}
        />
      ) : null}
    </Fragment>
  );
};

export default CategoriesPage;
