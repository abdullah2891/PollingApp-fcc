import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import rootReducer from './reducers';

const middleware = window.__REDUX_DEVTOOLS_EXTENSION__ ? compose( 
        applyMiddleware(thunk),
         window.__REDUX_DEVTOOLS_EXTENSION__()
      ): applyMiddleware(thunk);



export default createStore(rootReducer,middleware );
