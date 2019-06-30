import React, { Component } from 'react'
import Axios from 'axios';

import Paper from '@material-ui/core/Paper';
import {
    FormControl,
    InputLabel,
    Input,
    Button,
  } from "@material-ui/core";

class Login extends Component {
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
      }
    
      handleSubmit = event => {
          console.log(this.state)
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
            }
          };
        Axios.post('/jamu/api/user/signin', {
            email: this.state.email,
            password: this.state.password
        },axiosConfig)
        .then(data => {
        const user = data.data;
        if (user.succes !== false) {
            localStorage.setItem("user",JSON.stringify(user));
            window.location.href = '/';
        }
        })
        .catch(err => {
        });
        event.preventDefault();
      }
    render() {
        return(
            <div style={{
              display:"flex",
              flexDirection:"row"
            }}>

                <Paper style={{
                    width:"30%",
                    marginLeft:"auto",
                    marginTop:"10%",
                    height:"350px",
                    marginBottom: "10px",
                    padding: "30px",
                    backgroundColor:"#7AC143"
                }}>
                   
                </Paper>

                 <Paper style={{
                    display:"flex",
                    flexDirection:"column",
                    justifyContent : "center",
                    alignItems : "center",
                    width:"30%",
                    marginRight:"auto",
                    marginTop:"10%",
                    height:"350px",
                    marginBottom: "10px",
                    padding: "30px"
                }}>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="email">email</InputLabel>
                        <Input onChange={this.handleChange} id="email" type="email" required/>
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input onChange={this.handleChange} id="password" type="password" required/>
                    </FormControl>

                    <Button style={{ width:"100%"}}onClick={this.handleSubmit} variant="contained" color="primary" size="medium">Login</Button>
                </Paper>
            </div>
        )
    }
}

export default Login;