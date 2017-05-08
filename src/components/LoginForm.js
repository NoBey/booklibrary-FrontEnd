import React, { Component } from 'react';
import { Modal, Form, Input,Button } from 'antd';

const FormItem = Form.Item;

class LoginForm extends Component {

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

  okHandler = (e) => {
    e.preventDefault()
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // onOk(values);
        const dispatch = this.props.dispatch
      
        dispatch({
          type: 'users/login',
          payload: { values },
        })
        console.log(values)
        // this.hideModelHandler();
      }
    });
  };

  render() {

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
          <Form horizontal onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="用户名"
            >
              {
                getFieldDecorator('user', {
                  initialValue: '',
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="密码"
            >
              {
                getFieldDecorator('password', {
                  initialValue: '',
                })(<Input />)
              }
            </FormItem>
            <Button type="primary" htmlType="submit" >
                      登陆
            </Button>
          </Form>
    );
  }
}

export default Form.create()(LoginForm);
