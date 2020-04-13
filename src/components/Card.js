import React from 'react';

function Card ({ heroes }) {
    return (
        <div>
          <img src={heroes[0].img}/>
          <p>{heroes[0].name}</p>
        </div>
    )
}

export default Card;