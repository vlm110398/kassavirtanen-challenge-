import { call, put, takeLatest } from 'redux-saga/effects';
import { mockApi } from '../../api/mockApi';
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE
} from '../actions/userActions';

function* fetchUsersSaga() {
  try {
    const response = yield call(mockApi.fetchUsers);
    yield put({ type: FETCH_USERS_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: FETCH_USERS_FAILURE, error: error.message });
  }
}

export default function* usersSaga() {
  yield takeLatest(FETCH_USERS_REQUEST, fetchUsersSaga);
}
