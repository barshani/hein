import { Link, NavLink } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Container, Nav, Navbar } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { verifyToken } from "../auth/TokenManager";
import Logout from "../auth/Logout";
interface Props {
    background: string;
    color:string;
}
function Header({background,color}:Props) {
    return (

        <>
         <Navbar  style={{backgroundColor:background}} collapseOnSelect expand="lg" fixed="top">
      <Container>
        <Navbar.Brand style={{color:color}} href="#home">HeIn</Navbar.Brand> 
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/"  style={{color:color}}>Home</NavLink>
            {verifyToken()&&<NavLink className="nav-link" to="/collection" 
            style={{color:color}}>Collection</NavLink>}
            {verifyToken()&&<NavLink className="nav-link" to="/favorites" style={{color:color}}>Favorites</NavLink>}
          </Nav>
          <Nav>
         {!verifyToken()&&<NavLink className="nav-link" to="/signup" style={{color:color}}>signup</NavLink>}
        {!verifyToken()&&<NavLink className="nav-link" to="/login" style={{color:color}}>
              Login
            </NavLink>}
            {
          <NavDropdown title={<i className="bi bi-person-circle" style={{color:color}}></i>} id="basic-nav-dropdown" style={{color:color}}>
            <Logout/>
             </NavDropdown>
         }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </>
    );
}

export default Header;