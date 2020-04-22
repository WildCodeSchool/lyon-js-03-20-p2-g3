import React from 'react';

function HiddenCards ({ deck }) {
  return (
    <div>{deck.filter(heroe => heroe.position === 'deck').length}</div>
  );
}

export default HiddenCards;
