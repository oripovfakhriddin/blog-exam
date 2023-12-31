import "./adminLayout.scss";

import { useContext, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  AppstoreOutlined,
  UsergroupAddOutlined,
  EyeOutlined,
} from "@ant-design/icons";

import { Layout, Menu, Button, theme, Modal } from "antd";
import { AuthContext } from "../../../context/AuthContext";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { logOutFunc } = useContext(AuthContext);

  return (
    <Layout>
      <Sider
        className="ofa__admin__asside"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="ofa__admin__logo">
          {collapsed ? "NEWS" : "TATU News"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: "/dashboard",
              icon: <UserOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: "/users",
              icon: <UsergroupAddOutlined />,
              label: <Link to="/users">Users</Link>,
            },
            {
              key: "/categories",
              icon: <AppstoreOutlined />,
              label: <Link to="/categories">Categories</Link>,
            },
            {
              key: "/posts",
              icon: <EyeOutlined />,
              label: <Link to="/posts">Posts</Link>,
            },
            {
              style: {
                maxWidth: "96%",
                width: "100%",
                backgroundColor: "red",
              },
              icon: <UploadOutlined />,
              label: (
                <Button
                  style={{
                    width: "100%",
                    backgroundColor: "red",
                    textAlign: "start",
                  }}
                  type="primary"
                  onClick={() =>
                    Modal.confirm({
                      title: "Do you want to exit ?",
                      onOk: () => logOutFunc(navigate),
                    })
                  }
                >
                  Logout
                </Button>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="ofa__admin__header"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          className="ofa__admin__main"
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
