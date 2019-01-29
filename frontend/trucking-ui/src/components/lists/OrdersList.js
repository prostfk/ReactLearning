import React, {Component} from 'react';
import {MDBRow, MDBCol, Table, TableBody, TableHead} from 'mdbreact';

export class OrdersList extends Component {

    render() {
        return (
            <div className={'container'}>
                {
                    this.props.orders ?
                        <MDBRow>
                            <MDBCol/>
                            <MDBCol size={'6'}>
                                <TableHead color={'grey'}>
                                    <tr className={'animated fadeIn'}>
                                        <th>id</th>
                                        <th>Name</th>
                                        <th>Departure</th>
                                        <th>Arrival</th>
                                    </tr>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.props.orders.map((order,index)=>{
                                            return <tr className={'animated fadeInUp'} key={index}>
                                                <th>{index + 1}</th>
                                                <th>{order.name}</th>
                                                <th>{new Date(order.date_departure).toLocaleString("ru").split(',')[0]}</th>
                                                <th>{new Date(order.date_arrival).toLocaleString("ru").split(',')[0]}</th>
                                                {/*<td><EditAuto auto={auto} renderAutos={this.getAutos}/></td>*/}
                                            </tr>
                                        })
                                    }
                                </TableBody>
                            </MDBCol>

                        </MDBRow> : <div/>
                }
            </div>
        );
    }

}