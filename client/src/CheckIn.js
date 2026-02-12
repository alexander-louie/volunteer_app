import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CheckIn.css';
import Card from './Card.js'

const BASE_URL = 'http://localhost:8080/volunteers';

const CardContainer = ( data ) => {
  <div className='card-container'>
    {data.length > 0 ? data.map((item) => {
      <Card data={item} key={item.volunteer_id}/>
    })
    : <p>Error in fetching data</p>
    }
  </div>
}

const Forms = ({ name, setName, getVolunteer }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    setName({
      ...name,
      [e.target.name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    getVolunteer();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        FIRST NAME
        <input type="text" name="firstName" value={name.firstName} onChange={handleChange} required/>
      </label>
      <label>
        LAST NAME
        <input type="text" name='lastName' value={name.lastName} onChange={handleChange} required/>
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}

export default function CheckIn() {
  const [name, setName] = useState({
    firstName: "",
    lastName: ""
  });
  const [data, setData] = useState([]);

  const getVolunteer = async () => {
    try {
      const userData = {
        firstName: name.firstName.toUpperCase(),
        lastName: name.lastName.toUpperCase()
      };
      const res = await axios.post(BASE_URL, userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(res.data);
      setData(res.data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getVolunteer();
  })

  return (
    <>
      <div className='check-in'>
        <h1>CHECK IN</h1>
        <Forms name={name} setName={setName} getVolunteer={getVolunteer} />
      </div>
      <CardContainer data={data} />
    </>
  )
}
