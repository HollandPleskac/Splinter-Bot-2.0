import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'

import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt, faEye, faSignal, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import classes from './dashboard.module.css'

const Dashboard = () => {
  return (
    <div className={classes.pageWrapper} >
      <Sidebar />
      <div>
      <Topbar />
      <div className={classes.pageContent} >
        testing
      </div>
      </div>
    </div>
  )
}

const Topbar = () => {
  return (
    <Navbar className={`${classes.topbar} shadow-sm`} >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse  id="basic-navbar-nav" className={`${classes.prof} d-flex align-items-center justify-content-end`} >
        <p>Holland Pleskac</p>
        <Image src="/prof_pic.jpg" alt="pic" width={40} height={40} className={classes.profPic} />
      </Navbar.Collapse>
    </Navbar>
  )
}


const Sidebar = () => {
  return (
    <Nav className={`${classes.sidebar} flex-column`} >

      <div className={classes.sidebarHeader} >
        <Image src="/logo-white.png" alt="Logo" width={40} height={40} />
        <h1>Splinter Bot</h1>
      </div>

      <hr className={`${classes.divider} mb-2`} />

      <Link href='/' passHref>
        <Nav.Link className={classes.sidebarLink}>
          <FontAwesomeIcon icon={faTachometerAlt} className='mr-2' />
          Dashboard
        </Nav.Link>
      </Link>

      <hr className={`${classes.dividerAlt} mt-2 mb-2`} />

      <Link href='/' passHref>
        <Nav.Link className={classes.sidebarLink}>
          <FontAwesomeIcon icon={faEye} className='mr-2' />
          Live View
        </Nav.Link>
      </Link>

      <Link href='/' passHref>
        <Nav.Link className={classes.sidebarLink}>
          <FontAwesomeIcon icon={faSignal} className='mr-2' />
          Statistics
        </Nav.Link>
      </Link>

      <Link href='/' passHref>
        <Nav.Link className={classes.sidebarLink}>
          <FontAwesomeIcon icon={faUserCircle} className='mr-2' />
          Account
        </Nav.Link>
      </Link>

      <hr className={`${classes.dividerAlt} mt-auto mb-2`} />
      <Link href='/' passHref>
        <Nav.Link className={`${classes.sidebarLink} mt-1 mb-3`}>
          <FontAwesomeIcon icon={faSignOutAlt} className='mr-2' />
          Sign Out
        </Nav.Link>
      </Link>

    </Nav>
  )
}


export default Dashboard
