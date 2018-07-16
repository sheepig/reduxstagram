// increment
export function increment(index) {
	return {
		type: 'INCREMENT_LIKES',
		index
	}
}

// add comments
export function Addcomment(postId, author, comment) {
	return {
		type: 'ADD_COMMENT',
		postId,
		author,
		comment
	}
}

// remove comments
export function removeComment(postId, i) {
	return {
		type: 'REMOVE_COMMENT',
		i,
		postId
	}
}