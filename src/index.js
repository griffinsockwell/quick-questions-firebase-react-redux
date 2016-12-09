import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import App from './components/App';
import Home from './components/Home';
import MyQuestions from './components/MyQuestions';
import NewQuestion from './components/NewQuestion';
import Question from './components/Question';

import reducers from './reducers';

import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  {},
  composeEnhancers(applyMiddleware(ReduxThunk)),
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/my-questions" component={MyQuestions} />
        <Route path="/new-question" component={NewQuestion} />
        <Route path="/question/:questionId" component={Question} />
        <Route path="*" component={Home} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
