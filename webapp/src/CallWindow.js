import React, { Component } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { Button } from 'semantic-ui-react'

class CallWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Video: true,
      Audio: true
    };

    this.btns = [
      { type: 'Video', icon: 'fa-video-camera' },
      { type: 'Audio', icon: 'fa-microphone' }
    ];
  }

  componentDidMount() {
    this.setMediaStream();
  }

  componentWillReceiveProps(nextProps) {
    // Initialize when the call started
    if (!this.props.config && nextProps.config) {
      const { config, mediaDevice } = nextProps;
      _.forEach(config, (conf, type) =>
        mediaDevice.toggle(_.capitalize(type), conf));

      this.setState({
        Video: config.video,
        Audio: config.audio
      });
    }
  }

  componentDidUpdate() {
    this.setMediaStream();
  }

  setMediaStream() {
    const { peerSrc, localSrc } = this.props;
    if (this.peerVideo && peerSrc) this.peerVideo.srcObject = peerSrc;
    if (this.localVideo && localSrc) this.localVideo.srcObject = localSrc;
  }

  /**
   * Turn on/off a media device
   * @param {String} deviceType - Type of the device eg: Video, Audio
   */
  toggleMediaDevice(deviceType) {
    this.setState({
      [deviceType]: !this.state[deviceType]
    });
    this.props.mediaDevice.toggle(deviceType);
  }

  renderControlButtons() {
    const getClass = (icon, type) => classnames(`btn-action fa ${icon}`, {
      disable: !this.state[type]
    });

    return this.btns.map(btn => (
      <Button
        key={`btn${btn.type}`}
        className={getClass(btn.icon, btn.type)}
        onClick={() => this.toggleMediaDevice(btn.type)}
      >
      {btn.type}
      </Button>
    ));
  }
  render() {
    const { status } = this.props;
    return (
      <div className={classnames('call-window', status)}>
        <video id="peerVideo" ref={el => this.peerVideo = el} autoPlay  className='video_Main'/>
        <video id="localVideo" ref={el => this.localVideo = el} autoPlay muted  className='video_Main'/>
        <div className="video-control">
          {this.renderControlButtons()}
          <Button
            className="btn-action hangup fa fa-phone"
            onClick={() => this.props.endCall(true)}
          >
            End Call
          </Button>
        </div>
      </div>
    );
  }
}

export default CallWindow;
