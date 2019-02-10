import React, {Component} from 'react';
import {Map, Marker, MarkerLayout} from 'yandex-map-react';
import {NotificationManager} from "react-notifications";
import {Table} from "reactstrap";
import MarkerModal from "../roleManager/markerModal";

export default class DriverOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            center: [55.75,47.57],
            order: undefined,
            points: []
        };
        document.title = 'Order';
    }

    loadInfo = () => {
        let link = window.location.href.split('/');
        let id = link[link.length-1];
        fetch(`/api/driver/order/${id}`, {headers: {'authorization': localStorage.getItem('authorization')}}).then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            if (!data.error) {
                this.setState({
                    order: data.order,
                    points: data.points
                });
            } else {
                NotificationManager.warning("Error ", data.error);
            }
        }).catch(()=>{
            NotificationManager.warning('Cannot get data');
        })
    };

    drawRoute = () => {

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
        return (
            <div className={'row'} style={{width: '100%', height: window.innerHeight}}>
                <div className={'col-md-4'}>
                    <Table dark style={{backgroundColor: '#4B525D', width: '100%', marginTop: '1%'}}>
                        <thead>
                        <tr className={'animated fadeInLeft'}>
                            <th>Name</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.points.map((point, index)=>{
                                return <tr className={'animated fadeInLeft'} key={index}>
                                    <td>{point.name}</td>
                                    <td style={{color: (point.status === 1 ? "green" : "red")}}>{point.status === 1 ? "Passed" : "Not passed"}</td>
                                </tr>
                            })
                        }
                        </tbody>
                    </Table>
                </div>
                <div className={'col-md-8 animated fadeIn'}>
                    <Map onAPIAvailable={() => console.log('api loaded')} center={this.state.center}
                         state={{controls: ['default']}} zoom={10} height={window.innerHeight}
                         width={'100%'} onClick={()=>console.log('map clicked')} style={{width: '100%'}}>
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
            </div>
        );
    }


}