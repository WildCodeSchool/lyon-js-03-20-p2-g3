import React from 'react';
import './HiddenCards.css';

function HiddenCards ({ deck }) {
  return (
    <div className='hiddenCardBlock'>
      <div className='deckCount'>
        {deck.filter(heroe => heroe.position === 'deck').length}
      </div>
    </div>
  );
}

export default HiddenCards;
