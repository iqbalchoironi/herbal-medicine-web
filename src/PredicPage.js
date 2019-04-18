import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';

import {
    FormControl,
    InputLabel,
    Input,
    TextField
  } from "@material-ui/core";

import Picklist from './components/pick-list';

const styles = theme => ({
  root: {
    width: '90%',
    margin: 'auto',
    marginTop: '20px',
    padding: "10px"
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

class HorizontalLinearStepper extends Component {
  static propTypes = {
    classes: PropTypes.object,
  };

  constructor(props) {
    super(props);
    // change code below this line
    this.state = {
        loading: true,
        activeStep: 0,
        skipped: new Set(),
        item:[],
        itembasis : [],
        itemtarget : [],
        type: '',
        model:'',
        target: []
    }
    // change code above this line
    this.coba = this.coba.bind(this);
    this.coba1 = this.coba1.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    this.getData();
  }
  
 async getData(){
  const url = 'http://ci.apps.cs.ipb.ac.id/jamu/api/plant/getlist';
  const res = await Axios.get(url);
  const { data } = await res;
  let coba = [];
  console.log(data.data)
  data.data.forEach(plant => {
    coba.push(plant.sname);
  });
  this.setState({itembasis: coba, item: data.data, loading: false})
}
  optionsArray = [{
    label: 'svm',
    value: 'svm'
  }, {
    label: 'som',
    value: 'som'
  }];


  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }

    if( activeStep === 1){
        let target = [];
        this.state.itemtarget.forEach(item => {
            this.state.item.forEach(i => {
            if(i.sname === item){
                target.push(i.idplant);
            }
            })
        });
        this.setState({
            target: target
        })
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped,
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  coba(e){
    this.setState({
      itemtarget: [...this.state.itemtarget,e.target.dataset.value],
      itembasis: this.state.itembasis.filter( data => data !== e.target.dataset.value)
    });
    
  }

  coba1(e){
    this.setState({
      itembasis: [...this.state.itembasis,e.target.dataset.value],
      itemtarget: this.state.itemtarget.filter( data => data !== e.target.dataset.value)
    });
  }

  handleChange = event => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })    
    console.log(this.state)
    event.preventDefault();
  }  
  render() {
    const { classes } = this.props;
    const steps = ['Select campaign settings', 'Create an ad group', 'Result'];
    const { activeStep } = this.state;

    return (
      <Paper className={classes.root} elevation={4}>
      <div>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};
            if (this.isStepSkipped(index)) {
              props.completed = false;
            }
            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
            <div
              style={{
                display: "flex",
      justifyContent : "center"
              }}
            >
              <Paper style={{
      display: "flex",
      justifyContent : "center",
      width: "50%",
      minHeight: "400px"
    }}>

    <Typography className={classes.instructions}>
        All steps completed - you&quot;re finished
    </Typography>
    
    </Paper>  
            </div>
            <div>
             <Button onClick={this.handleReset} className={classes.button}>
             Reset
           </Button>
           </div>
           </div>
          ) : (
            <div>
            <div style={{
              display: "flex",
              justifyContent : "center"
            }}>
               <Step1 
                  type={this.state.type}  
                  activeStep={this.state.activeStep} 
                  handleChange={this.handleChange}
                  />
                <Step2 
                  activeStep={this.state.activeStep} 
                  handleChange={this.handleChange}
                  model={this.state.model}
                  options={this.optionsArray}
                  basis={this.state.itembasis} 
                  target={this.state.itemtarget} 
                  coba1={this.coba1} 
                  coba={this.coba}
                  />
                <Step3 
                  activeStep={this.state.activeStep} 
                  type={this.state.type}
                  model={this.state.model}
                  target={this.state.target}
                  onSubmit={this.onSubmit} 
                  />
                </div>
              <div style={{
                marginTop: "10px"
              }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.button}
                >
                  Back
                </Button>

                <Button
                  variant="raised"
                  color="primary"
                  onClick={this.handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      </Paper>
    );
  }
}

function Step1(props) {
  if (props.activeStep !== 0) {
    return null
  } 
  return(
    <Paper style={{
      display: "flex",
      justifyContent : "center",
      alignItems : "center",
      width: "50%",
      minHeight: "400px"
    }}>
    <FormControl component="fieldset">
          <FormLabel component="legend">Select approach :</FormLabel>
          <RadioGroup
            aria-label="Approach"
            name="type"
            onChange={props.handleChange}
          >
            <FormControlLabel value="crude" control={<Radio />} label="Crude" />
            <FormControlLabel value="molecul" control={<Radio />} label="Molecul" />
          </RadioGroup>
        </FormControl>
  </Paper>
  );
}

function Step2(props) {
  if (props.activeStep !== 1) {
    return null
  } 
  return(
    <Paper style={{
      display: "flex",
      justifyContent : "center",
      width: "50%",
      minHeight: "400px"
    }}>
    <form style={{ width: "90%" }}>
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="model">Model </InputLabel>
          <Select
            native
            name="model"
            value={props.model}
            onChange={props.handleChange}
            inputProps={{
              id: 'age-native-simple'
            }}
          >
            <option value="" />
            <option value={'svm'}>svm</option>
            <option value={'som'}>som</option>
          </Select>
        </FormControl>

        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Picklist basis={props.basis} target={props.target} coba1={props.coba1} coba={props.coba}/>
        </FormControl>
      </form>
      </Paper>
  );
}

function Step3(props) {
  if (props.activeStep !== 2) {
    return null
  } 
  return (
    <Paper style={{
      display: "flex",
      justifyContent : "center",
      width: "50%",
      minHeight: "400px"
    }}>
    <h6> Sumarry</h6>
    <p>{props.type}</p>
    <p>{props.model}</p>
    <p>{props.target}</p>
    
    </Paper>
    );
}

export default withStyles(styles)(HorizontalLinearStepper);
