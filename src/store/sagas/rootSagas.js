
import { all } from 'redux-saga/effects';
import tasksSaga from './taskSagas';
import usersSaga from './userSagas';
import projectsSaga from './projectSagas';

export default function* rootSaga() {
  yield all([
    tasksSaga(),
    usersSaga(),
    projectsSaga()
  ]);
}
