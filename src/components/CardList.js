import React from 'react';
import Card from './Card';
import './CardList.css'

function CardList({ heroes, addToDeck }) {
    return (
        <div className="cardList">
            {heroes.map(heroe => {
                return (
                    <Card heroe={heroe} addToDeck={addToDeck} />
                )
            }
            )}
        </div>
    )
}

export default CardList;
