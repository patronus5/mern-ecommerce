import React, { useState } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Container, NavLink } from 'reactstrap'
import RegisterModal from './auth/RegisterModal'
import Logout from './auth/Logout'
import LoginModal from './auth/LoginModal'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const AppNavbar = ({ auth }) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)

    const { isAuthenticated, user } = auth

    const authLinks = (
        <>
            <NavItem>
                <span className="navbar-text mr-3">
                    <strong>{user ? `Welcome ${user.name}` : ''}</strong>
                </span>
            </NavItem>
            <NavItem>
                <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/cart">Cart</NavLink>
            </NavItem>
            <NavItem className="mr-2">
                <NavLink href="/orders">Orders</NavLink>
            </NavItem>
            <NavItem>
                <Logout />
            </NavItem>
        </>
    )

    const guestLinks = (
        <>
            <NavItem>
                <RegisterModal />
            </NavItem>
            <NavItem>
                <LoginModal />
            </NavItem>
        </>
    )

    return (
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <NavbarBrand href="/">E Commerce Store</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {isAuthenticated ? authLinks : guestLinks}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

AppNavbar.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, null)(AppNavbar)
