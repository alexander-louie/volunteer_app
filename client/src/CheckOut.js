import { useState } from 'react';
import axios from 'axios';
import './CheckOut.css';

const MIN_LANYARD = 0;
const MAX_LANYARD = 100;
const BASE_URL = 'http://localhost/findvolunteerID';

const Form = ({ setID }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        lanyardID: 0
    });
    const handleChange = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("formData: ", formData);
        setID(formData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                FIRST NAME
                <input type='text' name='firstName' value={formData.firstName} onChange={handleChange} />
            </label>
            <label>
                LAST NAME
                <input type='text' name='lastName' value={formData.lastName} onChange={handleChange} />
            </label>
            <label>
                LANYARD ID
                <input type='number' name='lanyardID' value={formData.lanyardID} onChange={handleChange} min={MIN_LANYARD} max={MAX_LANYARD} />
            </label>
            <input type='submit' value='Search'/>
        </form>
    )
}

/**
 * find volunteer id first
 * pull up current lanyards in use with volunteer id
 */
export default function CheckOut() {
    const [volunteerID, setVolunteerID] = useState("");

    const setID = async (volunteerData) => {
        try {
            const userData = {
                firstName: volunteerData.firstName.toUpperCase(),
                lastName: volunteerData.lastName.toUpperCase(),
                lanyardID: [volunteerData.lanyardID]
            }
            const res = await axios.post(BASE_URL, userData);
            console.log("res.data: ", res.data);
            setVolunteerID(res.data);
            console.log("volunteerID: ", volunteerID);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className='checkout'>
            <h1>CHECK OUT</h1>
            <Form setID={setID}/>
        </div>
    );
}
