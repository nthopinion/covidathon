import React, { Component } from 'react';
import classnames from 'classnames';
import { Button, Icon } from 'semantic-ui-react'

class CallModal extends Component {
  acceptWithVideo(video) {
    const config = { audio: true, video };
    return () => this.props.startCall(false, this.props.callFrom, config);
  }

  render() {
    return (
      <div className={classnames('call-modal', this.props.status)}>
        <p>
          <span className="caller">{this.props.callFrom}</span> is calling ...
        </p>
        <Button
          basic color='green'
          className="btn-action fa fa-video-camera"
          onClick={this.acceptWithVideo(true)}
        >
        Accept Call
          <span className="btn_span"></span>
          <Icon name='microphone' />
          <Icon name='camera' />
        </Button>


        <Button
          basic color='violet'
          className="btn-action hangup fa fa-phone"
          onClick={this.props.rejectCall}
          >
          Reject Call
        </Button>

      </div>
    );
  }
}

export default CallModal;
//
// <Button
//   basic color='green'
//   className="btn-action fa fa-phone"
//   onClick={this.acceptWithVideo(false)}
//   >
//   Accept Call
//   <span className="btn_span"></span>
//   <Icon name='microphone' />
// </Button>
