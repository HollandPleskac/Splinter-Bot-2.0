import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap'

const SignUp = () => {
  return (
    <div className='m-5' >
        <Form.Group>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group>
          <Form.Control type='text' placeholder='testing' />
        </Form.Group>

        <Form.Group>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          sign up coming soon!
        </Button>
    </div>
  )
}

export default SignUp
