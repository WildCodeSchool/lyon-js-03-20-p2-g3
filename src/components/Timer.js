import React, { Component } from 'react';

class Timer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      minutes: 0,
      seconds: 30
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
          this.props.onFinish();
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
        <p>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
      </div>
    );
  }
}

export default Timer;
