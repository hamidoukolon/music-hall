import React, { useState } from 'react';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';

const MyNavbar = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <div>
      <Nav pills>
        <NavItem>
          <NavLink href="/" active>Home</NavLink>
        </NavItem>
       
        <NavItem>
          <NavLink href="/Dashboard">Dashboard</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Table</NavLink>
        </NavItem>
        
      </Nav>
    </div>
  );
}


export default MyNavbar






//   <nav className="navbar navbar-expand-lg navbar-light bg-light">
  //   <Link className="navbar-brand" to="#">Navbar</Link>
  //   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
  //     <span className="navbar-toggler-icon"></span>
  //   </button>
  //   <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
  //     <div className="navbar-nav">
  //       <Link className="nav-item nav-link active" to="/">Home <span className="sr-only"></span></Link>
  //       <Link className="nav-item nav-link" to="Dashboard">Dashboard</Link>
   
  //       <button className="nav-link active" to="#">VIEW TABLE </button>
  //      </div>
  //   </div>
  // </nav>
  