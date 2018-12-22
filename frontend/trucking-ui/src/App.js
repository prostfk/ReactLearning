import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Registration from "./components/roleAnon/registration";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'
import Provider from "react-redux/es/components/Provider";
import {BrowserRouter as Router} from 'react-router-dom'
import {Route} from 'react-router';
import allReducers from "./reducers/allReducers";
import {createStore} from "redux";

library.add(faIgloo);


class App extends Component {
  render() {
    return <Provider store={store}>
      <Router>
        <>
          <Route exact path={'/registration'} component={Registration}/>
        </>
      </Router>
    </Provider>
  }
}
const store = createStore(allReducers);

export default App;
