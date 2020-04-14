import React from 'react';
import NavBar from './NavBar';
import './Home.css';

function Home () {
    return (
        <div>
            <main className='home-main'>
                <h1>Cards Battle of Heroes</h1>
                <h2>What kind of hero are you ?</h2>
                <NavBar />
            </main>
            <section id="social-media-container">  
                <img src={require('./images/iconfinder_square-facebook.png')} alt="saitama-ok"/>       
                <img src={require('./images/iconfinder_instagram.png')} alt="saitama-ok"/>
                <img src={require('./images/iconfinder_square-twitter.png')} alt="saitama-ok"/>
            </section>
            <img id="saitama-home" src={require('./images/saitama-home.png')} alt="saitama-ok"/>
        </div>
        
    );
}

export default Home;