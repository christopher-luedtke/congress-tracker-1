import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Results from './Results'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Container, Button } from 'react-bootstrap'

const Home = () => {
  const [query, setQuery] = useState('')
  const [filteredQuery, setFilteredQuery] = useState({ senate: [], house: [] });
  const [resultSet, setResultSet] = useState({ senate: [], house: [] });

  let getData = () => {
    const headers = {
      'X-API-KEY': 'Tsnxa0oyxxww5iixT1BXaH3KGUUNqpTfCIpRihBm',
      'Content-Type': 'text/plain'
    }

    const fetchSenate = fetch('https://api.propublica.org/congress/v1/117/senate/members.json', { headers }).then(res => res.json())
    const fetchHouse = fetch('https://api.propublica.org/congress/v1/117/house/members.json', { headers }).then(res => res.json());

    Promise.all([fetchSenate, fetchHouse])
      .then((res) => {

        const senateMembers = res[0].results[0].members;
        const houseMembers = res[1].results[0].members;

        setResultSet({ senate: senateMembers, house: houseMembers });
      })
  };

  useEffect(() => {
    getData()
  }, [])

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const filteredSenate = resultSet.senate.filter(member => {
      // member from the senate
      if (member.first_name.includes(query) || member.last_name.includes(query)) {
        return member.first_name, member.last_name, member.id
      };
    })

    const filteredHouse = resultSet.house.filter(member => {
      // member from the house
      if (member.first_name.includes(query) || member.last_name.includes(query)) {
        return member.first_name, member.last_name, member.id
      };
    })

    setFilteredQuery({ house: filteredHouse, senate: filteredSenate });
  }

  return (
    <div>
      <h1 className="home">Congress Tracker</h1>
      <h3>Welcome to Congress Tracker! This site is intended to make searching politicians and their voting records easy. If you wish, you can also sign up for an account in order to follow politican leaders.
      </h3>
      <Form controlId="search" onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleChange}
        />
        <Button className="mt-3 mb-3" type="submit">Search</Button>
      </Form>
      <Results results={filteredQuery} />
      <p>Have an account? <Link to="/login">Login!</Link></p>
      <p>Want an account? <Link to="/create-new-user">Sign up!</Link></p>
    </div>
  )
}

export default Home;