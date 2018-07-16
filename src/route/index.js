import React from 'react';
import {
    Router,
    Route,
    Switch
} from 'react-router-dom';
import Loadable from 'react-loadable';
import history from '../components/public/history';
import Main from '../components/Main';
import PhotoGrid from '../components/PhotoGrid';
import Single from '../components/Single';

class App extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<Router history={ history }>
				<div>
					<Main/>
					<Switch>
						<Route exact path="/" component={ PhotoGrid }/>
						<Route path="/view/:postId" component={ Single }/>
					</Switch>
				</div>
			</Router>
		);
	}
}
export default App;