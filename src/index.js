import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";
import store from './store/createStore';
import './styles/style.styl';
import App from './router/router';

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
	<AppContainer>
		<Provider store={store}>
			<App />
		</Provider>
	</AppContainer>,
	document.getElementById('root')
);
registerServiceWorker();
