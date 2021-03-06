import React from 'react';
import Button from './Button';
import './Options.css';

const Options = ({ onPlayMusic, effectsOn, musicOn, triggerEffects, onMusicVolume, musicVolume, onEffectsVolume, effectsVolume, pseudo, onChangePseudo }) => {
  return (
    <div className='options-container'>
      <nav className='options-navbar'>
        <Button link='/' linkName='&lt; Home' />
        <h2>Options</h2>
      </nav>
      <main>
        <div className='option-type-container'>
          <h3 className='option-title'>Pseudo</h3>
          <div className='pseudo-container'>
            <input className='pseudo' type='text' onChange={(event) => onChangePseudo(event)} value={pseudo} />
          </div>
          <button className='button-config option-button'>Save</button>
        </div>
        <div className='option-type-container'>
          <h3 className='option-title'>Music volume</h3>
          <input type='range' min='1' max='100' onChange={(event) => onMusicVolume(event)} value={musicVolume} className='option-slider' id='myRange' />
          <button className='button-config option-button' onClick={() => onPlayMusic()}>
            <span className='music-icon'>{!musicOn ? <i className='fa fa-volume-mute' /> : <i className='fa fa-volume-up' />}</span>
          </button>
        </div>
        <div className='option-type-container'>
          <h3 className='option-title'>Effects volume</h3>
          <input type='range' min='1' max='100' onChange={(event) => onEffectsVolume(event)} value={effectsVolume} className='option-slider' id='myRange' />
          <button className='button-config option-button' onClick={() => triggerEffects()}>
            <span className='music-icon'>{effectsOn ? <i className='fa fa-volume-up' /> : <i className='fa fa-volume-mute' />}</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Options;
