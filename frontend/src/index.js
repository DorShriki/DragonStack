import React from 'react';
import {createStore, compose, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import { Router, Switch, Route ,Redirect } from 'react-router-dom';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import history from './history';
import Root from './components/Root'
import AccountDragons from './components/AccountDragons';
import PublicDragons from './components/PublicDragons';
import { fetchAuthenticated } from './actions/account'
import './index.css';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
);

const AuthRoute = props =>{
    if (!store.getState().account.loggedIn){
        return <Redirect to={{ patchname: '/' }} />
    }
    const { component, path } = props

    return <Route path={path} component={component} />
}

store.dispatch(fetchAuthenticated())
  .then(() => {
        render(
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <Route exact path='/' component={Root} />
                        <AuthRoute path='/account-dragons' component={AccountDragons} />
                        <AuthRoute path='/public-dragons' component={PublicDragons} />
                    </Switch>
                </Router>
            </Provider>,
            document.getElementById('root')
        )
    })
    // .catch(error => console.error(error))

        // render(
        //     <Provider store={store}>
        //         <Root/>
        //     </Provider>,
        //     document.getElementById('root')
        // )