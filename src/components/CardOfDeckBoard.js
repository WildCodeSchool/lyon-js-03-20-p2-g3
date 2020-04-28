import React from 'react';
import './CardOfDeckBoard.css';

function CardOfDeckBoard ({ heroe, onhandleHandToBoard, onSelectedCard, heroesChosen }) {
  const handleClickOnCardOfDeckBoard = (event) => {
    console.log(event.currentTarget);
    if (heroe.position === 'hand') {
      return onhandleHandToBoard(heroe.name);
    } else if (heroe.position === 'board') {
      // event.currentTarget.style.border ='2px solid red';
      return onSelectedCard(heroe.name);
    }
  };

  return (
    <div className={heroe.selected === true ? 'cardBoard toggleCardSelect' : 'cardBoard'} onClick={handleClickOnCardOfDeckBoard}>
      <section className='pwBoard'>
        {heroe.power} PW
      </section>
      <img className='imageCardBoard' src={heroe.img} alt={heroe.name} />
      <section className='containerBottomBoard'>
        <div className='atkBoard'><p className={heroe.name}>{heroe.atk}</p></div>
        <div className='hpBoard'><p className={heroe.name}>{heroe.hp}</p></div>
      </section>
    </div>
  );
}

export default CardOfDeckBoard;
