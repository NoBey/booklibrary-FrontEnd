import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Users.css';
import { PAGE_SIZE } from '../../constants';
import BookModal from './BookModal';

function Users({ dispatch, list: dataSource, loading, total }) {
  function deleteHandler(id) {
    dispatch({
      type: 'books/remove',
      payload: {id},
    });
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/users',
    }));
  }

  function editHandler(values) {
    dispatch({
      type: 'books/patch',
      payload: { values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'books/create',
      payload: values,
    });
  }

  const columns = [
    {
      title: '书名',
      dataIndex: 'bookname',
      key: 'bookname',
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '出版社',
      dataIndex: 'publisher',
      key: 'publisher',
    },

    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '持有人',
      dataIndex: 'reader',
      key: 'reader',
      render: arr =>  arr[0],
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (

        <span className={styles.operation}>

          <BookModal record={record} onOk={editHandler.bind(null)}>
            <a>编辑</a>
          </BookModal>
          <Popconfirm title="是否删除这本书?" onConfirm={deleteHandler.bind(null, record._id)}>
            <a href="">删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <BookModal record={{}} onOk={createHandler}>
            <Button type="primary">创建图书</Button>
          </BookModal>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={record => record._id}
          pagination={true}
        />

      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total } = state.books;
  return {
    loading: state.loading.models.books,
    list,
    total,
  };
}

export default connect(mapStateToProps)(Users);
