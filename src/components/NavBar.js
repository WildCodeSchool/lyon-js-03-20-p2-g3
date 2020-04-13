import React from 'react';
import {Link} from 'react-router-dom';
import './Home.css';

function NavBar () {
    return (
        <div>
            <nav>
                <li>
                    <Link to="/options">Options</Link>
                </li>
                <li>
                    <Link to="/rules">Rules</Link>
                </li>
                <li>
                    <Link to="/deckchoice" id="play-button">Play</Link>
                </li>
            </nav>
        </div>
        
    )
}

export default NavBar;