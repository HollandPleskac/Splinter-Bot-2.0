import React from 'react'


import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './signup.module.css'
import { Form, Button } from 'react-bootstrap'
// import './g_test_1.css'

const SignUp = () => {

  return (
    <>
    <h1>sign up page</h1>
    <div className='m-5' >
        <Button variant="primary ml-5" className={classes.btn} >
          sign up coming soon!
        </Button>
    </div>
    </>
  )
}

export default SignUp
