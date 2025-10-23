import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { mockApi } from '../../api/mockApi';
import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILURE,
  CREATE_TASK_OPTIMISTIC,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
  UPDATE_TASK_OPTIMISTIC,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  DELETE_TASK_OPTIMISTIC
} from '../actions/taskActions';

// -------- Fetch Tasks --------
function* fetchTasksSaga(action) {
  try {
    const tasks = yield call(mockApi.getTasks, action.payload); // payload pode ter filtros
    yield put({ type: FETCH_TASKS_SUCCESS, payload: tasks });
  } catch (error) {
    yield put({ type: FETCH_TASKS_FAILURE, error: error.message });
  }
}

// -------- Create Task (Optimistic) --------
function* createTaskSaga(action) {
  const tempId = 'temp-' + Date.now();
  const optimisticTask = { ...action.payload, id: tempId };

  try {
    // Dispatch optimistic update
    yield put({ type: CREATE_TASK_OPTIMISTIC, payload: optimisticTask });

    // Simulate API call
    const createdTask = yield call(mockApi.createTask, action.payload);

    // Replace optimistic with real task
    yield put({ type: CREATE_TASK_SUCCESS, payload: { tempId, task: createdTask } });
  } catch (error) {
    // Rollback
    yield put({ type: CREATE_TASK_FAILURE, error: error.message, payload: tempId });
  }
}

// -------- Update Task (Optimistic) --------
function* updateTaskSaga(action) {
  const { id, updates } = action.payload;
  try {
    yield put({ type: UPDATE_TASK_OPTIMISTIC, payload: { id, updates } });

    const updatedTask = yield call(mockApi.updateTask, id, updates);
    yield put({ type: UPDATE_TASK_SUCCESS, payload: updatedTask });
  } catch (error) {
    yield put({ type: UPDATE_TASK_FAILURE, error: error.message, payload: { id, updates } });
  }
}

// -------- Delete Task (Optimistic) --------
function* deleteTaskSaga(action) {
  const taskId = action.payload;
  try {
    yield put({ type: DELETE_TASK_OPTIMISTIC, payload: taskId });

    yield call(mockApi.deleteTask, taskId);
    yield put({ type: DELETE_TASK_SUCCESS, payload: taskId });
  } catch (error) {
    yield put({ type: DELETE_TASK_FAILURE, error: error.message, payload: taskId });
  }
}

// -------- Watchers --------
export default function* tasksSaga() {
  yield takeLatest(FETCH_TASKS_REQUEST, fetchTasksSaga);
  yield takeLatest(CREATE_TASK_REQUEST, createTaskSaga);
  yield takeLatest(UPDATE_TASK_REQUEST, updateTaskSaga);
  yield takeLatest(DELETE_TASK_REQUEST, deleteTaskSaga);
}
