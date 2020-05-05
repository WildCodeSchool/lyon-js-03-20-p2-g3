import React from 'react';
import CardOfDeckBoard from './CardOfDeckBoard';
import './CardList.css';
import './Card.css';

function HandCards (props) {
  return (
    <>
      {props.heroesChosen.filter(heroe => heroe.position === 'hand').map(heroe => {
        return (
          <CardOfDeckBoard heroe={heroe} key={heroe.name} onHandToBoard={props.onHandToBoard} playerTurn={props.playerTurn} />
        );
      })}
    </>
  );
}
export default HandCards;
