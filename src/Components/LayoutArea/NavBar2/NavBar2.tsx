import "./NavBar2.css";
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import logo from "../../../Assets/icons8-coupon-64.png"

function NavBar2(): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const navItems = ["Food", "Vacation", "Beauty", "Home", "Electricity", "Fashion", "Sport", "Pets"]

    return (
        <div>
            <Navbar color="dark" dark expand="md" fixed="true">
                <NavbarBrand href="/">
                    <img src={logo} alt="logo" width="30" height="30"/>
                    Coupon Master</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    {navItems.map(item => (
                            <NavItem>
                                <NavLink href={`/category/${item.toUpperCase()}`} active> {item} </NavLink>
                            </NavItem>
                    ))}
                    <NavItem>
                        <NavLink href="/login" > Login </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/register"> Register </NavLink>
                    </NavItem>
                </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default NavBar2;
