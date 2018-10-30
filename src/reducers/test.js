import { MYTEST } from '../actions/type';
import defaultPost from '../data/posts';

const testFunc = (state = defaultPost, action) => {
	switch (action.type) {
		case MYTEST:
			return {
				posts: [1,2,3]
			};
		default:
			return state
	}
}

export default testFunc;