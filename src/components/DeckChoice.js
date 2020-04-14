import React from 'react';
import {Link} from 'react-router-dom';

function DeckChoice ({ heroes }) {
    return (
        <div>
            <li>
                <Link to="/">Home</Link>
            </li>
        <p>{heroes[0].name}</p>
        </div>
    )
}

export default DeckChoice;