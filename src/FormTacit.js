import React, { Component } from 'react';

import Axios from 'axios'
class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <input value={this.props.input} name="input" onChange={this.props.onChange} type="text" className="input-ref"></input>
        <button onClick={this.props.palak}>submit</button>
        <button onClick={this.props.closePopup}>close me</button>
        </div>
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
      input:'',
      reff: []
    };
    
    this.onSubmit = this.onSubmit.bind(this);
    this.addReff = this.addReff.bind(this);
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state)
  }
  addReff = () => {
    this.setState({ 
      reff: [...this.state.reff, this.state.input],
      input: '',
      showPopup: false
    });
  }
  onSubmit = event => {
    console.log(this.state)
    let user = localStorage.getItem("user")
    user = JSON.parse(user)
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': user.token
        }
      };
  Axios.post('http://ci.apps.cs.ipb.ac.id/jamu/api/tacit/create', {
    title: this.state.title,
    content: this.state.content,
    reference: this.state.reff
  },axiosConfig)
  .then(data => {
  const res = data.data;
    console.log(res)
      window.location.href = '/';
  
  })
  .catch(err => {
  });
  event.preventDefault();
  }

  render() {
    return (
    <div className="wraper">
        <input className="input-title" name="title" onChange={this.onChange} type="text" placeholder="Title..."/>
        <textarea name="content" onChange={this.onChange} placeholder="Contet..."></textarea>
        <label>refrensi :</label>
        <button onClick={this.togglePopup}>Add</button>
        {this.state.showPopup ? 
          <Popup
            text='Close Me'
            input={this.state.input}
            closePopup={this.togglePopup}
            onChange={this.onChange}
            palak={this.addReff}
          />
          : null
        }
        {this.state.reff ? 
          this.state.reff.map(item => {
            return <p>{item}</p>
          })
          : null
        }
        <hr></hr>
        <button onClick={this.onSubmit} style={{display: "block", minWidth: "70%", marginTop: "30px", marginBottom: "30px"}}>submit</button>
      </div>
    );
  }
}

export default FormTacit;