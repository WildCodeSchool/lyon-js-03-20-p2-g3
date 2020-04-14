import React from 'react';
import {Link} from 'react-router-dom';
import RulesCard from './RulesCard'

function Rules () {
    return (
        <div>
            <li>
                <Link to="/">Home</Link>
                <RulesCard />
            </li>
            <h2>This is Rules</h2>
        </div>
    )
}

export default Rules;