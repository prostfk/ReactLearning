import React, {Component} from 'react';
import {NotificationManager} from "react-notifications";

export default class SysAdminIndexPage extends Component {

    constructor(props) {
        super(props);
        document.title = 'Users';
    }


    state = {
        users: []
    };

    componentDidMount(){
        this.loadInfo();
    }

    loadInfo = () => {
        fetch('/api/sysAdmin/userStatistics', {headers: {'authorization': localStorage.getItem('authorization')}}).then(response => response.json())
            .then(data => {
                if (!data.error) {
                    this.setState({
                        users: data
                    });
                } else {
                    NotificationManager.warning(data.error);
                }
            }).catch(() => {
                NotificationManager.warning('No connection to server');
        })
    };

    render() {
        return <div className={'container'}>
            <ul>
                {
                    this.state.users.map((user,index)=>{
                        return <li key={index}>{`${user.role} - ${user.count}`}</li>
                    })
                }
            </ul>
        </div>
    }

}