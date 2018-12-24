import React, {Component} from 'react';
import CreateUser from "../adminAndOwner/createUser";
import {MDBRow, MDBCol, Table, TableBody, TableHead} from 'mdbreact';


export default class OwnerIndexPage extends Component {


    state = {
        users: [{

        }]
    };

    render() {
        return (
            <>
                <MDBRow>
                    <MDBCol/>
                    <MDBCol size={'6'}>
                        {this.state.users.length > 0 ? <Table>
                            <TableHead color="grey">
                                <tr>
                                    <th>#</th>
                                    <th>First</th>
                                    <th>Last</th>
                                    <th>Handle</th>
                                </tr>
                            </TableHead>
                            <TableBody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </TableBody>
                        </Table> : <h1>No users yet</h1>}
                    </MDBCol>
                    <MDBCol>
                        <CreateUser/>
                    </MDBCol>
                </MDBRow>
            </>
        );
    }


}