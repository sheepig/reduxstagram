import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './Main.styl';

class Main extends Component {
	render() {
		return (
			<Router>
					<h1><Link to="/">Reduxstagram</Link></h1>
			</Router>
		);
	}
}
let m = new Main();
console.log(m);


export default Main;