import { Link, NavLink } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Container, Nav, Navbar } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import Logout from "../auth/Logout";
import { AppContext } from "../App";
import { setMode } from "../auth/TokenManager";
interface Props {
    background: string;
    textColor:string;
}
function Header({background,textColor}:Props) {
  const context = useContext(AppContext);
  const [state,setState] = useState(context?.mode==='dark');
    return (

        <>
         <Navbar className={background==='black'?"bg-dark":"bg-success"} collapseOnSelect expand="lg" fixed="top">
      <Container>
        <Navbar.Brand style={{color:textColor}} href="#home">HeIn</Navbar.Brand> 
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/"  style={{color:textColor}}>Home</NavLink>
            {context?.loggedIn&&<NavLink className="nav-link" to="/collection" 
            style={{color:textColor}}>Collection</NavLink>}
            {context?.loggedIn&&<NavLink className="nav-link" to="/favorites" style={{color:textColor}}>Favorites</NavLink>}
            {context?.admin&&<NavLink className="nav-link" to="/addPage" style={{color:textColor}}>add</NavLink>}
          </Nav>
          <Nav>
         {!state&&<Nav className="nav" 
         style={{color:textColor}}
         onClick={()=>{
          setMode("dark");
          context?.setMode("dark")
          setState(true)
         }}
         ><i className="bi bi-moon-fill nav-link"></i></Nav>}
         {state&&<Nav className="nav" 
         style={{color:textColor}}
         onClick={()=>{
          setMode("light");
          context?.setMode("light")
          setState(false)
         }}
         ><i className="bi bi-sun-fill nav-link text-light"></i></Nav>}
         {!context?.loggedIn&&<NavLink className="nav-link" to="/signup" style={{color:textColor}}>signup</NavLink>}
        {!context?.loggedIn&&<NavLink className="nav-link" to="/login" style={{color:textColor}}>
              Login
            </NavLink>}
            {context?.loggedIn&&
          <NavDropdown title={<i className="bi bi-person-circle" style={{color:textColor}}></i>} id="basic-nav-dropdown" style={{color:textColor}}>
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