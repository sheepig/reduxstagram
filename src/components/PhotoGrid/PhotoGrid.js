import React from 'react';
import PropTypes from 'prop-types';

const PhotoGrid = ({ posts }) => {
	return (
		<div>PhotoGrid component</div>
	)
}

PhotoGrid.propTypes = {
	posts: PropTypes.array.isRequired
}

export default PhotoGrid;