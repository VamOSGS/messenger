import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import firebase, { database } from '../../firebase';
import './AppStyles.less';
import Home from '../Home';
import Login from '../Login';
import Signup from '../Signup';
import Profile from '../Profile';
import PrivateRoute from '../Signup/PrivateRoute';

class App extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      list: [],
      loading: true,
      authenticated: false,
      user: null,
    };
    this.messageRef = database().ref('/messages');
    this.usersRef = database().ref('/users');
    // this.listenMessages();
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          currentUser: user,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          loading: false,
        });
      }
    });
  }
  updateUser = (currentUser) => {
    this.setState({ currentUser });
  };
  // listenMessages() {
  //   this.messageRef.limitToLast(10).on('value', (messages) => {
  //     if (Object.values(messages.val())) {
  //       this.setState({
  //         list: Object.values(messages.val()),
  //       });
  //     }
  //   });
  // }
  handleSubmit = () => {
    console.log(this.textInput.current.value);
    this.messageRef.push(this.textInput.current.value);
  };
  render() {
    const { authenticated, loading, currentUser } = this.state;

    if (loading) {
      return <CircularProgress />;
    }
    return (
      <div className="App">
        <h1 className="title">MESSENGER</h1>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </div>
          <PrivateRoute
            exact
            user={currentUser}
            update={this.updateUser}
            path="/"
            component={Profile}
            authenticated={authenticated}
          />
        </Router>
        {/* <div className="NICE">
          <div className="form__message">
            {this.state.list.map((item, index) => <li key={index}>{item}</li>)}
          </div>
          <input ref={this.textInput} type="text" />
          <button onClick={this.handleSubmit}>send</button>
        </div> */}
      </div>
    );
  }
}
export default App;
