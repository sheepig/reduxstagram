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
			<Switch>
				<Route exact path="/" component={ PhotoGrid } />
				<Route path="/view/:postId" component={ Single }/>
			</Switch>
	</div>
)

export default App;