import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './components/Login';
import Register from './components/Register';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import firebase, {auth} from './firebase.js';
import Button from '@mui/material/Button';

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: null}
  }
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if(user){
        this.setState({user});
      }
    })
  }
  logOutUser = () => {
    firebase.auth().signOut()
    .then(window.location = "/");
  }
  render() {
    return (
      <Router>
        <div className="app">
          <nav className="main-nav">
            {!this.state.user &&
              <div>
                <Button><Link to="/login">Login</Link></Button>
                <Button><Link to="/register">Register</Link></Button>
              </div>
            }
            {this.state.user &&
              <a href="#!" onClick={this.logOutUser}>Log out</a>
            }
          </nav>
          <Switch>
            <Route path="/" exact render={() => <App user={this.state.user}/>} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppRouter />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
