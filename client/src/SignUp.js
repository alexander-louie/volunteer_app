import { useState } from 'react';
import './SignUp.css';

export default function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const handleSubmit = () => {

    }
    return (
        <div className="sign-up">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    FIRST NAME
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </label>
                <label>
                    LAST NAME
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </label>
                <input type='submit' value="Submit" />
            </form>
        </div>
    )
}
