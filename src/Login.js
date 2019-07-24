import React, { Component } from 'react'
import Axios from 'axios';
import ButtonProgress from './ButtonProgress'
import Paper from '@material-ui/core/Paper';
import {
    FormControl,
    InputLabel,
    Input,
  } from "@material-ui/core";

  import SnackBar from './SnackBar'

  const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
  
    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
  
    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });
  
    return valid;
  };

class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          loading: false,
          email: null,
          password: null,
          formErrors: {
            email: "",
            password: ""
          },
          snackbar: {
            open: false,
            success: false,
            message: '',
          }
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.afterUpdate = this.afterUpdate.bind(this);
        this.closeBtn = this.closeBtn.bind(this);
      }
    
      handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
          case "email":
            formErrors.email = emailRegex.test(value)
              ? ""
              : "invalid email address";
            break;
          case "password":
            formErrors.password =
              value.length < 6 ? "minimum 6 characaters required" : "";
            break;
          default:
            break;
        }

        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
      }
    
      handleSubmit = event => {
        this.setState({
          loading: true
        })
        if (formValid(this.state)) {
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
          this.afterUpdate(user.success, user.message);
          if (user.succes !== false) {
              localStorage.setItem("user",JSON.stringify(user));
              window.location.href = '/';
          }
          this.setState({
            loading: false
          })
          })
          .catch(err => {

            this.afterUpdate(false, err.message);
            this.setState({
              onEror: true,
              loading: false
            })
          });
        } else {
          this.afterUpdate(false, 'fill the form with true value');
          this.setState({
            onEror: true,
            loading: false
          })
        }
        event.preventDefault();
      }

      async afterUpdate (success, message){
        this.setState({
          snackbar: {
            open: true,
            success: success,
            message: message,
          }
        })
      }
  
      closeBtn() {
        this.setState({
          snackbar: {
            open: false,
            success: false,
            message: '',
          }
        })
      }

    render() {
      const { formErrors } = this.state;
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
                    <FormControl margin="normal" fullWidth  >
                        <InputLabel htmlFor="email">email</InputLabel>
                        <Input onChange={this.handleChange} name="email"  type="email"  error={formErrors.email.length > 0 }/>
                    </FormControl>
                    {formErrors.email.length > 0 && (
                      <span style={{
                        color: "red",
                        margin: 0,
                        fontSize: "12px"
                      }}>{formErrors.email}</span>
                    )}
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input onChange={this.handleChange} name="password" type="password" error={formErrors.password.length > 0 }/>
                    </FormControl>
                    {formErrors.password.length > 0 && (
                      <span style={{
                        color: "red",
                        margin: 0,
                        fontSize: "12px"
                      }}>{formErrors.password}</span>
                    )}
                    <ButtonProgress loading={this.state.loading} handleButtonClick={this.handleSubmit} disable={formErrors.password.length > 0 && formErrors.email.length > 0}/>
                </Paper>
                {this.state.snackbar.open === true ? <SnackBar data={this.state.snackbar} close={this.closeBtn}/>
                  : 
                  null
                  }
            </div>
        )
    }
}

export default Login;