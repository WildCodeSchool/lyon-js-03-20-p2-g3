import React from 'react';
import Button from './Button';
import './Options.css';

const Options = ({ onPlayMusic, effectsOn, musicOn, audioOn, triggerEffects }) => {
  return (
    <div className='options-container'>
      <nav className='options-navbar'>
        <Button link='/' linkName='&lt; Home' />
        <h2>Options</h2>
      </nav>
      <main>
        <div className='option-type-container'>
          <h3 className='option-title'>Global volume</h3>
          <input type='range' min='1' max='100' value='50' class='option-slider' id='myRange' />
          <button className='button-config' onClick={() => onPlayMusic()}>
            <span className='music-icon'>{musicOn ? <i className='fa fa-volume-mute' /> : <i className='fa fa-volume-up' />}</span>
          </button>
        </div>
        <div className='option-type-container'>
          <h3 className='option-title'>Music volume</h3>
          <input type='range' min='1' max='100' value='50' class='option-slider' id='myRange' />
          <button className='button-config'>
            {musicOn ? 'ON' : 'OFF'}
          </button>
        </div>
        <div className='option-type-container'>
          <h3 className='option-title'>Effect volume</h3>
          <input type='range' min='1' max='100' value='50' class='option-slider' id='myRange' />
          <button className='button-config' onClick={() => triggerEffects()}>
            {effectsOn ? 'ON' : 'OFF'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Options;
