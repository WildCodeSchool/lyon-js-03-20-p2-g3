import React from 'react';
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

function App () {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/options' component={Options} />
          <Route path='/rules' component={Rules} />
          <Route path='/deckchoice' component={DeckChoice} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
