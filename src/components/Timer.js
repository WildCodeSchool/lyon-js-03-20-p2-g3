import React, { Component } from 'react';

class Timer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      minutes: 0,
      seconds: 15
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
        <h1>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
      </div>
    );
  }
}

export default Timer;
