import React, { Component } from 'react';
import './NavBarDekChoice.css';
import Button from './Button';
import CardDeckRecap from './CardDeckRecap';

class NavBarDeckChoice extends Component {
  constructor (props) {
    super(props);
    this.state = {
      show: false
    };
  }

    handleShowModal = () => {
      if (this.props.heroesChosen.length === 0) {
        window.alert('Warning ! Your deck is empty. You must choose at least one card');
      } else {
        this.setState({ show: true });
      }
    }

    handleHideModal = () => {
      this.setState({ show: false });
    }

    render () {
      return (
        <div className='super-container-nav'>
          <nav>
            <ul className='container-nav'>
              <li>
                <Button id='button-home' link='/' linkName='&lt; Home' />
              </li>
              <li id='title'>Choose your Heroes</li>
              <li>
                <button type='button' className={this.props.heroesChosen.length === 0 ? 'button-config button-config-disable' : 'button-config button-config-enable'} onClick={this.handleShowModal}>Start</button>
                <Modal show={this.state.show} heroesChosen={this.props.heroesChosen} onClose={this.handleHideModal}>
                  {this.props.heroesChosen
                    .map(heroe => {
                      return (
                        <CardDeckRecap key={heroe.name} heroe={heroe} />
                      );
                    }
                    )}
                </Modal>
              </li>
            </ul>
          </nav>
        </div>
      );
    }
}

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        <h2>Are you sure of the composition of your deck ?</h2>
        <div className='modal-heroesChosen-container'>
          {children}
        </div>
        <div className='button-modal-container'>
          <button type='button' className='button-config' onClick={handleClose}>Close</button>
          <Button id='button-battle' link='/deckboard' linkName='Start' />
        </div>
      </section>
    </div>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);

export default NavBarDeckChoice;
