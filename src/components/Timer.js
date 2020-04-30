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
        } else {
          this.setState(({ minutes }) => ({
            minutes: 0,
            seconds: 60
          }));
        }
      }
    }, 1000);
  }

  componentWillUnmount () {
    clearInterval(this.myInterval);
  }

  render () {
    const { minutes, seconds } = this.state;
    return (
      <div>
        {minutes === 0 && seconds === 0
          ? this.props.onIaTurn()
          : <h1>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>}
      </div>
    );
  }
}

export default Timer;
