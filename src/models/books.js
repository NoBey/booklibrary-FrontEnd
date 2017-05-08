import * as booksService from '../services/books';
import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {
  namespace: 'books',
  state: {
    list: [],
    total: null,
    page: null,
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    *check({ payload: { data } }, { call, put }) {
      if (data.stats == 0){
        yield put(routerRedux.push('/'));
        message.error(data.msg)
      }
    },
    *list({ payload: { page = 1 } }, { call, put }) {
      const { data, headers } = yield call(booksService.list);
      yield put({ type: 'check', payload: { data } });
      
      yield put({
        type: 'save',
        payload: {
          data
        },
      });
    },
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { data, headers } = yield call(booksService.fetch, { page });
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10),
        },
      });
    },
    *remove({ payload: id }, { call, put }) {
      yield call(booksService.remove, id);
      yield put({ type: 'reload' });
    },
    *patch({ payload: { values } }, { call, put }) {
      yield call(booksService.patch, values);
      yield put({ type: 'reload' });
    },
    *create({ payload: values }, { call, put }) {
      yield call(booksService.create, values);
      yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {

      try {
        // const page = yield select(state => state.users.page);
        yield put({ type: 'list',payload:1});
      } catch (e) {
        console.log('2esdhfjksdhfshdjkhkjdf')
      }


    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/books') {
          dispatch({ type: 'list', payload: query });
        }
      });
    },
  },
};
