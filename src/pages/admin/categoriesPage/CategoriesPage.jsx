import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
  Upload,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  changePage,
  controlModal,
  deleteCategories,
  editCategories,
  getCategories,
  searchCategories,
  sendCategories,
  showModal,
  uploadImage,
} from "../../../redux/actions/categories";
import { LIMIT_CATEGORY } from "../../../constants";

import "./categoriespage.scss";
import { getCatePostImage } from "../../../utils";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const {
    categories,
    total,
    loading,
    activePage,
    search,
    isModalLoading,
    isModalOpen,
    imageData,
    imageLoading,
    selected,
  } = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const [form] = Form.useForm();

  const handleOk = async () => {
    const values = await form.validateFields();
    values.photo = imageData;
    dispatch(sendCategories(values, selected, form, search, activePage));
  };

  const closeModal = () => {
    dispatch(controlModal(false));
  };

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
      render: (id) => (
        <Space size="middle">
          <Button
            onClick={() => {
              dispatch(editCategories(form, id));
            }}
            type="primary"
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              Modal.confirm({
                title: "Do you want to delete this category?",
                onOk: () => dispatch(deleteCategories(id, search)),
              });
            }}
            type="primary"
            danger
          >
            Delete
          </Button>
          <Link to={`/categories/${id}`} type="primary">
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
            <Button
              onClick={() => {
                dispatch(showModal(form));
              }}
              type="dashed"
            >
              Add category
            </Button>
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
            label="Name"
            name="name"
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
        </Form>
      </Modal>
    </Fragment>
  );
};

export default CategoriesPage;
