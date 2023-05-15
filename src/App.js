import React from 'react';
import './App.css';
import Chatbox from './components/Chatbox';
import {Link} from 'react-router-dom';
import firebase from './firebase';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  onSubmit = (event) => {
    event.preventDefault();
    if(this.state.message !== ''){
      const chatRef = firebase.database().ref('general');
      const chat = {
        message: this.state.message,
        user: this.props.user.displayName,
        timestamp: new Date().getTime()
      }

      chatRef.push(chat);
      this.setState({message: ''});
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Chat App</h1>
        {this.props.user && (
          <div className="allow-chat">
            <Chatbox className="chatbox"/>
            <form className="message-from" onSubmit={this.onSubmit}>
              <input
                className="textInput"
                type="text"
                name="message"
                id="message"
                value={this.state.message}
                placeholder="Enter a message..."
                onChange={this.onChange} />
              <button><SendOutlinedIcon/></button>
            </form>
          </div>
        )}
        {!this.props.user &&
          <div className="disallow-chat">
            <p>
              <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to start chatting!
            </p>
          </div>
        }
      </div>
    );
  }
}

export default App;
