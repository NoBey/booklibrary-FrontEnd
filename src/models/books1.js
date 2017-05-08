import * as booksService from '../services/books';

export default {
  namespace: 'books',
  state: {
    list: [],
    total: null,
  },
  reducers: {
    save(state, { payload: { data: list } }) {
      return { ...state, list };
    },
  },
  effects: {
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
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch' });
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
