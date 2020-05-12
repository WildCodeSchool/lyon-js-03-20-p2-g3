import React from 'react';
//import PropTypes from 'prop-types';
import './Rules.css';


function RulesCard(props) {
    return (
        <div className='singleCard'>
            <picture className='image'>
                <img src={props.image} alt={props.alt} />
            </picture>
            <div className='explanation'>
                <h3>{props.nameOfRule}</h3>
                <p>{props.textRule}</p>
            </div>
        </div>
    );
}

export default RulesCard;