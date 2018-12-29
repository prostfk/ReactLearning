import React, {Component} from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse} from "mdbreact";
import LogoutButton from "../common/navbars/logoutButton";

export default class OwnerNavBar extends Component {

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
                            <NavLink to="/orders">Orders</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/stats">Stats</NavLink>
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