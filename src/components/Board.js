import React from 'react';
import CardOfDeckBoard from './CardOfDeckBoard';
import './CardList.css';
import './Card.css';

function Board (props) {
  return (
    <>
      {props.heroesChosen.filter(heroe => heroe.position === 'board').map(heroe => {
        return (
          <CardOfDeckBoard heroe={heroe} key={heroe.name} onHandleHandToBoard={props.handleHandToBoard} onSelectedCard={props.onSelectedCard} onAttackIaCard={props.onAttackIaCard} />
        );
      })}
    </>
  );
}
export default Board;
