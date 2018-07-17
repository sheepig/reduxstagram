import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
	increment,
	addComment, 
	removeComment
} from '../actions/actionCreators';

const PhotoGrid = (props) => (
	<div className="photo-grid">
	I'm the photo grid
	</div>
)

const mapStateToProps = ({ state }) => ({
	// posts: state.posts,
	// comments: state.comments
	state: state
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment,
      addComment,
      removeComment
    },
    dispatch
  )

	export default connect(
		mapStateToProps,
		mapDispatchToProps
	)(PhotoGrid)