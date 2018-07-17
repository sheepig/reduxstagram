import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

// import the root reducer
import rootReducer from './reducers/index';

import comments from './data/comments';
import posts from './data/posts';

export const history = createHistory()

// create an object for the default data
const defaultState = {
	posts,
	comments,
};

const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

export default createStore(
  connectRouter(history)(rootReducer),
  defaultState,
  composedEnhancers
)

