import React from 'react';
import './Home.css';
import Button from './Button';

function NavBar () {
    return (
        <div>
            <nav>
                <li>
                    <Button link="/options" linkName="Options"/>
                </li>
                <li>
                    <Button link="/rules" linkName="Rules"/>
                </li>
                <li>
                    <Button link="/deckchoice" linkName="Play" buttonId="play-button"/>
                </li>
            </nav>
        </div>
        
    )
}

export default NavBar;