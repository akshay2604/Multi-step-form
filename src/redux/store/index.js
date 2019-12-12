import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from '../reducers';

export function configureStore(initialState = {}) {
	let middleware = [];
	const logger = createLogger({ collapsed: true });

	middleware = [ thunk, logger ];
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(...middleware)));

	return store;
}
