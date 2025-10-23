import { call, put, takeLatest } from 'redux-saga/effects';
import { mockApi } from '../../api/mockApi';
import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE
} from '../actions/projectActions';

// -------- Fetch Projects --------
function* fetchProjectsSaga() {
  try {
    const response = yield call(mockApi.fetchProjects);
    yield put({ type: FETCH_PROJECTS_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: FETCH_PROJECTS_FAILURE, error: error.message });
  }
}

// -------- Watcher Saga --------
export default function* projectsSaga() {
  yield takeLatest(FETCH_PROJECTS_REQUEST, fetchProjectsSaga);
}
