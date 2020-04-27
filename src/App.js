import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './components/Home';
import Options from './components/Options';
import Rules from './components/Rules';
import DeckChoice from './components/DeckChoice';
import heroes from './components/heroes';
import axios from 'axios';
import DeckBoard from './components/DeckBoard';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
       cards: heroes.map(heroe => {
        return {
          name: heroe.name,
          img: heroe.image.url,
          atk: parseInt(heroe.powerstats.combat, 10),
          hp: parseInt(heroe.powerstats.durability, 10),
          power: parseInt(heroe.powerstats.power, 10),
          position: 'deck'
        };
      }), 
      deck: []
    };
  }

/*   componentDidMount () {
    this.getHeroesFromAPI();
  } */

/*   getHeroesFromAPI = () => {
    const arrUpdate = [];
    const idHeroe = [354,310,307,165,341,383,30,352,107,634,201,370,106,729,649,69,487,717,213,176,485,38,396,389,157,195,502];
    for (let i = 0; i < idHeroe.length; i++) {
      const url = `https://www.superheroapi.com/api.php/10222211119006297/${idHeroe[i]}`;
      axios.get(url)
        .then(res => res.data)
        .then(data => {
          arrUpdate.push({
            name : data.name,
            img: data.image.url,
            atk: parseInt(data.powerstats.strength, 10),
            hp: parseInt(data.powerstats.durability, 10),
            power: (parseInt(data.powerstats.strength, 10) + parseInt(data.powerstats.durability, 10)) / 2,
            position: 'deck'
          })
          this.setState({ cards: arrUpdate });
        });
    }
  } */
 
  addToDeck = (cardName) => {
    let copieDeck = this.state.deck;
    const maxPower = 300;
    const totalPower = this.state.deck.map(card => card.power).reduce((acc, cur) => acc + cur, 0);
    if (copieDeck.filter(heroe => cardName.includes(heroe.name)).length === 0) {
      if (totalPower + this.state.cards.filter(heroe => cardName.includes(heroe.name))[0].power <= maxPower) {
        copieDeck.push(this.state.cards.filter(heroe => cardName.includes(heroe.name))[0]);
      } else {
        window.alert('Please, select a less powerful card or start the game');
      }
    } else {
      copieDeck = copieDeck.filter(heroe => !cardName.includes(heroe.name));
    }
    this.setState({ deck: copieDeck });
  }

  removeDeck = () => {
    console.log('hello')
    this.setState({ deck: [] });
  }

  render () {
    return (
      <div className='App'>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/options' component={Options} />
            <Route path='/rules' component={Rules} />
            <Route path='/deckchoice'>
              <DeckChoice heroes={this.state.cards} heroesChosen={this.state.deck} addToDeck={this.addToDeck} />
            </Route>
            <Route path='/deckboard'>
              <DeckBoard heroes={this.state.cards} heroesChosen={this.state.deck} removeDeck={this.removeDeck}/>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
