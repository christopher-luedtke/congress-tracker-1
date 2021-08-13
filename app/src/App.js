import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar";
import Home from './Home'
import Results from './Results'
import CreateNewUser from "./CreateNewUser";
import Profile from './Profile'
import Login from './Login'
import CongressProfile from './CongressProfile'
import Following from './Following'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, Navbar, Container } from 'react-bootstrap'

function App() {

  const [userDetails, setUserDetails] = useState([])
  const [congressDetails, setCongressDetails] = useState([])

  useEffect(() => {
    fetch("/profile/<username>").then(response =>
      response.json().then(data => {
        setUserDetails(data.userDetails);
      })
    );
  }, []);

  useEffect(() => {
    fetch("/following").then(response =>
      response.json().then(data => {
        setCongressDetails(data.congressDetails);
      })
    );
  }, []);

  return (
    <div className="App">
      <img className="capitol-img" src="https://news.uchicago.edu/sites/default/files/styles/full_width/public/images/2020-10/USCapitol.jpg?itok=-7OBaM7C" alt="capitol-img" />
      <BrowserRouter>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">Congress Tracker</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Search</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/profile/:username">Profile</Nav.Link>
            <Nav.Link href="/create-new-user">Sign Up</Nav.Link>
          </Nav>
        </Navbar>
        <Route exact path="/">
          <Home />
          <Results />
        </Route>
        <Route exact path='/congress-profile/:id'>
          <CongressProfile />
        </Route>
        <Route exact path='/create-new-user'>
          <CreateNewUser />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/profile/:username'>
          <Profile userDetails={userDetails} />
        </Route>
        <Route exact path='/following'>
          <Following congressDetails={congressDetails} />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
