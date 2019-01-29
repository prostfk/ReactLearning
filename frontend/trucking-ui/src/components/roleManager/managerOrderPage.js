import React, {Component} from 'react';
import {Map, Marker, MarkerLayout} from 'yandex-map-react';
import {NotificationManager} from "react-notifications";
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown} from 'reactstrap';
import MarkerModal from "./markerModal";

export default class ManagerOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            center: [55.75, 47.57],
            points: [{lat: 53.9090944, lng: 27.5357696}]
        }
    }

    loadInfo = () => {
        let link = window.location.href.split('/');
        let id = link[link.length - 1];
        fetch(`/api/manager/order/${id}`, {headers: {'authorization': localStorage.getItem('authorization')}}).then(response => {
            return response.json();
        }).then(data => {
            if (data.error === undefined) {
                this.setState({
                    points: data
                });
            } else {
                NotificationManager.warning(data.error);
            }
        }).catch(() => {
            NotificationManager.warning('Cannot get data');
        })
    };

    setLocation = (position) => {
        this.setState({
            center: [position.coords.latitude, position.coords.longitude]
        });
    };

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setLocation);
        } else {
            NotificationManager.warning("Geolocation is not supported by this browser.");
        }
    }

    render() {
        const markerStyles = {
            width: '40px',
            height: '40px',
            // overflow: 'hidden',
            border: '1px solid orange',
            borderRadius: '50%'
        };

        return (
            <div style={{width: '100%'}}>
                <Map onAPIAvailable={() => console.log('api loaded')} center={this.state.center}
                     state={{controls: ['default']}} zoom={10} height={window.innerHeight}
                     width={'100%'} onClick={()=>console.log('map clicked')}>
                    {
                        this.state.points ?
                            this.state.points.map((point, index) => {
                                let open = false;
                                return <Marker key={`marker_${index}`} lat={point.lat} lon={point.lng}  onClick={()=>open=!open}>
                                    <MarkerLayout>
                                        <div>
                                            <MarkerModal open={open}/>
                                            {/*<img src="/red-marker.png" alt="marker"/>*/}
                                        </div>
                                    </MarkerLayout>
                                </Marker>
                            }) : <></>
                    }
                </Map>
            </div>
        );
    }


}