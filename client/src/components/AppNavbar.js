import React, {Component} from 'react';

import{
   Collapse,Nav,NavItem,NavLink,NavbarBrand,NavbarToggler,Navbar,Container
}from 'reactstrap';

class AppNavbar extends Component{

   constructor(props){
      super(props);
      this.state = {
         isNavOpen: false
      };

   }

   toggleNav = () => {
      this.setState({
         isNavOpen: !this.state.isNavOpen
      });
   }   

   render(){
      return (
         <div>
         <Navbar color="dark" dark expand="sm" className="mb-5">
            <Container>
               <NavbarBrand href="/" > Shopping List</NavbarBrand>
               <NavbarToggler onClick={this.toggleNav}/>

               <Collapse isOpen={this.state.isNavOpen} navbar>

                  <Nav className="ml-auto" navbar>
                     <NavItem>
                        <NavLink href="https://github.com/akshshah">
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




export default AppNavbar;