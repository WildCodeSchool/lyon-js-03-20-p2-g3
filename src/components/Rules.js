import React from 'react';
import {Link} from 'react-router-dom';
import RulesCard from './RulesCard'
import './Rules.css';

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
                        img=''
                        alt='image showing the maximum total power.' 
                        nameOfRule='Choice of deck - 1' 
                        textRule='Your deck must not exceed the maximum total power authorized.' 
                    />
                    <RulesCard
                        img=''
                        alt='image showing the maximum total power.'
                        nameOfRule='Choice of deck - 2'
                        textRule='No restrictions in terms of cards’ number.'
                    />
                    <RulesCard
                        img=''
                        alt="image showing the cards' slot on the board."
                        nameOfRule='Board - 1'
                        textRule='The board can’t display more than 5 cards / player (all face-up)'
                    />
                    <RulesCard
                        img=''
                        alt='image showing the 3 first cards of the player.'
                        nameOfRule='Board, Your turn - 1'
                        textRule='You start the game with 3 cards from your deck.'
                    />
                    <RulesCard
                        img=''
                        alt='image showing the mouse clicking on the deck to draw a card from a deck.'
                        nameOfRule='Board, Your turn - 2'
                        textRule='To begin, you draw a card from your deck.'
                    />
                    <RulesCard
                        img=''
                        alt='image showing the player adding a card from his hand on a slot of the board.'
                        nameOfRule='Board, Your turn - 3'
                        textRule='You must place a card from you hand on the board unless it’s full.'
                    />
                    <RulesCard
                        img=''
                        alt='image showing the mouse clicking on the "End Turn" button'
                        nameOfRule='Board, Your turn - 4'
                        textRule='If you’ve finished your turn before the time is up (1 min), you can press the “End Turn” button.'
                    />
                    <RulesCard
                        img=''
                        alt='image showing the timer at zero'
                        nameOfRule='Board, Your turn - 5'
                        textRule='If you’ve not finished your turn before the time ran out, you just had to be faster. Just assume it !'
                    />
                    <RulesCard
                        img=''
                        alt="image showing Deus Sex Machina's deck"
                        nameOfRule="Board, Deus Sex Machina's turn - 1"
                        textRule='His Serenissima knows the game. He knows he has to draw a card from his deck at the start of the turn. He doesn’t complain, he owns it '
                    />
                    <RulesCard
                        img=''
                        alt="image showing Deus Sex Machina's board"
                        nameOfRule="Board, Deus Sex Machina's turn - 2"
                        textRule='He also knows he must place a card on the board if some slots are available.'
                    />
                    <RulesCard
                        img=''
                        alt="image showing Deus Sex Machina attacking the player"
                        nameOfRule="Board, Deus Sex Machina's turn - 3"
                        textRule="He won’t hesitate to attack because he likes it."
                    />
                    <RulesCard
                        img=''
                        alt="image doesn't showing Deus Sex Machina clicking on the 'Rage Quit' button"
                        nameOfRule="Board, Deus Sex Machina's turn - 4"
                        textRule=''
                    />
                    <RulesCard
                        img=''
                        alt='image showing how the fight phase works'
                        nameOfRule='Board, Fight phase'
                        textRule="The card attacks the opposing card once per turn each. The card’s attack statistics cause the Deus Sex Machina’s card to lose health points. The opposing card also attacks after your turn, losing the number of health points corresponding to its attack base."
                    />
                    <RulesCard
                        img=''
                        alt="image showing the Deus Sex Machina's board empty"
                        nameOfRule='How to win'
                        textRule='You win when Deus Sex Machina runs out of cards in his deck, his hand and on the board.'
                    />
                    <RulesCard
                        img=''
                        alt='image showing crying smileys when the player press the "Rage Quit" button'
                        nameOfRule='Be compassionate'
                        textRule="If you don’t assume your defeat, you can press the 'Rage Quit' button. His Serenessima assumes its defeats, so have some consideration for this sensitive machine."
                    />
                </div>
            </li>
        </div>
    )
}

export default Rules;