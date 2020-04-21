import React from 'react';
import './Home.css';
import Button from './Button';

function NavBar () {
  return (
    <nav className='nav-home'>
      <div id='options-rules-container'>
        <li>
          <Button link='/options' linkName='Options' />
        </li>
        <li>
          <Button link='/rules' linkName='Rules' />
        </li>
      </div>
      <div id='play-container'>
        <li>
          <Button link='/deckchoice' linkName='Play' buttonId='play-button' />
        </li>
      </div>
    </nav>
  );
}

export default NavBar;
