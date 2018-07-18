import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { push } from "connected-react-router";

import * as actions from '../actions/actionCreators';

class PhotoGrid extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="photo-grid">
				I'm the photo grid
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	posts: state.posts,
	comments: state.comments
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			actions
		},
		dispatch
	)
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(PhotoGrid)
);