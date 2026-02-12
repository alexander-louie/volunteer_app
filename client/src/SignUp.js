import { useState, useEffect } from 'react';
import axios from 'axios';
import './SignUp.css';

const BASE_URL = 'http://localhost:8080';
const MAX_LANYARDS = 150;


const Lanyard = ({ lanyardID, handleChange }) => {
    return (
        <input type="number" name="lanyard_id" min={1} max={MAX_LANYARDS} value={lanyardID} onChange={handleChange} required/>
    )
}

export default function SignUp() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        location: "",
        lanyard_id: [],
        email: "",
        phone_number: "",
        returned: []
    })
    const [locations, setLocations] = useState([]);
    const [lanyards, setLanyards] = useState([])
    
    const handleChange = (e) => {
        const value = e.target.value;
        if (e.target.name !== "lanyard_id") {
            setFormData({
                ...formData,
                [e.target.name]: value
            })
        } else {
            setFormData({
                ...formData,
                [e.target.name]: [
                    ...formData.lanyard_id,
                    value
                ]
            })
        }
    }

    const handleSubmit = (e) => {
        setFormData({
            ...formData,
            returned: Array(formData.lanyard_id.length).fill(false)
        });

        const userData = {
            ...formData,
            first_name: formData.first_name.toUpperCase(),
            last_name: formData.last_name.toUpperCase()
        }
        e.preventDefault();
        axios.post(`${BASE_URL}/addvolunteer`, userData)
        .then(res => {
            console.log(res);
        }).catch(err => {
            console.error(err);
        })
    }
    
    const getLocations = () => {
        axios.get(`${BASE_URL}/locations`)
        .then((res) => {
            // console.log(res.data);
            setLocations(res.data);
        }).catch((err) => {
            console.error(err);
        })
    };

    // makes getLocations() run twice, once when page opens, and again once it's updated
    // empty dependency array makes this work?
    useEffect(() => {
        getLocations();
    }, []);

    const setLanyardID = (id) => {
        setLanyards([
            ...lanyards,
            id
        ]);
    }

    return (
        <div className="sign-up">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className='box'>
                    <label>
                        FIRST NAME
                        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required/>
                    </label>
                    <label>
                        LAST NAME
                        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required/>
                    </label>
                </div>
                <div className='box'>
                    <label>
                        LOCATION
                        <select>
                            {locations.map(({location}, key) => {
                                return (
                                    <option value={location} key={key} name="location" onSelect={handleChange}>{location}</option>
                                )
                            })}
                        </select>
                    </label>
                </div>
                <div className='box'>
                    <label>
                        PHONE NUMBER
                        <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
                    </label>
                    <label>
                        EMAIL
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </label>
                </div>
                <div className='box'>
                    <label>
                        LANYARD
                        {lanyards.map((val, key) => {
                            return (
                                <Lanyard key={key} lanyardID={val[key]} handleChange={handleChange}/>
                            )
                        })}
                        <input type="button" value="+" onClick={setLanyardID}/>
                    </label>
                </div>
                <input type='submit' value="Submit" />
            </form>
        </div>
    )
}
