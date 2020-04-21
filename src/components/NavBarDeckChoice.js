import React from 'react';
import './NavBarDekChoice.css';
import Button from './Button';

function NavBarDeckChoice ({ heroes }) {
  return (
    <div className='super-container-nav'>
      <nav>
        <ul className='container-nav'>
          <li>
            <Button id='button-home' link='/' linkName='&lt; Home' />
          </li>
          <li id='title'>Choose your Heroes</li>
          <li>
            <Button id='button-battle' link='/deckboard' linkName='Start' />
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBarDeckChoice;
