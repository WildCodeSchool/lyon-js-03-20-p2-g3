import React from 'react';
import Button from './Button';
import './Options.css';

const Options = ({ onPlayMusic, effectsOn, musicOn, audioOn, triggerEffects }) => {
  return (
    <>
      <Button link='/' linkName='&lt; Home' />
      <button className='show-music-button' onClick={() => onPlayMusic()}>
        <span className='music-icon'>{musicOn ? <i className='fa fa-volume-mute' /> : <i className='fa fa-volume-up' />}</span>
      </button>
      <button className='button-config' onClick={() => triggerEffects()}>
        {effectsOn ? 'ON' : 'OFF'}
      </button>
    </>
  );
};

export default Options;
