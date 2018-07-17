import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.styl';

import App from './route'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<ConnectedRouter history={history}>
		<div>
			<App />
		</div>
    </ConnectedRouter>,
	document.getElementById('root')
);
registerServiceWorker();
