import React from 'react';
import {Link} from 'react-router-dom';
import RulesCard from './RulesCard'
import './Rules.css';
import Board1 from './images/Board1.png';
import BoardYourturn1 from './images/BoardYourturn1.png';
import BoardYourTurn2 from './images/BoardYourTurn2.png';
import BoardYourTurn3 from './images/BoardYourTurn3.png';
import BoardYourTurn4 from './images/BoardYourTurn4.png';
import BoardYourTurn5 from './images/BoardYourTurn5.png';
import Deckchoice1 from './images/Deckchoice1.png';
import DeckchoiceDesktop from './images/DeckchoiceDesktop.png';
import BoardDSMTurn1 from './images/BoardDSMTurn1.png';
import BoardDSMTurn2 from './images/BoardDSMTurn2.png';
import BoardDSMTurn3 from './images/BoardDSMTurn3.png';
import BoardAttack from './images/BoardAttack.png';
import BoardGraveyard from './images/BoardGraveyard.png';
import Howtowin from './images/Howtowin.png';

function Rules () {
    return (
        <div>
            <li>
                <nav>
                    <Link to="/">Home</Link>
                    <h2>Rules</h2>
                </nav>
                <div className="RulesCard">
                    <RulesCard 
                        image={Deckchoice1}
                        alt='image showing the maximum total power.' 
                        nameOfRule='Choice of deck - 1' 
                        textRule='Your deck must not exceed the maximum total power authorized.' 
                    />
                    <RulesCard
                        image={DeckchoiceDesktop}
                        alt='image showing the maximum total power.'
                        nameOfRule='Choice of deck - 2'
                        textRule='No restrictions in terms of cards’ number.'
                    />
                    <RulesCard
                        image={Board1}
                        alt='image showing the player board.'
                        nameOfRule='Board - 1'
                        textRule='The board can display all cards per player (all face-up)'
                    />
                    <RulesCard
                        image={BoardYourturn1}
                        alt='image showing the 3 first cards of the player.'
                        nameOfRule='Board, Your turn - 1'
                        textRule='You start the game with 3 cards from your deck and 1 drawn.'
                    />
                    <RulesCard
                        image={BoardYourTurn2}
                        alt='image showing a new card on the hand from the deck'
                        nameOfRule='Board, Your turn - 2'
                        textRule='To begin your turn, the game draw you a card from your deck.'
                    />
                    <RulesCard
                        image={BoardYourTurn3}
                        alt='image showing the player adding a card from his hand on the board.'
                        nameOfRule='Board, Your turn - 3'
                        textRule='You must place a card from your hand on the board.'
                    />
                    <RulesCard
                        image=''
                        alt='image showing the player switch a card from his hand.'
                        nameOfRule='Board, Your turn - 3'
                        textRule='You can switch the last card you’ve put on the board during your turn'
                    />
                    <RulesCard
                        image={BoardYourTurn4}
                        alt='image showing the mouse clicking on the "End Turn" button'
                        nameOfRule='Board, Your turn - 4'
                        textRule='If you’ve finished your turn before the time is up (30s), you can press the “End Turn” button.'
                    />
                    <RulesCard
                        image={BoardYourTurn5}
                        alt='image showing the timer at zero'
                        nameOfRule='Board, Your turn - 5'
                        textRule='If you’ve not finished your turn before the time ran out, the game drag a card from your hand on the board randomly. You just had to be faster. Just assume it !'
                    />
                    <RulesCard
                        image={BoardDSMTurn1}
                        alt='image showing Deus Sex Machina’s deck'
                        nameOfRule='Board, Deus Sex Machina’s turn - 1'
                        textRule='His Serenissima knows the game. He knows that he has to draw a card from his deck at the start of his turn. He doesn’t complain, he owns it '
                    />
                    <RulesCard
                        image={BoardDSMTurn2}
                        alt='image showing Deus Sex Machina’s board'
                        nameOfRule='Board, Deus Sex Machina’s turn - 2'
                        textRule='He also knows he must place a card on the board.'
                    />
                    <RulesCard
                        image={BoardDSMTurn3}
                        alt='image doesn’t showing Deus Sex Machina clicking on the “Rage Quit” button'
                        nameOfRule="Board, Deus Sex Machina's turn - 4"
                        textRule='He’ll never click on the “Rage Quit” button, he assumes. (It’s the only game he’s allowed to play, so have some compassion for his Serenissima).'
                    />
                    <RulesCard
                        image={BoardAttack}
                        alt='image showing how the fight phase works'
                        nameOfRule='Board, Fight phase'
                        textRule="The card attacks the opposing card once per turn each. The card’s attack statistics cause the Deus Sex Machina’s card to lose health points. The opposing card also attacks after your turn, losing the number of health points corresponding to its attack base. The Red number corresponding to the Attack points and the green one, the Health point."
                    />
                    <RulesCard
                        image={BoardGraveyard}
                        alt="image showing the Graveyard"
                        nameOfRule='Graveyard'
                        textRule='When you lose some heroes, they go to the Graveyard on the left. You can cry...'
                    />
                    <RulesCard
                        image={Howtowin}
                        alt="image showing the Deus Sex Machina's board empty"
                        nameOfRule='How to win'
                        textRule='You win when Deus Sex Machina runs out of cards in his deck, his hand and on the board.'
                    />
                    <RulesCard
                        image=''
                        alt='image showing crying smileys when the player press the “Rage Quit” button'
                        nameOfRule='Be compassionate'
                        textRule='If you don’t assume your defeat, you can press the “Rage Quit” button. His Serenessima assumes its defeats, so have some consideration for this sensitive machine.'
                    />
                </div>
            </li>
        </div>
    )
}

export default Rules;
