import React, { Component } from 'react';
import { fire } from 'firebase/base';
import Layout from 'components/Layout/Layout';
import Login from 'components/Auth/Login';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      status: 'running'
    };
  }

  componentDidMount() {
    console.log(this.state.user, new Date(), 'before');
    fire.auth().onAuthStateChanged(user => user ? this.setState({ user, status: 'finish' }) : this.setState({ user: null, status: 'finish' }));
    console.log(this.state.user, new Date(), 'after');
  }

  render() {
    return this.state.status === 'finish' ? this.state.user ? <Layout /> : <Login /> : <p>waiting...</p>;
  }
}
