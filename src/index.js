import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.styl';
import App from './router/router';

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
	<App />,
	document.getElementById('root')
);
registerServiceWorker();
