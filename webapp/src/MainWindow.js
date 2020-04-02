import React, { Component } from 'react';
import { Input, Button, Icon } from 'semantic-ui-react'


class MainWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendID: 'physician-'
    };

  }
  callWithVideo(video) {
    const config = { audio: true };
    config.video = video;
    return () => this.props.startCall(true, this.state.friendID, config);
  }
  render() {
    const { clientId } = this.props;
    document.title = `${clientId} - VideoCall`;
    return (
      <div className="container main-window">
        <div>

        </div>
        <div className='callAction_btn'>
          <Input placeholder='Who are you looking for'
          value={ this.state.friendID}
          onChange={event => this.setState({friendID: event.target.value})}
          />

          <div>
            <Button
              basic color='green'
              className="btn-action fa fa-video-camera"
              onClick={this.callWithVideo(true)}
            >
              Call
              <span className="btn_span"></span>
              <Icon name='microphone' />
              <Icon name='camera' />
            </Button>

          </div>
        </div>
      </div>
    );
  }
}

export default MainWindow;

//
// <Button
//   className="btn-action fa fa-phone"
//   onClick={this.callWithVideo(false)}
// >
//   Call
//   <span className="btn_span"></span>
//   <Icon name='camera' />
// </Button>
