import React from 'react';
import { Link } from 'react-router-dom';

function Options () {
    return (
        <div>
            <li>
                <Link to="/">Home</Link>
            </li>
            <h2>This is Options</h2>
        </div>
    )
}

export default Options;