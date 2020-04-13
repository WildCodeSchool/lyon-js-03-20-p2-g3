import React from 'react';
import {Link} from 'react-router-dom';

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
                    <Link to="/deckchoice">Start</Link>
                </li>
            </nav>
        </div>
        
    )
}

export default NavBar;