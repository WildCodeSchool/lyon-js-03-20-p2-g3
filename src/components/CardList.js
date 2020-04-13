import React from 'react';
import Card from './Card';
import './CardList.css'

function CardList ({ heroes }) {
    return (
        <div className="cardList">
          {heroes.map(heroe => {
               return (
                 <Card heroe={heroe} />
               )
          }
            )}
        </div>
    )
}

export default CardList;