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
      cards:[],
      deck: []
    };
  }

   componentDidMount () {
    this.getHeroesFromAPI();
  } 

   getHeroesFromAPI = () => {
      const url = `https://heroes-api-wrapper.herokuapp.com/heroes?heroIds=354,310,555,711,527,313,638,307,566,381,514,214,561,165,692,341,298,251,107,383,127,30,352,201,196,522,634,627,530,418,551,708,630,599,538,370,398,228,149,480,106,729,309,207,542,333,208,536,431,225,649,60,226,69,678,487,457,145,345,299,361,350,405,602236,620,216717,213,176,581,687,386,414,322,600,303,280,690,467,416,485,423,572,38,697,732,396,275,389,498,476,703,680,185,157,658,325,574,289,308,289,195,686,645,631,502,232,332,287,659,655,517,35`;
      axios.get(url)
        .then(res => res.data)
        .then(data => {
          console.log(data)
           const tabHeroes = data.map( heroe => {
             return {
              name : heroe.name,
              img: heroe.image.url,
              atk: parseInt(heroe.powerstats.strength, 10),
              hp: parseInt(heroe.powerstats.durability, 10),
              power: (parseInt(heroe.powerstats.strength, 10) + parseInt(heroe.powerstats.durability, 10)) / 2,
              position: 'deck' }
           })
          this.setState({ cards: tabHeroes });
        });
    }
  

  addToDeck = (cardName) => {
    let copieDeck = this.state.deck;
    const maxPower = 800;
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
    console.log('hello');
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
              <DeckChoice heroes={this.state.cards} heroesChosen={this.state.deck} addToDeck={this.addToDeck} removeDeck={this.removeDeck} />
            </Route>
            <Route path='/deckboard'>
              <DeckBoard heroes={this.state.cards} heroesChosen={this.state.deck} removeDeck={this.removeDeck} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
