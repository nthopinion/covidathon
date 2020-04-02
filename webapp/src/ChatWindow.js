import React, { Component } from 'react';
import { Divider, Label, Message, Card, Input, Button, Icon, Grid, Image } from 'semantic-ui-react'
import './App.css';
import moment from 'moment'
import socket from './socket';

class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {

  }

  render() {
    const processingMessage=(x)=>{
      return x.message.indexOf('data:image')=== 0?
        <Image src={x.message}/>
        :<Message
          color={x.sendBy === this.props.clientId? 'green':'orange' }>

          { (x.message.indexOf('text/csv') > -1 || x.message.indexOf('octet-stream') > -1 || x.message.indexOf('data:application') > -1 )?
          <a href={x.message} target="_blank" download={x.filename}><Icon name='download' /> {x.filename}</a>
          :x.message}
        </Message>
    }
    console.log('chat')
    return (
      <div>
        <div className='chat_history'>
          {this.props.messages.map(x=> {
            console.log(x);
            return <div className={x.sendBy === this.props.clientId? 'message_me':'message_other' }>
            {
              processingMessage(x)
            }
            <span color='grey'>{moment(x.timestamp).fromNow()}</span>
            </div>
          })
          }
        </div>
        <div>
          <Input type='text' placeholder='...' action>
            <input onChange={this.props.onMessageChange} value={this.props.message}/>
            <Button color='facebook' type='submit'  onClick={this.props.onSubmit}>
            <Icon name='rocketchat' />

            Chat
          </Button>

          </Input>
          <div className="ui middle aligned aligned grid container upload_files">
            <div className="ui fluid segment">
            <input type="file" onChange={ (e) => this.props.fileEvent(e.target.files) } className="inputfile" id="embedpollfileinput" />

            <label for="embedpollfileinput" className="ui green right floated button">
              <i className="ui upload icon"></i>
              Upload image
            </label>

            </div>

          </div>
        </div>
      </div>

    );
  }
}

export default ChatWindow;
