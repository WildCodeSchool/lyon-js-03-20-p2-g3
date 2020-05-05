import React from 'react';
import HandCards from './HandCards';
import './DeckBoard.css';
import Board from './Board';
import HiddenCards from './HiddenCards';
import _ from 'lodash';
import Timer from './Timer';

const delay = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));
class DeckBoard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      playerTurn: true, // initialise playerTurn à true pour débuter la partie avec le tour du joueur. Deus Sex Machina est généreux.
      onHandleIsAllowedToPutCardFromHandPlayerOneOnHandleBoard: true, // with love <3
      heroesChosen: this.props.heroesChosen, // initialise les héros choisis par le joueur dans le Deck Choice
      cardsAvalaibleForIA: []
    };
  }

  componentDidMount () {
    this.randomizeDeck(this.state.heroesChosen, 'heroesChosen');
    this.createIaDeck();
    this.randomizeDeck(this.state.cardsAvalaibleForIA, 'cardsAvalaibleForIA');
  }

  componentWillUnmount () {
    this.setState({ heroesChosen: [] });
  }
  // On veut limiter le nombre de carte joué sur le board par tour

  handleHandToBoard = (heroeName) => {
    let isAllowedToPutCardOnBoard = this.state.onHandleIsAllowedToPutCardFromHandPlayerOneOnHandleBoard;
    const newDeck = this.state.heroesChosen.map(heroe => {
      if (heroe.name === heroeName && isAllowedToPutCardOnBoard) {
        isAllowedToPutCardOnBoard = false;
        return { ...heroe, position: 'board' };
      } else {
        return heroe;
      }
    });
    this.setState({ heroesChosen: newDeck, onHandleIsAllowedToPutCardFromHandPlayerOneOnHandleBoard: isAllowedToPutCardOnBoard });
  }

  handleHandToBoardIa = () => {
    const newIaDeck = this.state.cardsAvalaibleForIA;
    if (newIaDeck.filter(heroe => heroe.position === 'hand').length !== 0) {
      const randomNumber = Math.floor(Math.random() * newIaDeck.filter(heroe => heroe.position === 'hand').length);
      newIaDeck.filter(heroe => heroe.position === 'hand')[randomNumber].position = 'board';
      this.setState({ cardsAvalaibleForIA: newIaDeck });
    }
  }

  handleHandToBoardPlayer = () => {
    const newPlayerDeck = this.state.heroesChosen;
    if (newPlayerDeck.filter(heroe => heroe.position === 'hand').length !== 0) {
      const randomNumber = Math.floor(Math.random() * newPlayerDeck.filter(heroe => heroe.position === 'hand').length);
      newPlayerDeck.filter(heroe => heroe.position === 'hand')[randomNumber].position = 'board';
      this.setState({ heroesChosen: newPlayerDeck });
    }
  }

  randomizeDeck = (deck, deckName) => {
    const newHeroesChosen = deck.slice();
    const heroesChosenRandomized = [];
    const arrayOfRandomNumbers = [];
    while (arrayOfRandomNumbers.length < newHeroesChosen.length) {
      const randomNumber = Math.floor(Math.random() * newHeroesChosen.length);
      if (arrayOfRandomNumbers.indexOf(randomNumber) === -1) {
        arrayOfRandomNumbers.push(randomNumber);
      }
    }

    for (let i = 0; i < newHeroesChosen.length; i++) {
      heroesChosenRandomized.push(newHeroesChosen[arrayOfRandomNumbers[i]]);
    }

    for (let i = 0; i < heroesChosenRandomized.length; i++) {
      for (let j = 0; j < 3; j++) {
        if (heroesChosenRandomized.indexOf(heroesChosenRandomized[i]) === arrayOfRandomNumbers[j]) {
          heroesChosenRandomized[i].position = 'hand';
        }
      }
    }

    this.setState({ [deckName]: heroesChosenRandomized });
  }

  createIaDeck = () => {
    const heroes = _.shuffle(this.props.heroes);
    let IaDeckPower = 0;
    const cardsAvalaibleForIA = this.state.cardsAvalaibleForIA;
    for (let i = 0; i < this.props.heroes.length; i++) {
      if (IaDeckPower <= this.props.maxPower) {
        if (heroes[i].power > this.props.maxPower - IaDeckPower) {
        } else {
          cardsAvalaibleForIA.push({ ...heroes[i], position: 'deck', iaDeck: true });
          IaDeckPower += heroes[i].power;
        }
      } else {
        break;
      }
    }
    this.setState({ cardsAvalaibleForIA });
    console.log(cardsAvalaibleForIA);
    console.log(IaDeckPower);
  }

  handleDraw = (deck, deckName) => {
    const newHeroesChosen = deck.slice();
    if (newHeroesChosen.filter(heroe => heroe.position === 'deck').length !== 0) { // (Flo) condition si clé position dans l'objet héro est 'deck' et que le la longueur du tableau n'est pas égal à 0
      const randomNumber = Math.floor(Math.random() * newHeroesChosen.filter(heroe => heroe.position === 'deck').length); // (Flo) set const randomNumber : pioche aléatoire dans liste d'héro choisie ssi la clé position est à 'deck
      newHeroesChosen.filter(heroe => heroe.position === 'deck')[randomNumber].position = 'hand'; // (Flo) si condition est true : filter des héros ayant la valeur de la clé position à 'deck' à la position correspondant au randomNumber
      this.setState({ [deckName]: newHeroesChosen });
    }
  }

  attackCardIa = async () => {
    const newDeckIa = this.state.cardsAvalaibleForIA.slice();
    const newHeroesChosen = this.state.heroesChosen.slice();
    for (let i = 0; i < newDeckIa.filter(heroe => heroe.position === 'board').length; i++) { // boucle pour chaque carte sur le board de l'IA
      const cardBoardIa = newDeckIa.filter(heroe => heroe.position === 'board');
      const cardBoardPlayer = newHeroesChosen.filter(heroe => heroe.position === 'board' && !heroe.deadOnBoard);
      const randomNumber = Math.floor(Math.random() * cardBoardPlayer.length);
      if (cardBoardPlayer.length !== 0) {
        cardBoardIa[i].isFighting = true;
        cardBoardPlayer[randomNumber].isFighting = true;
        this.setState({ cardsAvalaibleForIA: newDeckIa, heroesChosen: newHeroesChosen });
        await delay(1000);
        cardBoardIa[i].hp -= cardBoardPlayer[randomNumber].atk; // enlève la vie de la carte de l'IA
        cardBoardPlayer[randomNumber].hp -= cardBoardIa[i].atk; // enlève la vie de la carte du joueur
        if (cardBoardIa[i].hp <= 0) { // si les hp de la carte de l'IA est inferieur ou égal à 0, enleve la carte du board
          cardBoardIa[i].deadOnBoard = true;
        }
        if (cardBoardPlayer[randomNumber].hp <= 0) { // si les hp de la carte de du joueur est inferieur ou égal à 0, enleve la carte du board
          cardBoardPlayer[randomNumber].deadOnBoard = true;
        }
      }
      if (cardBoardPlayer.length !== 0) {
        cardBoardIa[i].isFighting = false;
        cardBoardPlayer[randomNumber].isFighting = false;
      }
      this.setState({ cardsAvalaibleForIA: newDeckIa, heroesChosen: newHeroesChosen });
    }
  }

