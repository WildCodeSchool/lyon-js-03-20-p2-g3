import React from 'react';
import Card from './Card';
import './CardList.css'

function CardList({ heroes, addToDeck, heroesChosen }) {
    return (
        <main className="cardList">
            {heroes.map(heroe => {
                return (
                    <Card heroe={heroe} heroesChosen={heroesChosen} addToDeck={addToDeck} />
                )
            }
            )}
        </main>
    )
}

export default CardList;
