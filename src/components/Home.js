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
            <footer>
                <img id="saitama-home" src={require('./images/saitama-home.png')} alt="saitama-ok"/>
                <section id="social-media-container">
                    <a href="https://www.facebook.com/javascriptJS/" target="_blank" rel="noopener noreferrer">
                        <img src={require('./images/iconfinder_square-facebook.png')} alt="saitama-ok"/> 
                    </a>
                    
                    <a href="https://github.com/WildCodeSchool/lyon-js-03-20-p2-g3" target="_blank" rel="noopener noreferrer">
                        <img src={require('./images/iconfinder_github.png')} alt="saitama-ok"/>
                    </a>   
                    <a href="https://twitter.com/javascript?lang=fr" target="_blank" rel="noopener noreferrer">
                        <img src={require('./images/iconfinder_square-twitter.png')} alt="saitama-ok"/>
                    </a>   
                </section>
            </footer>
            
        </div>
    );
}

export default Home;