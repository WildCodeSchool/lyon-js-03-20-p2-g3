import React from 'react';
import HandCards from './HandCards';

class DeckBoard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      heroes: props.heroes,
      heroesChosen: props.heroesChosen,
      cardsAvalaibleForIA: [],
      player1Hand: [],
      player1Deck: []
    };
  }

  componentDidMount () {
    // Looping on heroesChosen array to select the heroes not chosen  :
    const arrayOfAllHeroes = this.state.heroes;
    const arrayOfPlayerOneHeroes = this.state.heroesChosen;
    const cardsAvalaibleForIA = this.extractItemsNotPresentArr1FromArr2(arrayOfPlayerOneHeroes, arrayOfAllHeroes);
    const threeFirstCards = this.randomizeHeroesChosen(arrayOfPlayerOneHeroes, 3);
    console.log(arrayOfPlayerOneHeroes);
    console.log(threeFirstCards);

    const cardsInDeckPlayer1 = this.extractItemsNotPresentArr1FromArr2(threeFirstCards, arrayOfPlayerOneHeroes);
    // Update Player 1's hand cards
    this.setState({ player1Hand: threeFirstCards });
    // Update cards in the Player's Deck :
    this.setState({ player1Deck: cardsInDeckPlayer1 });
    // Update cards available for IA
    this.setState({ cardsAvalaibleForIA: cardsAvalaibleForIA });
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

  extractItemsNotPresentArr1FromArr2 = (arr1, arr2) => {
    // length of arr1 < length of arr2, all items in arr 1 are included in arr2
    const outputArray = [];
    for (let i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) === -1) {
        outputArray.push(arr2[i]);
      }
    }
    return outputArray;
  }

  render () {
    return (
      <div>
        <HandCards heroesChosen={this.state.heroesChosen} player1Hand={this.state.player1Hand} />
      </div>
    );
  }
}

export default DeckBoard;
