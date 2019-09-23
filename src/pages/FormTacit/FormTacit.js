import React, { Component } from 'react';

import { FormControl, InputLabel, Input } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

class Popup extends React.Component {
  render() {
    return (
      <div className="popup">
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="input">Add reference here</InputLabel>
          <Input
            value={this.props.input}
            name="input"
            onChange={this.props.onChange}
            type="text"
          />
        </FormControl>
        <Button
          style={{ marginRight: '10px' }}
          onClick={this.props.add}
          variant="contained"
          color="primary"
        >
          Add reference
        </Button>
        <Button
          onClick={this.props.closePopup}
          variant="contained"
          color="primary"
        >
          Close
        </Button>
      </div>
    );
  }
}
class FormTacit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      title: '',
      content: '',
      input: '',
      reff: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.addReff = this.addReff.bind(this);
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  addReff = () => {
    this.setState({
      reff: [...this.state.reff, this.state.input],
      input: '',
      showPopup: false
    });
  };
  onSubmit = event => {
    //   let user = localStorage.getItem("user")
    //   user = JSON.parse(user)
    //   let axiosConfig = {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': user.token
    //       }
    //     };
    // Axios.post('http://ci.apps.cs.ipb.ac.id/jamu/api/tacit/create', {
    //   title: this.state.title,
    //   content: this.state.content,
    //   reference: this.state.reff
    // },axiosConfig)
    // .then(data => {
    // const res = data.data;
    //     window.location.href = '/';

    // })
    // .catch(err => {
    // });
    event.preventDefault();
  };

  render() {
    return (
      <Paper
        style={{
          width: '90%',
          margin: 'auto',
          marginTop: '100px',
          padding: '10px'
        }}
        elevation={4}
      >
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="email">Title</InputLabel>
          <Input onChange={this.onChange} name="title" id="title" type="text" />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="email">Content</InputLabel>
          <Input
            name="content"
            onChange={this.onChange}
            id="email"
            multiline
            rows={15}
          />
        </FormControl>
        <label>refrensi :</label>
        <Fab onClick={this.togglePopup} color="primary" aria-label="Add">
          <AddIcon />
        </Fab>
        {this.state.showPopup ? (
          <Popup
            text="Close Me"
            input={this.state.input}
            closePopup={this.togglePopup}
            onChange={this.onChange}
            add={this.addReff}
          />
        ) : null}
        {this.state.reff
          ? this.state.reff.map(item => {
              return <p>{item}</p>;
            })
          : null}
        <hr></hr>
        <Button
          style={{
            display: 'block',
            width: '80%',
            margin: 'auto'
          }}
          onClick={this.onSubmit}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </Paper>
    );
  }
}

export default FormTacit;
