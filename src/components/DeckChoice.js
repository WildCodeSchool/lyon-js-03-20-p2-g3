import React from 'react';
import {Link} from 'react-router-dom';

function DeckChoice () {
    return (
        <div>
            <li>
                <Link to="/">&lt; Home</Link>
            </li>
            <h2>This is DeckChoice</h2>
        </div>
    )
}

export default DeckChoice;