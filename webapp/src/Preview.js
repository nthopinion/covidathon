import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import socket from './socket';

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {


    };
    this.playRef = React.createRef();

  }
  componentDidMount() {
    var self = this;
    socket.on('stream',function(image){
      console.log(image);
            self.playRef.current.src=image;
    });
  }




  render() {
    return (
      <div className="App">
      Preview
      <img id="play" ref={this.playRef} width="500"/>
      </div>
    );
  }
}

export default Preview;
