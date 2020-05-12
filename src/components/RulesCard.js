import React from 'react';
// import PropTypes from 'prop-types';
import './Rules.css';

function RulesCard (props) {
  return (
    <div className='singleCard'>
      <div className='image'>
        <img src={props.image} alt={props.alt} />
      </div>
      <div className='explanation'>
        <h3>{props.nameOfRule}</h3>
        <p>{props.textRule}</p>
      </div>
    </div>
  );
}

export default RulesCard;
