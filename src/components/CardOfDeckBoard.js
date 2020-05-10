import React from 'react';
import './CardOfDeckBoard.css';

function CardOfDeckBoard ({ selected, heroe, switchCards, lastCard, onHandToBoard, onSelectedCard, onAttackIaCard, playerTurn }) {
  const handleClickOnCardOfDeckBoard = () => {
    if (heroe.position === 'hand' && playerTurn) {
      if (!lastCard) {
        return onHandToBoard(heroe.name);
      } else {
        return switchCards(heroe.name);
      }
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
      {/* <section className='pwBoard'>
        {heroe.power} PW
      </section> */}
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
