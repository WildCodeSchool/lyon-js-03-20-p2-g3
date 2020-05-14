import React from 'react';
import './CardHistory.css';

function CardHistory ({ deadHeroe }) {
  return (
    <div className={deadHeroe.iaDeck ? 'historyCard iaHistoryCard' : 'historyCard playerHistoryCard '}>
      <img className='historyImg' src={deadHeroe.img} alt={deadHeroe.name} />
      <p className='historyName'>{deadHeroe.name}</p>
    </div>
  );
}

export default CardHistory;
