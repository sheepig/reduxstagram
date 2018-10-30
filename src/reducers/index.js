import posts from './test';
import { combineReducers } from 'redux';

const appReducer = combineReducers ({
	posts
})

const rootReducer = (state, action) => {
	return appReducer(state, action);
}

// const rootReducer = (state = { posts: [1,2,3]}, action) => {
// 	switch (action.type) {
// 		default: return state
// 	}
// }

export default rootReducer;