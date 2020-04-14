import React from 'react';
//import PropTypes from 'prop-types';
import './Rules.css';


function RulesCard() = {
        return (
            <div className='Card'>
                <figure className='image'>
                    <img src={this.props.image} alt={this.props.alt} />
                </figure>
                <div className='explanation'>
                    <h3>{this.props.nameOfRule}</h3>
                    <p>{this.props.textRule}</p>
                </div>
            </div>
        );
    }
}

export default RulesCard;