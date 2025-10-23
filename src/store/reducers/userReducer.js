import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE
} from '../actions/userActions';

const initialState = {
  byId: {},
  allIds: [],
  loading: false,
  error: null
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USERS_SUCCESS:
      const byId = {};
      const allIds = action.payload.data.map(user => {
        byId[user.id] = user;
        return user.id;
      });
      return { ...state, byId, allIds, loading: false };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
