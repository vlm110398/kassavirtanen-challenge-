import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

// Import your reducers
import tasksReducer from './reducers/taskReducer';
import uiReducer from './reducers/uiReducer';
import userReducer from './reducers/userReducer';
import projectReducer from './reducers/projectReducer';

// Import root saga
import rootSaga from './sagas/rootSagas';

// Combine reducers for normalized state structure
const rootReducer = combineReducers({
  entities: combineReducers({
    tasks: tasksReducer,
    users: userReducer,
    projects: projectReducer
  }),
  ui: uiReducer
});

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure Redux Logger
const logger = createLogger({
  collapsed: true,
  diff: true,
  duration: true,
  timestamp: true,
  level: 'info',
  logErrors: true,
  predicate: (getState, action) => process.env.NODE_ENV === 'development'
});

// Configure Redux DevTools
const composeEnhancers = 
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })
    : compose;

// Create store with middleware
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware, logger))
);

// Run root saga
sagaMiddleware.run(rootSaga);

export default store;
