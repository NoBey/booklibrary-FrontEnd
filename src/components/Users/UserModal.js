import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

class UserEditModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        console.log(values)
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { user, email, role, tel, password } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title="用户"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form horizontal onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="用户名"
            >
              {
                getFieldDecorator('user', {
                  initialValue: user,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="邮箱"
            >
              {
                getFieldDecorator('email', {
                  initialValue: email,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="角色"
            >
              {
                getFieldDecorator('role', {
                  initialValue: role,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="手机号码"
            >
              {
                getFieldDecorator('tel', {
                  initialValue: tel,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="密码"
            >
              {
                getFieldDecorator('password', {
                  initialValue: password,
                })(<Input />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UserEditModal);
