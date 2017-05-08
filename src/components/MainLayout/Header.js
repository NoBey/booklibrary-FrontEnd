import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';

function Header({ location }) {
  return (
    <Menu
      selectedKeys={[location.pathname]}
      mode="horizontal"
      theme="dark"
    >
    <Menu.Item key="/login">
      <Link to="/login"><Icon type="home" />登陆</Link>
    </Menu.Item>
      <Menu.Item key="/">
        <Link to="/"><Icon type="home" />主页</Link>
      </Menu.Item>
      <Menu.Item key="/users">
        <Link to="/users"><Icon type="bars" />用户</Link>
      </Menu.Item>

      <Menu.Item key="/books">
        <Link to="/books"><Icon type="bars" />图书</Link>
      </Menu.Item>

    </Menu>
  );
}

export default Header;
