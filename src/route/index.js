import React from 'react';
import {
	BrowserRouter,
	Switch,
  Route,
  Link
} from 'react-router-dom';

import Main from '../components/Main';
import PhotoGrid from '../components/PhotoGrid';
import Single from '../components/Single';

const App = () => (
	<div>
		<Main/>
		<BrowserRouter>
			<Switch>
			<Route exact path="/" component={ PhotoGrid }/>
			<Route exact path="/view/:postId" component={ Single }/>
			</Switch>
		</BrowserRouter>
	</div>
)

export default App;