killCards = () => {
  const newDeckIa = this.state.cardsAvalaibleForIA;
  const newHeroesChosen = this.state.heroesChosen;
  newDeckIa.map(heroe => { // si valeur deadOnBoard = true, changement de la clé position à 'dead' pour les cartes de l'IA.
    if (heroe.deadOnBoard) {
      heroe.position = 'dead';
      heroe.deadOnBoard = false;
    }
  });
  newHeroesChosen.map(heroe => { // si valeur deadOnBoard = true, changement de la clé position à 'dead' pour les cartes du joueur
    if (heroe.deadOnBoard) {
      heroe.position = 'dead';
      heroe.deadOnBoard = false;
    }
  });
  this.setState({ cardsAvalaibleForIA: newDeckIa, heroesChosen: newHeroesChosen });
}

handleIaTurn = () => {
  if (this.state.onHandleIsAllowedToPutCardFromHandPlayerOneOnHandleBoard) {
    this.handleHandToBoardPlayer();
  }
  this.setState({ playerTurn: false }); // set le state de playerTurn à false pour permettre à l'IA de débloquer ses actions.
  const heroesSelected = this.state.heroesChosen.map(heroe => {
    return { ...heroe, selected: false };
  });
  this.setState({ heroesChosen: heroesSelected });
  const attackTime = 1000 * this.state.cardsAvalaibleForIA.filter(heroe => heroe.position === 'board').length; // set const attackTime pour déterminer le temps d'attaque à ajouter entre chaques cartes supplémentaire sur le board de l'IA.
  window.setTimeout(() => this.handleDraw(this.state.cardsAvalaibleForIA, 'cardsAvalaibleForIA'), 1000); // L'IA pioche sa première carte et attend pour effectuer l'action suivante. Appel à la fonction vers la ligne 82.
  window.setTimeout(() => this.handleHandToBoardIa(), 4000); // L'IA place sa carte sur le board et attend. Appel à la fonction vers la ligne 49.
  window.setTimeout(() => this.attackCardIa(), 5000); // Lance la procédure d'attaque des cartes de l'IA vers les cartes du joueur et attend. Appel à la fonction vers la ligne 91.
  window.setTimeout(() => this.killCards(), 6000 + attackTime); // Lance la procédure des cartes qui sont éliminées pour les mettre en position 'dead' et attend.
  window.setTimeout(() => this.setState({ playerTurn: true }), 6000 + attackTime); // set de playerTurn à true et attend.
  window.setTimeout(() => this.handleDraw(this.state.heroesChosen, 'heroesChosen'), 6000 + attackTime); // fait piocher la carte au joueur et attend.
  window.setTimeout(() => this.setState({ onHandleIsAllowedToPutCardFromHandPlayerOneOnHandleBoard: true }), 6000 + attackTime);
}

