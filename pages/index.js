import React from 'react'
import { Row, Column, Container, Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './home-page.module.css'

const HomePage = () => {
  return (
    <div className={classes.pageWrapper} >
      <Navbar className='bg-white p-3 shadow-sm' expand='lg' >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id='basic-navbar-nav' className='d-flex justify-content-around' >

          <Navbar.Brand >
            Splinter Bot
          </Navbar.Brand>

          <Nav>
            <Nav.Link className='mx-2' >Home</Nav.Link>
            <Nav.Link className='mx-2' >About</Nav.Link>
            <Nav.Link className='mx-2' >Security</Nav.Link>
            <Nav.Link className='mx-2' >Get Started</Nav.Link>
          </Nav>

          <Nav>
            <Button variant='outline-primary' className={`${classes.outlineBtn} mr-3`} >
              Login
            </Button>
            <Button variant='outline-primary' className={classes.outlineBtn} >
              Sign Up
            </Button>
          </Nav>

        </Navbar.Collapse>
      </Navbar>


      <PageHeader></PageHeader>



    </div>
  )
}


const PageHeader = () => {
  return (
    <div className={classes.header} >
      <h1 className='mb-5' >Splinter Bot</h1>
      <p className='mb-4' >The smartest way to play matches<br/>and farm dark energy crystals </p>
      <Button variant="outline-primary" className={`${classes.outlineBtn} ${classes.getStarted}`} >Get Started</Button>
    </div>
  )
}



export default HomePage
