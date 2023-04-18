import React from 'react';
import './App.css';
import Chatbox from './components/Chatbox';
import {Link} from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      items: [],
    };
  }

  onChange = (event) => {
    this.setState({term: event.target.value});
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({
      term: '',
      items: [...this.state.items, this.state.term],
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Chat App</h1>

        {this.props.user && (
          <div className="allow-chat">
            <Chatbox items={this.state.items} />
            <form className="message-from" onSubmit={this.onSubmit}>
              <input value={this.state.term} onChange={this.onChange} />
              <button>Send</button>
            </form>
          </div>
        )}
        {!this.props.user && (
          <div className="disallow-chat">
            <p>
              <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to start chatting!
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default App;
