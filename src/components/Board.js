import React from 'react';
import CardOfDeckBoard from './CardOfDeckBoard';
import './CardList.css';
import './Card.css';

function Board (props) {
  /* const threeFirstCards = props.randomizeHeroesChosen(props.heroesChosen,3); */
  return (
    <>
      {props.heroesChosen.filter(heroe => heroe.position === 'board').map(heroe => {
        return (
          !heroe.deadOnBoard && <CardOfDeckBoard heroe={heroe} key={heroe.iaDeck ? `${heroe.name}Ia` : heroe.name} />
        );
      })}
    </>
  );
}
export default Board;
