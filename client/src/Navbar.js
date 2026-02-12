import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import './Navbar.css';

library.add(fas, far, fab)


export default function Navbar() {
    return (
        <nav className="navbar">
            <div className='navbar-left'>
                <a href="/" className='logo'>
                    <FontAwesomeIcon icon="fa-regular fa-house" />
                </a>
            </div>
            <div className='navbar-center'>
                <ul className='nav-links'>
                    <li>
                        <a href="/check-in">Check In</a>
                    </li>
                    <li>
                        <a href="/check-out">Check Out</a>
                    </li>
                    <li>
                        <a href='/sign-up'>Sign Up</a>
                    </li>
                    <li>
                        <a href="/locate">Locate Lanyard</a>
                    </li>
                </ul>
            </div>
            <div className='navbar-right'></div>
        </nav>
    )
}
