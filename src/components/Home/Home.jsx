import React, { Component } from 'react';
import Layout from '../Layout/Layout';
import Login from '../Auth/Login';
import { fire } from '../../firebase/base';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => user ? this.setState({ user }) : this.setState({ user: null }));
  }

  render() {
    return this.state.user ? <Layout /> : <Login />;
  }
}
