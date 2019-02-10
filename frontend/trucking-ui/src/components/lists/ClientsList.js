import React, { Component } from 'react';
import { Table } from 'reactstrap';
import Pagination from "react-js-pagination";


const ClientsList = (props) => {
    let page = props.activePage ? props.activePage : 1;
    return props.clients ? (
        props.clients.length > 0 ?
            <div>
                <Table dark style={{ backgroundColor: '#3F4752' }}>
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
                                    <td>{((page-1) * 5) + index + 1}</td>
                                    <td>{client.name}</td>
                                    <td>{client.type}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
                <div>
                    {
                        props.totalSize && props.activePage ?
                            <Pagination
                                activePage={props.activePage}
                                totalItemsCount={props.totalSize}
                                itemsCountPerPage={5}
                                pageRangeDisplayed={5}
                                hideDisabled={true}
                                itemClass={"page-item white-back-grey-font"}
                                linkClass={"page-link white-font"}
                                activeClass={"activePage"}
                                style={{ border: '1px solid grey', backgroundColor: 'grey' }}
                                onChange={props.onPageChanged}
                            /> : <div />
                    }
                </div>
            </div>

            : <h1 className={'animated fadeInUp'}>No users yet</h1>
    ) : <div />

};

export default ClientsList;