// import { takeLatest } from 'redux-saga';
import { call, put, fork, takeLatest } from 'redux-saga/effects';
import {
  search,
} from '../services/demo';

function * doGet() {
  const { response, error } = yield call(search, {});
  if (response) {
    yield put({
      type: 'demo/getList/success',
      payload: response.resultData
    });
  } else {
    yield put({
      type: 'demo/getList/failed',
      error,
    });
  }
}


function * watch() {
  yield takeLatest('demo/getList', doGet);
}

export default function *() {
  yield fork(watch);
}
