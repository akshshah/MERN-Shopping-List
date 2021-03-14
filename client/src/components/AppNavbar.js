import React, { Component, Fragment } from 'react';

import {
   Collapse, Nav, NavItem, NavLink, NavbarBrand, NavbarToggler, Navbar, Container
} from 'reactstrap';
import { connect } from "react-redux";
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import PropTypes from "prop-types";

class AppNavbar extends Component {

   constructor(props) {
      super(props);
      this.state = {
         isNavOpen: false
      };
   }

   static propTypes = {
      auth: PropTypes.object.isRequired
   }

   toggleNav = () => {
      this.setState({
         isNavOpen: !this.state.isNavOpen
      });
   }

   render() {

      const { isAuthenticated, user } = this.props.auth;

      const authLinks = (
         <Fragment>
            <NavItem>
               <span className="navbar-text mr-3">
                  <strong>{user ? `Welcome ${user.name}` : ''}</strong>
               </span>
            </NavItem>
            <NavItem>
               <Logout />
            </NavItem>
         </Fragment>
      );

      const guestLinks = (
         <Fragment>
            <NavItem>
               <RegisterModal />
            </NavItem>
            <NavItem>
               <LoginModal />
            </NavItem>
         </Fragment>
      );

      return (
         <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
               <Container>
                  <NavbarBrand href="/" > Shopping List</NavbarBrand>
                  <NavbarToggler onClick={this.toggleNav} />

                  <Collapse isOpen={this.state.isNavOpen} navbar>

                     <Nav className="ml-auto" navbar>


                        {isAuthenticated ? authLinks : guestLinks}

                        <NavItem>
                           <NavLink href="https://github.com/akshshah" >
                              Github
                           </NavLink>
                        </NavItem>
                     </Nav>
                  </Collapse>
               </Container>
            </Navbar>
         </div>
      );

   }

}


const mapStateToProps = state => ({
   auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavbar);