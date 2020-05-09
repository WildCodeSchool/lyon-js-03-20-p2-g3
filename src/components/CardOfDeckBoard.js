import React from 'react';
import './CardOfDeckBoard.css';

function CardOfDeckBoard ({ heroe, onHandToBoard, onSelectedCard, onAttackIaCard, playerTurn }) {
  const handleClickOnCardOfDeckBoard = () => {
    // Ajoute la carte P1 sur le board
    if (heroe.position === 'hand' && playerTurn) {
      return onHandToBoard(heroe.name);
    } else if (heroe.position === 'board' && !heroe.iaDeck && playerTurn) {
      return onSelectedCard(heroe.name);
    } else if (heroe.iaDeck && heroe.position === 'board') {
      return onAttackIaCard(heroe.name);
    }
  };

  return (
    <div
      className={heroe.selected === true ? 'cardBoard toggleCardSelect' //
        : heroe.position === 'hand' && !heroe.iaDeck ? 'handCard cardBoard'
          : heroe.isFighting ? 'cardBoard fighting'
            : 'cardBoard'}
      onClick={handleClickOnCardOfDeckBoard}
    >
      <section className='pwBoard'>
        {heroe.power} PW
      </section>
      <img className='imageCardBoard' src={heroe.img} alt={heroe.name} />
      <section className='containerBottomBoard'>
        <div className='atkBoard'>
          <p className={heroe.name}>
            {heroe.atk}
          </p>
        </div>
        <div className='hpBoard'>
          <p className={heroe.name}>
            {heroe.hp}
          </p>
        </div>
      </section>
    </div>
  );
}

export default CardOfDeckBoard;
