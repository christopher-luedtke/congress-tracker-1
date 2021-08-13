import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Form, ListGroup, ListGroupItem } from 'react-bootstrap';

const CongressProfile = () => {
  const [details, setDetails] = useState({ congressPerson: [] })
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [party, setParty] = useState('')
  const [us_state, setState] = useState('')
  const [total_votes, setTotalVotes] = useState('')
  const [voted_present, setVotedPresent] = useState('')
  const [voted_with, setVotedWith] = useState('')
  const [voted_against, setVotedAgainst] = useState('')
  const [missed_votes, setMissedVotes] = useState('')

  const { id } = useParams()

  const getProfile = () => {
    const headers = {
      'X-API-KEY': 'Tsnxa0oyxxww5iixT1BXaH3KGUUNqpTfCIpRihBm',
      'Content-Type': 'text/plain'
    }
    const profile = fetch(`https://api.propublica.org/congress/v1/members/${id}.json`, { headers })
      .then(res => res.json())
    console.log(profile)

    Promise.all([profile])
      .then((res) => {
        const member = res[0].results[0]
        setDetails({ congressPerson: member })
      })
    console.log(profile)
    return profile
  }

  useEffect(() => {
    getProfile()
  }, [])

  console.log(details)

  return (
    <Container>
      <Form>
        <h1>{details.congressPerson.first_name} {details.congressPerson.last_name}</h1>
        <ListGroup as="ul">
          <ListGroupItem
            as="li"
            id="first_name"
            onChange={e => setFirstName(e.target.value)}
            value={first_name}
          >
            First Name: {details.congressPerson.first_name}
          </ListGroupItem>
          <ListGroupItem
            as="li"
            id="last_name"
            onChange={e => setLastName(e.target.value)}
            value={last_name}
          >
            Last Name: {details.congressPerson.last_name}
          </ListGroupItem>
          <ListGroupItem
            as="li"
            id="party"
            onChange={e => setParty(e.target.value)}
            value={party}
          >
            Party: {details.congressPerson.roles[0].party}
          </ListGroupItem>
          <ListGroupItem
            as="li"
            id="us_state"
            onChange={e => setState(e.target.value)}
            value={us_state}
          >
            State: {details.congressPerson.roles[0].state}
          </ListGroupItem>
          <ListGroupItem
            as="li"
            id="total_votes"
            onChange={e => setTotalVotes(e.target.value)}
            value={total_votes}
          >
            Total Votes: {details.congressPerson.roles[0].total_votes}
          </ListGroupItem>
          <ListGroupItem
            as="li"
            id="voted_present"
            onChange={e => setVotedPresent(e.target.value)}
            value={voted_present}
          >
            Voted Present: {details.congressPerson.roles[0].total_present}
          </ListGroupItem>
          <ListGroupItem
            as="li"
            id="voted_with"
            onChange={e => setVotedWith(e.target.value)}
            value={voted_with}
          >
            Voting Percentage With Party: {details.congressPerson.roles[0].votes_with_party_pct}%
          </ListGroupItem>
          <ListGroupItem
            as="li"
            id="voted_against"
            onChange={e => setVotedAgainst(e.target.value)}
            value={voted_against}
          >Voting Percentage Against Party: {details.congressPerson.roles[0].votes_against_party_pct}%
          </ListGroupItem>
          <ListGroupItem
            as="li"
            id="missed_votes"
            onChange={e => setMissedVotes(e.target.value)}
            value={missed_votes}
          >Missed Votes Percentage: {details.congressPerson.roles[0].missed_votes_pct}%
          </ListGroupItem>
        </ListGroup>
        <Button onClick={async () => {
          let follow = { id, first_name, last_name, party, us_state, total_votes, voted_present, voted_with, voted_against, missed_votes }
          let following = await fetch('/congress-profile/<id>', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(follow)
          });

          if (following.ok) {
            console.log(following)
          }
        }
        }>Follow</Button>
      </Form>
    </Container>
  )
}

export default CongressProfile;