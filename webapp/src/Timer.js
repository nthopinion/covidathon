import React, { Component } from 'react';
import { Divider, Label, Message, Card, Input, Button, Icon, Grid, Image } from 'semantic-ui-react'
import './App.css';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds:0,
      mins:0,
      hours: 0,
      secondsUI: '00',
      minsUI:'00:',
      hoursUI: '00:',
    };
    this.startTimer=this.startTimer.bind(this)
  }
  componentDidMount() {
    this.startTimer();

  }

  startTimer(){
    var self = this;
    this.timex = setTimeout(function(){
      var seconds =  self.state.seconds;
      var mins =  self.state.mins;
      var hours =  self.state.hours;
      seconds++
      if(seconds > 59){
          seconds=0;
          mins++;
         if(mins>59) {
           mins=0;
           hours++;
           if(hours <10) {
             self.setState({hoursUI: hours+':'})
         }
       }

      if(mins<10){
        self.setState({minsUI:'0' + mins+':'})

      }else {
         self.setState({minsUI: mins+':'})

       };
     }
      if(seconds <10) {
        self.setState({secondsUI: '0' + seconds})
      }else {
        self.setState({secondsUI: seconds })
      }
      self.setState({seconds, mins, hours })
      console.log("hours", hours, "mins", mins, "seconds", seconds)
      self.startTimer();
    },1000);
  }


  render() {
    console.log('time')
    return (
      <Card.Content>
        <Icon name='clock outline' />
        <div id="timer">
          <span id="hours">{this.state.hoursUI}</span>
          <span id="mins">{this.state.minsUI}</span>
          <span id="seconds">{this.state.secondsUI}</span>
        </div>
      </Card.Content>
    );
  }
}

export default Timer;
