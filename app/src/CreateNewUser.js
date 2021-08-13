import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Form } from 'react-bootstrap';

const CreateNewUser = () => {
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <Container>
      <Form>
        <h2>Create Your Profile!</h2>
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
        <Form.Group controlId="first_name">
          <Form.Label htmlFor="first_name">First Name: </Form.Label>
          <Form.Control
            type="text"
            id="first_name"
            name="first_name"
            placeholder="Enter your first name"
            onChange={e => setFirstName(e.target.value)}
            value={firstName}
          />
        </Form.Group>
        <Form.Group controlId="last_name">
          <Form.Label htmlFor="last_name">Last Name: </Form.Label>
          <Form.Control
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Enter a last name"
            onChange={e => setLastName(e.target.value)}
            value={lastName}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label htmlFor="email">Email: </Form.Label>
          <Form.Control
            type="email"
            id="email"
            name="email"
            placeholder="Enter a email"
            onChange={e => setEmail(e.target.value)}
            value={email}
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
        <Form.Group controlId="confirm_password">
          <Form.Label htmlFor="confirm_password">Confirm Password: </Form.Label>
          <Form.Control
            type="password"
            id="confirm_password"
            name="confirm_password"
            placeholder="Confirm your password"
            onChange={e => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </Form.Group>
        <Form.Group>
          <Button className="mt-3" onClick={async () => {
            let newUser = { username, firstName, lastName, email, password }
            let create = await fetch('/create-new-user', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(newUser)
            });

            if (create.ok) {
              console.log(create)
            }
          }
          }>Create user!</Button>
        </Form.Group>
      </Form >
    </Container>
  )
}

export default CreateNewUser;