handleSelectedCard = (nameSelected) => {
  const newHeroesChosen = this.state.heroesChosen.map(
    heroe => {
      if (heroe.isAbleToAttack) {
        if (heroe.name === nameSelected && !heroe.iaDeck) {
          return { ...heroe, selected: true };
        } else {
          return { ...heroe, selected: false };
        }
      } else {
        return { ...heroe, selected: false };
      }
    }
  );
  this.setState({ heroesChosen: newHeroesChosen });
}// on veut qu'une carte en attaque une autre une seule fois. Elle ne peut plus être sélectionnée après avoir attaqué pendant la phase d'attaque.

handleAttackIaCard = (name) => {
  const heroesChosen = this.state.heroesChosen;
  const cardsAvalaibleForIA = this.state.cardsAvalaibleForIA;
  const playerCardSelected = heroesChosen.filter(heroe => heroe.selected === true)[0];
  if (heroesChosen.filter(heroe => heroe.selected === true).length !== 0) {
    cardsAvalaibleForIA.map(heroeIa => {
      if (heroeIa.name === name) {
        // on veut récupérer l'attaque de la carte sélectionnée et la vie de l'attaque adverse. Et en déduire le nombre de point de vie à retirer sur la carte adverse. Et vice versa.
        heroeIa.hp -= playerCardSelected.atk;
        playerCardSelected.hp -= heroeIa.atk;
        playerCardSelected.isAbleToAttack = false;
        playerCardSelected.selected = false;
        if (heroeIa.hp <= 0) { // on veut changer la valeur de la clé position à 'dead' pour les cartes dont les hp sont <= 0.
          heroeIa.position = 'dead';
        }
        if (playerCardSelected.hp <= 0) {
          playerCardSelected.position = 'dead';
        }
      }
    });

    this.setState({ cardsAvalaibleForIA, heroesChosen });
  }
}

render () {
  return (
    <div className='deckBoard'>
      <div className='leftBoardContainer'>
        <a className='button-config' id='button-rageQuit' href='http://localhost:3000/'>Rage Quit</a> {/* https://cards-battle-of-heroes-us11.netlify.app */}
        <aside className='dead-card-container'> {/* Cimetiere */}
          <p>je suis mort</p>
        </aside>
      </div>
      <div className='centerBoardContainer'> {/* Board Total */}
        <div className='iahand'> {/* hand of computer */}
          <HandCards heroesChosen={this.state.cardsAvalaibleForIA} randomizeHeroesChosen={this.randomizeHeroesChosen} />
        </div>
        <div className='boardContainer'>
          <div className='boardia'> {/* board of computer */}
            <Board heroesChosen={this.state.cardsAvalaibleForIA} onSelectedCard={this.handleSelectedCard} onAttackIaCard={this.handleAttackIaCard} />
          </div>
          <div className='boardPlayer1'> {/* board of Player1 */}
            <Board heroesChosen={this.state.heroesChosen} onSelectedCard={this.handleSelectedCard} playerTurn={this.state.playerTurn} />
          </div>
        </div>
        <div className='player1hand'> {/* hand of Player1 */}
          <HandCards heroesChosen={this.state.heroesChosen} onHandToBoard={this.handleHandToBoard} playerTurn={this.state.playerTurn} />
        </div>
      </div>
      <div className='rightBoardContainer'> {/* right board container : decks, timer, "End Turn" button, pseudos */}
        <div className='deckia'>
          <HiddenCards deck={this.state.cardsAvalaibleForIA} />
        </div>
        <div className='timerAndEndTurn'>
          {this.state.playerTurn && <Timer onFinish={this.handleIaTurn} />}
          <button onClick={this.state.playerTurn ? this.handleIaTurn : () => { }}>End Turn</button>
        </div>
        <div className='deckplayer1'>
          <HiddenCards deck={this.state.heroesChosen} />
        </div>
      </div>

    </div>
  );
}
}

export default DeckBoard;
