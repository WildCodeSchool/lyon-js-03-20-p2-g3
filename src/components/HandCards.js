import React from 'react';
import CardOfDeckBoard from './CardOfDeckBoard';
import './CardList.css';
import './Card.css';

function HandCards (props) { // props : soit heroeChosen  soit cardAvaibleForIa
  return (
    <>
      {props.heroesChosen.filter(heroe => heroe.position === 'hand').map(heroe => {
        return (
          <CardOfDeckBoard heroe={heroe} key={heroe.iaDeck ? `${heroe.name}Ia` : heroe.name} onHandleHandToBoard={props.onHandleHandToBoard} playerTurn={props.playerTurn} />
        );
      })}
    </>
  );
}
export default HandCards;
