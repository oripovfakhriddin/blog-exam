import { Fragment, useEffect } from "react";
import "./postspage.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
  Upload,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { LIMIT_POSTS } from "../../../constants";
import {
  changePage,
  controlModal,
  deletePosts,
  editPosts,
  getPosts,
  searchPosts,
  sendPosts,
  showModal,
  uploadImage,
} from "../../../redux/actions/posts";
import { getCatePostImage } from "../../../utils";
import { Link } from "react-router-dom";
import { getCategories } from "../../../redux/actions/categories";
const PostsPage = () => {
  const dispatch = useDispatch();
  const {
    posts,
    loading,
    total,
    activePage,
    search,
    imageLoading,
    isModalLoading,
    isModalOpen,
    imageData,
    selected,
    postsCategories,
  } = useSelector((state) => state.posts);
  const { categories } = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getPosts());
  }, [dispatch]);

  const [form] = Form.useForm();

  const handleOk = async () => {
    const values = await form.validateFields();
    values.photo = imageData?._id;
    dispatch(sendPosts(values, form, selected, search, activePage));
  };

  const closeModal = () => {
    dispatch(controlModal(false));
  };

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
      title: "Created BY",
      dataIndex: "user",
      key: "user",
      render: (data) => (
        <Fragment>
          <p>
            {data?.first_name} {data?.last_name}
          </p>
          <p>
            Role: <span style={{ color: "red" }}>{data?.role}</span>
          </p>
        </Fragment>
      ),
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
            <Button
              onClick={() => {
                dispatch(editPosts(form, data));
              }}
              type="primary"
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                Modal.confirm({
                  title: "Do you want to delete this posts?",
                  onOk: () => dispatch(deletePosts(data, search)),
                });
              }}
              type="primary"
              danger
            >
              Delete
            </Button>
            <Link to={`/blogs/${data}`} type="primary">
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
            <Button
              onClick={() => {
                dispatch(showModal(form));
              }}
              type="dashed"
            >
              Add posts
            </Button>
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
          onChange={(page) => dispatch(changePage(page))}
        />
      ) : null}

      <Modal
        title="Category data"
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add category" : "Save category"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
      >
        <Form
          name="user"
          autoComplete="off"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          form={form}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            onChange={(e) => dispatch(uploadImage(e.file.originFileObj))}
          >
            <div>
              {imageLoading ? (
                <LoadingOutlined />
              ) : imageData ? (
                <img
                  src={getCatePostImage(imageData)}
                  alt="avatar"
                  style={{
                    width: "100%",
                  }}
                />
              ) : (
                <div>
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </div>
              )}
            </div>
          </Upload>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Tags"
            name="tags"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item name="category" label="Select">
            <Select value={postsCategories}>
              {categories?.map((category) => {
                return (
                  <Select.Option key={category._id} value={category._id}>
                    {category?.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default PostsPage;
