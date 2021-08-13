import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Container } from 'react-bootstrap'

const Profile = ({ userDetails }) => {

  return (
    <Container>
      <Form>
        <Form.Group>
          {userDetails.map(user => {
            return (
              <Form.Label key={user.username}>
                <h3>Username: {user.username}</h3>
                <h3>First Name: {user.first_name}</h3>
                <h3>Last Name: {user.last_name}</h3>
                <h3>Email: {user.email}</h3>
              </Form.Label>
            )
          })}
        </Form.Group>

      </Form>
    </Container>
  )
}

export default Profile;