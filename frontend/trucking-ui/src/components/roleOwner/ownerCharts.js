import React, {Component} from 'react';
import {Line, LineChart, Pie, PieChart} from "recharts";

export default class OwnerCharts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            orders: []
        };
        document.title = 'Statistics';
    }

    componentDidMount(){
        this.fetchUsers();
    }

    fetchUsers = () => {
        fetch('/api/owner/users', {headers: {'authorization': localStorage.getItem('authorization')}}).then(response => response.json())
            .then(data => {
                this.setState({
                    users: data
                })
            })
    };

    fetchOrders = () => {

    };

    render() {
        let managers = [],other = [];
        this.state.users.forEach(user=>{
            if (user.role === 'ROLE_MANAGER'){
                managers.push(user);
            }else{
                other.push(user);
            }
        });
        return (
            <div className={'container'}>


                <PieChart width={750} height={250}>
                    <Pie data={managers} dataKey="role" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                    <Pie data={other} dataKey="role" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
                </PieChart>

            </div>
        );
    }

}