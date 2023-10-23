import { Fragment } from "react";
import "./userspage.scss";
import { LIMIT_USERS } from "../../../constants";
import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
  Upload,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  changePage,
  controlModal,
  deleteUser,
  editUsers,
  getUsers,
  searchUsers,
  sendUsers,
  showModal,
  uploadImage,
} from "../../../redux/actions/users";
import { Link } from "react-router-dom";
import getUserImage from "../../../utils";

const UsersPage = () => {
  const dispatch = useDispatch();
  const {
    total,
    users,
    loading,
    activePage,
    search,
    isModalLoading,
    selected,
    isModalOpen,
    imageLoading,
    imageData,
  } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [form] = Form.useForm();

  const handleOk = async () => {
    const values = await form.validateFields();
    const newValues = { ...values, photo: imageData };
    dispatch(sendUsers(newValues, selected, form, activePage, search));
  };

  const closeModal = () => {
    dispatch(controlModal(false));
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
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
          <Button
            onClick={() => {
              dispatch(editUsers(form, data));
            }}
            type="primary"
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              Modal.confirm({
                title: "Do you want to delete this user?",
                onOk: () => dispatch(deleteUser({ id: data, search })),
              });
            }}
            type="primary"
            danger
          >
            Delete
          </Button>
          <Link to={`/user/${data}`} type="primary">
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
            <Button
              onClick={() => {
                dispatch(showModal(form));
              }}
              type="dashed"
            >
              Add users
            </Button>
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
          onChange={(page) => dispatch(changePage(page, search))}
        />
      ) : null}

      <Modal
        title="Users data"
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add users" : "Save users"}
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
                  src={getUserImage(imageData)}
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
            label="First name"
            name="first_name"
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
            label="Last name"
            name="last_name"
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
            label="Username"
            name="username"
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
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input type="password" />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default UsersPage;
