import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

function Button (props) {
  const handleRemoveDeck = props.removeDeck
  return (
    <Link className='button-config' id={props.buttonId} to={props.link} onClick={handleRemoveDeck}>{props.linkName}</Link>
  );
}

export default Button;
