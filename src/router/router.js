import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import createHistory from 'history/createHashHistory';
import PhotoGrid from '../containers/PhotoGrid'
import Single from '../containers/Single'

const history = createHistory();

const Root = () => (
	<Router history={history}>
		<Switch>
			<Route path="/" exact component={PhotoGrid} />
			<Route path="/view/:id" component={Single} />
		</Switch>
	</Router>
)

export default Root