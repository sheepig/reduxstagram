import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './Main.styl';

class Main extends Component {
	constructor() {
		super();
		console.log(this);
		this.setState({test: 'test'}, () => {
			console.log('setState...');
		})
		this.forceUpdate(() => { console.log('forceUpdate');
		})
	}
	render() {
		return (
			<Router>
					<h1><Link to="/">Reduxstagram</Link></h1>
			</Router>
		);
	}
}

export default Main;