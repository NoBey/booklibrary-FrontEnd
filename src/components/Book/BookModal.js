import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

class BookEditModal extends Component {

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
    const { onOk ,record} = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values['id']=record._id
        onOk(values);
        console.log(values)
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { bookname, author, publisher, price  } = this.props.record;
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
          title="图书"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form horizontal onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="书名"
            >
              {
                getFieldDecorator('bookname', {
                  initialValue: bookname,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="作者"
            >
              {
                getFieldDecorator('author', {
                  initialValue: author,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="出版社"
            >
              {
                getFieldDecorator('publisher', {
                  initialValue: publisher,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="价格"
            >
              {
                getFieldDecorator('price', {
                  initialValue: price,
                })(<Input />)
              }
            </FormItem>

          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(BookEditModal);
