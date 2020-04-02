import React, { Component } from 'react';
import './App.css';
import socket from './socket';
import _ from 'lodash';
import moment from 'moment'
import logo from './logo.svg';
import PeerConnection from './PeerConnection';
import MainWindow from './MainWindow';
import CallWindow from './CallWindow';
import CallModal from './CallModal';
import Timer from './Timer';
import ChatWindow from './ChatWindow';

import { Divider, Label, Message, Card, Input, Button, Icon, Grid, Image } from 'semantic-ui-react'
var QRCode = require('qrcode.react');

// patient & physician
var keys = {patient: '0xBEDa8BE440d4afae4c4E28469fABd24a20e1b747', physician: '0x66E437D3FB414Ca912678c7Ef49C7EDB6347cfdD'}
const apiUrl = `https://healthmarketplaceapi20181117074811.azurewebsites.net/`;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: [],
      clientId: '',
      callWindow: '',
      callModal: '',
      callFrom: '',
      localSrc: null,
      peerSrc: null,
      chargeDollar: 0,
      qrCodePayment: '',
      startTime: new Date(),
    };
    this.onMessageChange= this.onMessageChange.bind(this);
    this.addMessage= this.addMessage.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
    this.pc = {};
    this.config = null;
    this.startCallHandler = this.startCall.bind(this);
    this.endCallHandler = this.endCall.bind(this);
    this.rejectCallHandler = this.rejectCall.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.onSubmitPay = this.onSubmitPay.bind(this);
    this.postData = this.postData.bind(this);
    this.fileEvent=this.fileEvent.bind(this);
    var self = this;
    socket.on('RECEIVE_MESSAGE', function(data){
      console.log('RECEIVE_MESSAGE', data)
      self.addMessage(data);
      if(!self.state.showTimer){
        self.startTimer();
      }
    })
      .on('init', data => this.setState({ clientId: data.id }))
      .on('request', data => this.setState({ callModal: 'active', callFrom: data.from }))
      .on('call', (data) => {
        if (data.sdp) {
          this.pc.setRemoteDescription(data.sdp);
          if (data.sdp.type === 'offer') this.pc.createAnswer();
        } else this.pc.addIceCandidate(data.candidate);

        if(!self.state.showTimer){
          self.startTimer();
        }
      })
      .on('end', this.endCall.bind(this, false))
      .emit('init');
  }
  componentDidMount() {
    // subscribeToTimer((err, timestamp) => this.setState({
    //    timestamp
    //  }));
  }


    startCall(isCaller, friendID, config) {
      this.config = config;
      this.pc = new PeerConnection(friendID)
        .on('localStream', (src) => {
          const newState = { callWindow: 'active', localSrc: src };
          if (!isCaller) newState.callModal = '';
          this.setState(newState);
        })
        .on('peerStream', src => this.setState({ peerSrc: src }))
        .start(isCaller, config);
    }

    rejectCall() {
      socket.emit('end', { to: this.state.callFrom });
      this.setState({ callModal: '' });
    }

    endCall(isStarter) {
      if (_.isFunction(this.pc.stop)) this.pc.stop(isStarter);
      this.pc = {};
      this.config = null;
      this.setState({
        callWindow: '',
        localSrc: null,
        peerSrc: null
      });
    }

  addMessage = data => {
    console.log(data);
    this.setState({messages: [...this.state.messages, data]});
    console.log(this.state.messages);
  }

  onMessageChange(e){
    this.setState({message: e.target.value});

  }
  onSubmit(){

    socket.emit('SEND_MESSAGE', {
      message:  this.state.message,
      sendBy: this.state.clientId,
      timestamp: new Date(),
    })

    this.setState({message: ''})
  }


  onSubmitPay(){
    const role = this.state.clientId.split('-')[0];
    if(role === 'patient'){
      var self = this;
      const publicKeyPatient = keys[role];
      const publicKeyPhysician = keys['physician'];
      console.log("publicKeyPhysician", this.state)

      this.postData(apiUrl + 'api/TransactionHeaders', {
        "patientKey": publicKeyPatient,
        "physicianKey": publicKeyPhysician,
        "timeElapsed": Math.round((new Date().getTime() - self.state.startTime.getTime()) / 1000),
        "transactionDate": new Date()
      })
        .then(data =>{ console.log(JSON.stringify(data)); return data;})
        .then(data=> {
          console.log('get data', typeof(data));
          self.setState({showTimer: false, qrCodePayment: data['qrCode'], chargeDollar: data['charges']})
          console.log('data.qrCode', data['qrCode']);
        })
        .catch(error => {
          console.log(error)
          self.setState({showTimer: false, showErrorMsg: true, errorMsg: 'We cannot process your payment. Please contact us'})

        });

    }
  }


  postData(url = ``, data = {}) {
    // Default options are marked with *
      return fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, cors, *same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
              "Content-Type": "application/json; charset=utf-8",
              // "Content-Type": "application/x-www-form-urlencoded",
          },
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(response => response.json()); // parses response to JSON
  }

  startTimer(){
    console.log("showTimer")

    this.setState({showTimer: true, startTime: new Date()})
  }

  fileEvent(files){
    var self = this;
    console.log(files)
    var data = files[0];
     var reader = new FileReader();
      reader.onload = function(evt){
       // socket.emit('user image', evt.target.result);
       socket.emit('SEND_MESSAGE', {
         message:  evt.target.result,
         sendBy: self.state.clientId,
         filename: data.name,
         timestamp: new Date(),
       })
     };
     reader.readAsDataURL(data);
  }
  render() {
    const isPatient = this.state.clientId.split('-')[0] === 'patient';
    console.log(isPatient, this.state.clientId)
    return (
      <div className="App">
        <div  className="App">

        <Grid celled='internally'  className="App">
          <Grid.Row>
            <Grid.Column tablet={3} computer={3} mobile={16} >
            <Card className='card_c_'>
               <Card.Content header='About you' />
               <Card.Content>
                You're a
                <Label as='a' className='txt_label'>{this.state.clientId}</Label>

               </Card.Content>
               <Card.Content extra>
                 <Icon name='user' />
                 Visit {Math.round(Math.random() * 100)} times
               </Card.Content>
             </Card>
             <Card className='card_c_'>
                <Card.Content header={'Current Session'} />
                {this.state.showTimer&& <Timer/>}


                {isPatient &&<Card.Content>
                    {this.state.chargeDollar > 0 && <p> HMO {this.state.chargeDollar}</p>}
                    {this.state.qrCodePayment && <QRCode value={this.state.qrCodePayment} />}

                    {!this.state.qrCodePayment &&<Button icon labelPosition='left'  color='green' onClick={this.onSubmitPay}>
                      Pay Now
                      <Icon name='money' />
                    </Button>}

                </Card.Content>
                }




              </Card>

            </Grid.Column>
            <Grid.Column tablet={8} computer={8} mobile={16}>
            {isPatient && <MainWindow
              clientId={this.state.clientId}
              startCall={this.startCallHandler}
            />}
            {!this.state.callFrom && !isPatient &&
              <Message
                 success
                 header="You don't have a patient right now. Please wait."
                 content='We will show the prompt as soon as we found the match'
               />

            }
            {this.state.showErrorMsg &&  <Message
                error
                header={this.state.errorMsg}
              />}
            {this.state.callWindow === 'active' && <CallWindow
              status={this.state.callWindow}
              localSrc={this.state.localSrc}
              peerSrc={this.state.peerSrc}
              config={this.config}
              mediaDevice={this.pc.mediaDevice}
              endCall={this.endCallHandler}
            />}
            {this.state.callFrom && this.state.callModal === 'active' &&
              <CallModal
                status={this.state.callModal}
                startCall={this.startCallHandler}
                rejectCall={this.rejectCallHandler}
                callFrom={this.state.callFrom}
              />
            }


            </Grid.Column>
            <Grid.Column tablet={5} computer={5}  mobile={16}>
            <ChatWindow
              clientId={this.state.clientId}
              message={this.state.message}
              messages={this.state.messages}
              onMessageChange={this.onMessageChange}
              onSubmit={this.onSubmit}
              fileEvent={this.fileEvent}
            />
            </Grid.Column>
          </Grid.Row>

        </Grid>


        </div>
      </div>
    );
  }
}

export default App;
