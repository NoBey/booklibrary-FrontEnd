import * as usersService from '../services/users';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
export default {
  namespace: 'users',
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
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { data, headers } = yield call(usersService.fetch, { page });

      yield put({ type: 'check', payload: { data } });
        // if (data.stats == 0){
        //   console.log('fetch')
        //   yield put(routerRedux.push('/'));
        //
        // }
        // console.log('fetch1111')

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
      yield call(usersService.remove, id);
      yield put({ type: 'reload' });
    },
    *patch({ payload: { values } }, { call, put }) {
      yield call(usersService.patch, values);
      yield put({ type: 'reload' });
    },
    *create({ payload: values }, { call, put }) {
      yield call(usersService.create, values);
      yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *login({ payload: values }, { call, put }) {
      const {data} = yield call(usersService.login, values.values);
      console.log(data)
      if(data._id){
        message.success('登陆成功')
        document.cookie = data.cookie
        yield put(routerRedux.push('/books'));

      }else{
        message.error(data.data.msg)
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
