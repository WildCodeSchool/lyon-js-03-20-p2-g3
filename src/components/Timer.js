import React, { Component } from 'react';

class Timer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      minutes: 0,
      seconds: 3
    };
  }

  componentDidMount () {
    console.log('Monté')
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval);
        } 
      }
    }, 1000);
  }

  componentWillUnmount () {
    console.log('démonté')
    clearInterval(this.myInterval);
    
  }

  render () {
    console.log('render timer')
    const { minutes, seconds } = this.state;
    return (
      <div>
        {minutes === 0 && seconds === 0
          ? this.props.onIaTurn()
          : <h1>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>}
      </div>
    );
  }
}

export default Timer;
