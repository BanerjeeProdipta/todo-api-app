import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { rootReducer } from './IndexReducer';

// TODO ADD redux-saga
const middleware = [thunk];

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

export const persistor = persistStore(store);
