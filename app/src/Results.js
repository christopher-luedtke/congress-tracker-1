import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, ListGroup } from 'react-bootstrap'

const Results = ({ results }) => {
  let { senate, house } = results;

  console.log(results)

  return (
    <>
      <Card className="house-results" style={{ elevation: 0, backgroundColor: "white", display: "flex", width: "18rem", textAlign: "left" }} >
        <Card.Body>
          <ListGroup>
            <h2>House Results</h2>
            {
              house.map(member => {
                return <li key={member.id}><Link to={`/congress-profile/${member.id}`}>{member.first_name} {member.last_name}</Link></li>
              })
            }
          </ListGroup>
        </Card.Body>
      </Card>
      <Card className="senate-results" style={{ elevation: 0, backgroundColor: "white", display: "flex", flexWrap: "wrap", width: "18rem", textAlign: "right" }}>
        <Card.Body>
          <ListGroup>
            <h2 className="senate-results">Senate Results</h2>
            {
              senate.map(member => {
                return <li key={member.id}><Link to={`/congress-profile/${member.id}`} >{member.first_name} {member.last_name}</Link>
                </li>
              })
            }
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  )

}

Results.defaultProps = {
  results: {
    house: [],
    senate: [],
  }
}

export default Results;