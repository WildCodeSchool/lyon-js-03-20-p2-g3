import React from 'react';
import HiddenCards from './HiddenCards';
import heroes from './heroes';

class DeckBoard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      heroesChosen: props.heroesChosen,
      computerDeck: heroes.map(heroe => {
        return {
          name: heroe.name,
          img: heroe.image.url,
          atk: parseInt(heroe.powerstats.combat, 10),
          hp: parseInt(heroe.powerstats.durability, 10),
          power: parseInt(heroe.powerstats.power, 10),
          position: 'deck'
        };
      })
    };
  }

  render () {
    return (
      <div>
        <HiddenCards deck={this.state.computerDeck} />
        <HiddenCards deck={this.state.heroesChosen} />
      </div>

    );
  }
}

export default DeckBoard;
