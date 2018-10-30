import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header/Header'
import { test } from '../actions/test';
import PhotoGrid from '../components/PhotoGrid/PhotoGrid'

class PhotoGridContainer extends Component {
	render() {
		const { posts } = this.props;
		return (
			<div>
				<Header />
				<PhotoGrid posts={posts} />	
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	console.log(state)
	return {
		posts: state.posts
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		testFunc: (testData) => {
			console.log('called..')
			dispatch(test(testData));
		}
	}
}

export default connect (
	mapStateToProps,
	mapDispatchToProps
)(PhotoGridContainer);
