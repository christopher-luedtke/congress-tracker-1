import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Button, Container } from 'react-bootstrap'


const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()


  return (
    <Container>
      <Form>
        <h2>Login Page</h2>
        <Form.Group controlId="username">
          <Form.Label htmlFor="username">Username: </Form.Label>
          <Form.Control
            type="text"
            id="username"
            placeholder="Enter a username"
            onChange={e => setUsername(e.target.value)}
            value={username}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label htmlFor="password">Password: </Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="password"
            placeholder="Enter a password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </Form.Group>
        <Form.Group>
          <Button className="mt-3" onClick={async () => {
            let loginUser = { username, password }
            let login = await fetch('/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(loginUser)
            });

            if (login.ok) {
              history.push(`/profile/${username}`)
              console.log(login)
            }
          }
          }>Login</Button>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default Login;