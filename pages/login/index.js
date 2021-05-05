import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './auth.module.css'
import Image from 'next/image'

const Login = () => {
  return (
    <Container fluid>
      <Row>
        <Col lg={4} className={`${classes.col} ${classes.colOne}`} >
          adsf
        </Col>
        <Col lg={8} className={`${classes.col} ${classes.colTwo}`}>
          <Image src="/auth_img.svg" alt="Authentication" width={400} height={325} />
          <div>
            <p>SPLINTER BOT</p>
            <h1>Create a free account and farm<br />
              tons of dark energy crystals in<br />
              one click.</h1>
          </div>
        </Col>
      </Row>
    </Container>

  )
}

const LoginForm = () => {
  return (
    <div>
      <h3>WELCOME BACK</h3>
      <h1>Login to account</h1>

    </div>
  )
}


export default Login
