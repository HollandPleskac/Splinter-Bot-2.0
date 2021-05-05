import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import Link from 'next/link'
import { useRouter } from 'next/router'

import 'bootstrap/dist/css/bootstrap.min.css';
import classes from '../styles/home-page.module.css'

const HomePage = () => {
  const router = useRouter()

  function buttonHandler(path) {
    router.push(path)
  }

  return (
    <div className={classes.pageWrapper} >
      <Navbar className='bg-white p-3 shadow-sm' expand='lg' >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id='basic-navbar-nav' className='d-flex justify-content-around' >

          <Navbar.Brand >
            Splinter Bot
          </Navbar.Brand>

          <Nav>
            <Link href='/' passHref><Nav.Link className='mx-2' >Home</Nav.Link></Link>
            <Link href='/' passHref><Nav.Link className='mx-2' >About</Nav.Link></Link>
            <Link href='/' passHref><Nav.Link className='mx-2' >Security</Nav.Link></Link>
            <Link href='/' passHref><Nav.Link className='mx-2' >Get Started</Nav.Link></Link>
          </Nav>

          <Nav>
            <Button variant='outline-primary' className={`${classes.outlineBtn} mr-3`} onClick={buttonHandler.bind(null, '/login')} >
              Login
            </Button>
            <Button variant='outline-primary' className={classes.outlineBtn} onClick={buttonHandler.bind(null, '/signup')} >
              Sign Up
            </Button>
          </Nav>

        </Navbar.Collapse>
      </Navbar>


      <PageHeader btnHandler={buttonHandler.bind(null, '/login')} />



    </div>
  )
}


const PageHeader = (props) => {
  return (
    <div className={classes.header} >
      <h1 className='mb-5' >Splinter Bot</h1>
      <p className='mb-4' >The smartest way to play matches<br />and farm dark energy crystals </p>
      <Button
        variant="outline-primary"
        className={`${classes.outlineBtn} ${classes.getStarted}`}
        onClick={props.btnHandler}
      >Get Started</Button>
    </div>
  )
}



export default HomePage
