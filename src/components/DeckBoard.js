import React from 'react';
import HandCards from './HandCards';

class DeckBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heroes: props.heroes,
      cardsAvalaibleForIA: [],
      heroesChosen: props.heroesChosen,
      player1Hand : []
    };
  }

  randomizeHeroesChosen = (arrayOfHeroes, nbCardsToRandomize) => {
    let heroesChosenRandomized = [];
    const arrayOfRandomNumbers = [];
    while (arrayOfRandomNumbers.length < arrayOfHeroes.length) {
      const randomNumber = Math.floor(Math.random() * arrayOfHeroes.length);
      if (arrayOfRandomNumbers.indexOf(randomNumber) === -1) {
        arrayOfRandomNumbers.push(randomNumber);
      }
    }
    for (let i = 0; i < arrayOfHeroes.length; i++) {
      heroesChosenRandomized.push(arrayOfHeroes[arrayOfRandomNumbers[i]])
    }
    console.log(arrayOfHeroes)
    console.log(heroesChosenRandomized);
    return heroesChosenRandomized.slice(0,nbCardsToRandomize);
  }

  componentDidMount() {
    // Looping on heroesChosen array to select the heroes not chosen  :
    const arrayOfAllHeroes = this.state.heroes;
    const arrayOfPlayerOneHeroes = this.state.heroesChosen;
    let cardsAvalaibleForIA = [];
    for (let i=0;i<arrayOfAllHeroes.length;i++) {
      if (arrayOfPlayerOneHeroes.indexOf(arrayOfAllHeroes[i]) === -1) {
        cardsAvalaibleForIA.push(arrayOfAllHeroes[i])
      }
    }
    // Update Player 1's hand cards
    this.setState({player1Hand: this.randomizeHeroesChosen(this.state.heroesChosen,3)})
    
    // Update cards available for IA 
    this.setState({cardsAvalaibleForIA : cardsAvalaibleForIA})
  }

  render() {
    return (
      <div>
        <HandCards heroesChosen={this.state.heroesChosen} randomizeHeroesChosen={this.randomizeHeroesChosen} player1Hand = {this.state.player1Hand} />
      </div>
    );
  }
}

export default DeckBoard;
