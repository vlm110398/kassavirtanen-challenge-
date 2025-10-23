import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  CREATE_TASK_OPTIMISTIC,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILURE,
  UPDATE_TASK_OPTIMISTIC,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
  DELETE_TASK_OPTIMISTIC,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE
} from '../actions/taskActions';

const initialState = {
  byId: {},
  allIds: [],
  loading: false,
  error: null,
  optimistic: {
    pendingCreates: [],
    pendingUpdates: {},
    pendingDeletes: []
  }
};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_TASKS_SUCCESS:
      const byId = {};
      const allIds = action.payload.data.map(t => {
        byId[t.id] = t;
        return t.id;
      });
      return { ...state, byId, allIds, loading: false };
    case FETCH_TASKS_FAILURE:
      return { ...state, loading: false, error: action.error };

    case CREATE_TASK_OPTIMISTIC:
      return {
        ...state,
        byId: { ...state.byId, [action.payload.id]: action.payload },
        allIds: [...state.allIds, action.payload.id],
        optimistic: {
          ...state.optimistic,
          pendingCreates: [...state.optimistic.pendingCreates, action.payload.id]
        }
      };

    case CREATE_TASK_SUCCESS:
      const { tempId, task } = action.payload;
      const newById = { ...state.byId };
      delete newById[tempId];
      return {
        ...state,
        byId: { ...newById, [task.id]: task },
        allIds: state.allIds.map(id => (id === tempId ? task.id : id)),
        optimistic: {
          ...state.optimistic,
          pendingCreates: state.optimistic.pendingCreates.filter(id => id !== tempId)
        }
      };

    // UPDATE_TASK_OPTIMISTIC / SUCCESS / FAILURE
    // DELETE_TASK_OPTIMISTIC / SUCCESS / FAILURE
    // ... você pode adicionar seguindo mesma lógica

    default:
      return state;
  }
}
