import { MYTEST } from './type'

export const test = (posts) => {
	return {
		type: MYTEST,
		posts
	}
}