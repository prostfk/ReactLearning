import React, {Component} from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse} from "mdbreact";
import LogoutButton from "../common/navbars/logoutButton";

export default class AdminNavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }


    toggleCollapse = () => this.setState({ isOpen: !this.state.isOpen });


    render(){

        return <>
            <Navbar color="stylish-color-dark" dark expand="md">
                <NavbarBrand>
                    <strong className="white-text">Trucking</strong>
                </NavbarBrand>
                <NavbarToggler
                    onClick={this.toggleCollapse}
                />
                <Collapse
                    id="navbarCollapse3"
                    isOpen={this.state.isOpen}
                    navbar
                >
                    <NavbarNav left>
                        <NavItem>
                            <NavLink to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/autos">Autos</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/stocks">Stocks</NavLink>
                        </NavItem>

                    </NavbarNav>
                    <NavbarNav right>
                        <NavItem>
                            <LogoutButton/>
                        </NavItem>
                    </NavbarNav>
                </Collapse>
            </Navbar>
        </>

    }

}