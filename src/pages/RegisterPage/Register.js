import React, { Component } from 'react';
import Axios from 'axios';

import Paper from '@material-ui/core/Paper';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null
    };

    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.type]: event.target.value
    });
  };

  handleSubmit = event => {
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    Axios.post(
      '/jamu/api/user/signin',
      {
        email: this.state.email,
        password: this.state.password
      },
      axiosConfig
    )
      .then(data => {
        const user = data.data;
        if (user.succes !== false) {
          localStorage.setItem('user', JSON.stringify(user));
          window.location.href = '/plant';
        }
      })
      .catch(err => {});
    event.preventDefault();
  };
  render() {
    return (
      <div>
        <Paper
          style={{
            width: '60%',
            margin: 'auto',
            marginTop: '10%',
            marginBottom: '10px',
            padding: '30px'
          }}
        >
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              onChange={this.handleChange}
              id="name"
              type="password"
              required
            />
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="email">email</InputLabel>
            <Input
              onChange={this.handleChange}
              id="email"
              type="email"
              required
            />
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              onChange={this.handleChange}
              id="password"
              type="password"
              required
            />
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              onChange={this.handleChange}
              id="password"
              type="password"
              required
            />
          </FormControl>

          <Button
            onClick={this.handleSubmit}
            variant="contained"
            color="primary"
            size="medium"
          >
            Register
          </Button>
        </Paper>
      </div>
    );
  }
}

export default Register;
