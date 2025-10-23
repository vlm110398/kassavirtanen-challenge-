import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE
} from '../actions/projectActions';

const initialState = {
  byId: {},
  allIds: [],
  loading: false,
  error: null
};

export default function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROJECTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PROJECTS_SUCCESS:
      const byId = {};
      const allIds = action.payload.data.map(project => {
        byId[project.id] = project;
        return project.id;
      });
      return { ...state, byId, allIds, loading: false };
    case FETCH_PROJECTS_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
