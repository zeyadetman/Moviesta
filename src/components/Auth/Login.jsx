import React, { Component } from 'react';
import {
  Form, Icon, Input, Button, Checkbox, message
} from 'antd';
import { fire, firestore } from '../../firebase/base';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLogin: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({ email: values.email, password: values.password }, () => {
          if (this.state.isLogin) {
            fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(
              u => cookies.set('token', u.user.uid, { path: '/' })
            )
              .catch(err => message.error(err.message));
          } else {
            fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
              .then(u => cookies.set('token', u.user.uid, { path: '/' }))
              .then(() => firestore.collection('users').doc(fire.auth().currentUser.uid.toString()).set({ favorits: [] }))
              .catch(err => message.error(err.message));
          }
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" style={{
        width: '20%',
        minWidth: '250px',
        margin: '25px auto'
      }}>
        <h1>{this.state.isLogin ? 'Sign In' : 'Sign Up'}</h1>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your Email!' }],
          })(
            <Input type="email" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <p className="login-form-forgot">Forgot password</p>
          <Button type="primary" htmlType="submit" className="login-form-button">
            {this.state.isLogin ? 'Login' : 'Register'}
          </Button>
          Or <a href="#" onClick={() => this.setState({ isLogin: !this.state.isLogin })}>
            {this.state.isLogin ? 'Register Now' : 'Login Instead'}
          </a>
        </Form.Item>
      </Form>
    );
  }
}

const Login = Form.create()(LoginForm);
export default Login;