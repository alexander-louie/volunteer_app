import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';
import CheckIn from './CheckIn.js';
import CheckOut from './CheckOut.js';
import Locate from './Locate.js';
import SignUp from './SignUp.js'
import Card from './Card.js';
import Navbar from './Navbar.js';

const apiCall = () => {
  axios.get('http://localhost:8080/locations').then((data) => {
    console.log(data)
  })
}

function App() {
  return (
    <div className="App">
      {/* <button onClick={apiCall}>test api call</button> */}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<CheckIn />} />
          <Route path='/check-in' element={<CheckIn />} />
            <Route path='/check-in/:id' element={<Card />} />
          <Route path='/check-out' element={<CheckOut />} />
          <Route path='/locate' element={<Locate />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
