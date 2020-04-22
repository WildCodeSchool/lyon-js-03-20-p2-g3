import React from 'react';
import HandCards from './HandCards';
import './DeckBoard.css';

class DeckBoard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      heroes: props.heroes,
      heroesChosen: props.heroesChosen,
      cardsAvalaibleForIA: props.heroes
      // player1Hand: [],
      // player1Deck: []
    };
  }

  randomizeHeroesChosen = (arrayOfHeroes, nbCardsToRandomize) => {
    let outputArray = [];
    const heroesChosenRandomized = [];
    const arrayOfRandomNumbers = [];
    while (arrayOfRandomNumbers.length < arrayOfHeroes.length) {
      const randomNumber = Math.floor(Math.random() * arrayOfHeroes.length);
      if (arrayOfRandomNumbers.indexOf(randomNumber) === -1) {
        arrayOfRandomNumbers.push(randomNumber);
      }
    }
    for (let i = 0; i < arrayOfHeroes.length; i++) {
      heroesChosenRandomized.push(arrayOfHeroes[arrayOfRandomNumbers[i]]);
    }
    outputArray = heroesChosenRandomized.slice(0, nbCardsToRandomize);
    return outputArray;
  }

  HandleHandToBoard = (heroeName) => {
    // const heroesChosen = this.state.heroesChosen
    const newDeck = this.state.heroesChosen.map(heroe => {
      if (heroe.name === heroeName) {
        return { ...heroe, position: 'board' };
      } else {
        return heroe;
      }
    });
    this.setState({ heroesChosen: newDeck });
  }

  render () {
    return (
      <div>
        <div className='player1and'>
          <HandCards heroesChosen={this.state.heroesChosen} randomizeHeroesChosen={this.randomizeHeroesChosen} />
        </div>
        <div className='iahand'>
        IA'S CARDS
          <HandCards heroesChosen={this.state.cardsAvalaibleForIA} randomizeHeroesChosen={this.randomizeHeroesChosen} HandleHandToBoard={this.HandleHandToBoard} />
        </div>
      </div>
    );
  }
}

export default DeckBoard;
