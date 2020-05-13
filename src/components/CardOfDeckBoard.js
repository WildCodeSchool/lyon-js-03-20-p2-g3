import React from 'react';
import './CardOfDeckBoard.css';

function CardOfDeckBoard ({ heroe, onHandleHandToBoard }) {
  return (
    <div className='cardBoard' onClick={heroe.position === 'hand' ? () => onHandleHandToBoard(heroe.name) : ''}>
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
