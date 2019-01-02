import React, { Component } from 'react';
import { fire } from 'firebase/base';
import Layout from 'components/Layout/Layout';
import Login from 'components/Auth/Login';
import { Spin } from 'antd';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      status: 'running'
    };
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => user ? this.setState({ user, status: 'finish' }) : this.setState({ user: null, status: 'finish' }));
  }

  render() {
    return this.state.status === 'finish' ? this.state.user ? <Layout /> : <Login /> : <Spin style={{
      width: '90%',
      height: '60%',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto',
    }} tip="Waiting..." />;
  }
}
