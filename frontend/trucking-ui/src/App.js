import React, {Component} from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'react-notifications/lib/notifications.css';
import './css/animate.css'
import Registration from "./components/roleAnon/registration";
import Provider from "react-redux/es/components/Provider";
import {BrowserRouter as Router} from 'react-router-dom'
import {Route} from 'react-router';
import allReducers from "./reducers/allReducers";
import {createStore} from "redux";
import Auth from "./components/roleAnon/auth";
import NavBar from "./components/common/navbars/navBar";
import IndexPage from "./components/common/index/indexComponent";
import Notifications from "./components/common/index/notifications";
import AdminAutos from "./components/roleAdmin/adminAutos";
import OwnerClients from "./components/roleOwner/ownerClients";
import CreateOrder from './components/roleDispatcher/modal/createOrder';
import DriverOrder from "./components/roleDriver/driverOrderPage";
import ManagerOrder from "./components/roleManager/managerOrderPage";
import OwnerOrders from "./components/roleOwner/ownerOrders";
import OwnerCharts from "./components/roleOwner/ownerCharts";
import StocksPage from "./components/common/StocksPage";
import CommonUtil from "./lib/commontUtil";
import OwnerStatistics from './components/roleOwner/OwnerStatistics';

class App extends Component {

    render() {
        return <Provider store={store}>
            <Router>
                <div>
                    <Route path={'/*'} component={NavBar}/>
                    <Route path={'/*'} component={Notifications}/>
                    <Route exact path={'/autos'} component={AdminAutos}/>
                    <Route exact path={'/'} component={IndexPage}/>
                    <Route exact path={'/registration'} component={Registration}/>
                    <Route exact path={'/auth'} component={Auth}/>
                    <Route exact path={'/clients'} component={OwnerClients}/>
                    <Route exact path={'/orders'} component={OwnerOrders}/>
                    <Route exact path={'/charts'} component={OwnerCharts}/>
                    <Route exact path={'/createOrder'} component={CreateOrder}/>
                    <Route exact path={'/stats'} component={OwnerStatistics}/>
                    <Route exact path={'/stocks'} component={StocksPage}/>
                    <Route exact path={'/route/:id'} component={DriverOrder}/>
                    <Route exact path={'/setRoute/:id'} component={ManagerOrder}/>
                </div>
            </Router>
        </Provider>
    }
}

const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default App;
