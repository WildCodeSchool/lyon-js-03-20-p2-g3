import React from 'react';
import './NavBarDekChoice.css'
import { Link } from 'react-router-dom';

function NavBarDeckChoice({ heroes }) {
    return (
        <div>
            <nav>
                <ul className="container" >
                    <li>
                        <Link className="homeButton" to="/"> <button id='button-home' >&lt; Home</button> </Link>
                    </li>
                    <li id='title'>Choose your Heroes</li>
                    <li>
                        <button id='button-battle' link='/Battle' >Let's Battle</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBarDeckChoice;