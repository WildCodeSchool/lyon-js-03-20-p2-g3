import React, { Component } from 'react';
import Button from './Button';
import './Options.css';
import HomeMusic from './audio/effects/text_commit.ogg';

class Options extends Component {
  constructor(props) {
    super(props)
    this.state = {
      audioOn: false
    };
  }

  audioRef = React.createRef();

  handlePlay = () => {
    const audio = this.audioRef.current;
    audio.volume = 0.4;
    audio.paused ? this.setState({ audioOn: false }) : this.setState({ audioOn: true });
    return audio.paused ? audio.play() : audio.pause();
  }

  render() {
    return (
      <>
        <Button link='/' linkName='&lt; Home' />
        <div className='music'>
          <audio ref={this.audioRef} preload='metadata'>
            <source src={HomeMusic} type='audio/mp3' />
            <p>Votre navigateur ne peut pas lire d'audio</p>
          </audio>
          <button className='show-music-button' onClick={this.handlePlay}>
            <span className='music-icon'>{this.state.audioOn ? <i className='fa fa-volume-mute' /> : <i className='fa fa-volume-up' />}</span>
          </button>
        </div>
      </>
    );
  }
}

export default Options;
