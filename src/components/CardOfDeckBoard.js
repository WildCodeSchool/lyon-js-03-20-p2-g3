import React from 'react';
import './Card.css';

function CardOfDeckBoard ({ heroe,handleHandToBoard,key }) {
  return (
    <div className='card' onClick={heroe.position === 'hand' ? ()=> handleHandToBoard(heroe.name) : ''}>
      <section className='pw'>
        {heroe.power} PW
      </section>
      <img className='imageCard' src={heroe.img} alt={heroe.name} />
      <section className='containerBottom'>
        <div className='atk'><p className={heroe.name}>{heroe.atk}</p></div>
        <div className='hp'><p className={heroe.name}>{heroe.hp}</p></div>
      </section>
    </div>
  );
}

export default CardOfDeckBoard;
