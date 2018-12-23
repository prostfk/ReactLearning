import React, { Component } from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Registration from "./components/roleAnon/registration";
import Provider from "react-redux/es/components/Provider";
import {BrowserRouter as Router} from 'react-router-dom'
import {Route} from 'react-router';
import allReducers from "./reducers/allReducers";
import {createStore} from "redux";
import Auth from "./components/roleAnon/auth";


class App extends Component {
  render() {
    return <Provider store={store}>
      <Router>
        <div>
          <Route exact path={'/registration'} component={Registration}/>
          <Route exact path={'/auth'} component={Auth}/>
        </div>
      </Router>
    </Provider>
  }
}
const store = createStore(allReducers);

export default App;
