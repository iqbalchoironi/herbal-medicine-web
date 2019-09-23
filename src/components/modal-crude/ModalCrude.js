import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Typography from '@material-ui/core/Typography';

import LinearProgress from '../linear-progress/LinearProgress';

import Axios from 'axios';

const List = props => {
  if (props.item.sname !== '') {
    return <li>{props.item.sname} </li>;
  }

  return null;
};

class ModalCrude extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalPlant: false,
      addPlant: null,
      loading: false,
      _id: '',
      idcrude: '',
      sname: '',
      name_en: '',
      name_loc1: '',
      name_loc2: '',
      gname: '',
      position: '',
      effect: '',
      effect_loc: '',
      comment: '',
      ref: '',
      refPlant: []
    };
  }

  async componentDidMount() {
    let url = '/jamu/api/crudedrug/get/' + this.props.modal.id;
    let res = await Axios.get(url);
    let data = await res.data.data;
    this.setState({
      _id: data._id,
      idcrude: data.idcrude,
      sname: data.sname,
      name_en: data.name_en,
      name_loc1: data.name_loc1,
      name_loc2: data.name_loc2,
      gname: data.gname,
      position: data.position,
      effect: data.effect,
      effect_loc: data.effect_loc,
      comment: data.comment,
      ref: data.ref,
      refPlant: data.refPlant
    });
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.modal.open}
          onClose={this.props.close}
          aria-labelledby="form-dialog-title"
        >
          {this.state.loading ? <LinearProgress /> : null}
          <DialogTitle id="form-dialog-title">
            You update Crude Drug with id {this.state.idcrude} and name is{' '}
            {this.state.sname}
          </DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              You update herbal medicine with id {this.state.idcrude}
            </DialogContentText> */}
            {/* <TextField
              autoFocus
              margin="dense"
              id="idcrude"
              label="ID for Crude Drug"
              name="idcrude"
              type="text"
              value={this.state.idcrude}
              fullWidth
              onChange={this.valueChange}
            /> */}
            <Typography variant="caption" display="block" gutterBottom>
              Saintifict Name : {this.state.sname}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              Name (in english) : {this.state.name_en}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              Local name I : {this.state.name_loc1}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              Local name II : <i>{this.state.name_loc2}</i>
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              Global Name : <i>{this.state.gname}</i>
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              Effect : {this.state.effect}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              Location Effect : {this.state.effect_loc}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              Refrence : {this.state.ref}
            </Typography>
            <label
              style={{
                color: 'grey',
                fontWeight: 'lighter',
                fontSize: '13px',
                display: 'block',
                marginTop: '10px',
                marginBottom: '5px'
              }}
            >
              Reference Plant :
            </label>
            <ul className="reff">
              {this.state.refPlant.map(item => (
                <List item={item} />
              ))}
            </ul>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.close} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ModalCrude;
