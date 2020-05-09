import React from 'react';
import CardOfDeckBoard from './CardOfDeckBoard';
import './CardList.css';
import './Card.css';

function Board (props) {
  return (
    <>
      {props.heroesChosen.filter(heroe => heroe.position === 'board').map(heroe => {
        return (
          !heroe.deadOnBoard && <CardOfDeckBoard heroe={heroe} key={heroe.name} onHandToBoard={props.onHandToBoard} onSelectedCard={props.onSelectedCard} onAttackIaCard={props.onAttackIaCard} playerTurn={props.playerTurn} />
        );
      })}
    </>
  );
}
export default Board;
