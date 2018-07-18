import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.styl';

import App from './route'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
