import React from 'react'
import { useRouter } from 'next/router'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './login.module.css'
import Image from 'next/image'
import Link from 'next/link'

const Login = () => {
  const router = useRouter()

  function buttonHandler(path) {
    router.push(path)
  }

  return (
    <Container fluid>
      <Row>
        <Col lg={4} className={`${classes.col} ${classes.colOne}`} >
          <Button variant="outline-primary" className={`${classes.authNavBtn} ${classes.outlineBtn}`} onClick={buttonHandler} >Sign Up</Button>
          <LoginForm btnHandler={buttonHandler} />
          <p className={classes.privacyLinks} ><Link href='/'>Privacy Policy</Link> and <Link href='/'>Terms of Service</Link></p>
        </Col>
        <Col lg={8} className={`${classes.col} ${classes.colTwo}`}>
          <Image src="/auth_img.svg" alt="Authentication" width={400} height={325} />
          <div>
            <p>SPLINTER BOT</p>
            <h1>Login to your account and farm<br />
              tons of dark energy crystals in<br />
              one click.</h1>
          </div>
        </Col>
      </Row>
    </Container>

  )
}

const LoginForm = (props) => {
  return (
    <div >
      <h3>WELCOME BACK</h3>
      <h1>Login to account</h1>
      <Form.Control type="email" placeholder="Enter your email address" className={`${classes.input} mb-3`} ></Form.Control>
      <Form.Control type="password" placeholder="Enter your password" className={`${classes.input} mb-4`} ></Form.Control>
      <Button variant="primary" className={`${classes.solidBtn} ${classes.authBtn} mb-3`} onClick={props.btnHandler.bind(null, '/dashboard')} >
        Sign in
      </Button>
      <Button variant="outline-primary" className={`${classes.outlineBtn} ${classes.authBtn} ${classes.authGoogleBtn}`} onClick={props.btnHandler.bind(null, '/dashboard')} >
        <img src="/google_img.svg" alt="Google" className={classes.googleImg} />
        Sign in with google
      </Button>
      <p className={`${classes.signUpLink} mt-3 mb-2`} >Don't have an account? <Link href="/">Sign up</Link></p>
      <p className={`${classes.forgotPass}`} ><Link href='/'>Forgot Password</Link></p>
    </div>
  )
}


export default Login
