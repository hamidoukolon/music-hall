import React, { useState, useContext } from 'react';
import { Nav, NavItem, Navbar, Form,Button,FormControl } from 'react-bootstrap';
import SearchBar from '../Api/SearchBar';
import { AuthProvider, AuthContext } from '../../AuthContext.js'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { NavLink } from 'react-router-dom';


function MyNavbar(props){
  // const { isAuth, setIsAuth } = useContext(AuthContext);
  // console.log("App auth: ", isAuth)
  // const Navbar = ({ component: Component, ...rest }) => (
  //   <Route
  //     {...rest}
  //     render={props =>
  //       isAuth ? <Component {...props} /> : <Redirect to='/login' />
  //       // isAuth ? <Component {...props} /> : <Redirect to="/login" />
  //     }
  //   />
  // );
  return (
    <div>

<Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">Music Hall Logo</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/Dashboard">Dashboard</NavLink>
      <NavLink to="/Table">Table</NavLink>
      <NavLink to="/MyData">Data-Entry</NavLink>
      <Button className='m-1' onClick={e => {
                e.preventDefault();
                props.history.push('/table')
            }}>Table</Button>
   </Nav>
  </Navbar.Collapse>
</Navbar>
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
      {/* <Nav style={{marginLeft:"7rem"}}>
        <NavItem>
          <NavLink href="/" active>Home</NavLink>
        </NavItem>
       
        <NavItem>
          <NavLink href="/Dashboard">Dashboard</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/Table">Table</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="MyData">Data-Entry</NavLink>
        </NavItem>
        <SearchBar/>
      </Nav> */}
    </div>
  );
}


export default MyNavbar





















// import { Nav, NavItem, NavLink } from 'reactstrap';

// const Sidenav = (props) => {
//   return (
//     <div>
//       <p>List Based</p>
//       <Nav vertical>
//         <NavItem>
//           <NavLink href="#">Link</NavLink>
//         </NavItem>
//         <NavItem>
//           <NavLink href="#">Link</NavLink>
//         </NavItem>
//         <NavItem>
//           <NavLink href="#">Another Link</NavLink>
//         </NavItem>
//         <NavItem>
//           <NavLink disabled href="#">Disabled Link</NavLink>
//         </NavItem>
//       </Nav>
     
//     </div>
//   );
// }

// export default Sidenav;





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
  