import React, {Component} from 'react';
import {Table} from 'reactstrap';


const ClientsList = (props) => {

    return props.clients ? (
        props.clients.length > 0 ?
            <Table dark style={{backgroundColor: '#3F4752'}}>
                <thead className={'animated fadeIn'}>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Type</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.clients.map((client, index) => {
                        return <tr className={'animated fadeInUp'} key={index}>
                            <td>{index + 1}</td>
                            <td>{client.name}</td>
                            <td>{client.type}</td>
                        </tr>
                    })
                }
                </tbody>
            </Table> : <h1 className={'animated fadeInUp'}>No users yet</h1>
    ) : <div/>

};

export default ClientsList;