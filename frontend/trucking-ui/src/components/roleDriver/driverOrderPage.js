import React, {Component} from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import {NotificationManager} from "react-notifications";

export default class DriverOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            center: [55.75,47.57],
            order: undefined,
            points: undefined
        }
    }

    loadInfo = () => {
        let link = window.location.href.split('/');
        let id = link[link.length-1];
        fetch(`/api/driver/order/${id}`, {headers: {'authorization': localStorage.getItem('authorization')}}).then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            if (data.error === undefined) {
                this.setState({
                    order: data.order,
                    points: data.points
                });
            } else {
                NotificationManager.warning(data.error);
            }
        })
    };

    setLocation = (position) => {
        this.setState({
             center: [position.coords.latitude, position.coords.longitude]
        });
    };

    componentDidMount(){
        this.loadInfo();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setLocation);
        } else {
            NotificationManager.warning("Geolocation is not supported by this browser.");
        }
    }

    render() {
        console.log(this.state);
        return (
            <div style={{width: '100%'}}>
                <YMaps>
                    <Map defaultState={{center: this.state.center, zoom: 9}} height={window.innerHeight} width={window.innerWidth}/>
                </YMaps>
            </div>
        );
    }


}