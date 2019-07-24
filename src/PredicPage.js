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

import SnackBar from './SnackBar'
import ErorPage from './ErorPage'

import Footer from './Footer'

import {
    FormControl,
    InputLabel
  } from "@material-ui/core";

import Picklist from './components/pick-list';
import Spinner from './Spinner';

const styles = theme => ({
  root: {
    width: '70%',
    margin: 'auto',
    marginTop: '100px',
    marginBottom: '40px',
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

class Predict extends Component {
  static propTypes = {
    classes: PropTypes.object,
  };

  constructor(props) {
    super(props);
    // change code below this line
    this.state = {
        loading: true,
        onPredic: true,
        activeStep: 0,
        skipped: new Set(),
        item:[],
        itembasis : [],
        itemtarget : [],
        type: '',
        model:'',
        target: [],
        snackbar: {
          open: false,
          success: false,
          message: '',
        }
    }
    // change code above this line
    this.coba = this.coba.bind(this);
    this.coba1 = this.coba1.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.afterUpdate = this.afterUpdate.bind(this);
        this.closeBtn = this.closeBtn.bind(this);
  }

  async componentDidMount() {
    this.getData();
  }
  
 async getData(){
  try {const url = '/jamu/api/plant/getlist';
  const res = await Axios.get(url);
  const { data } = await res;
  let coba = [];
  console.log(data.data)
  data.data.forEach(plant => {
    coba.push(plant.sname);
  });
  this.afterUpdate(data.success, data.message);
  this.setState({
    itembasis: coba, 
    item: data.data, 
    loading: false})
  } catch (err){
    console.log(err.message)
    this.afterUpdate(false, err.message);
    this.setState({
      onEror: true,
      loading: false
    })
  }
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
                target.push(i);
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

  async handleSubmit (event ){
    this.setState({
      onPredic: true
    })
    this.handleNext()
    this.setState({
      onPredic: false
    })
    
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
    const { classes } = this.props;
    const steps = ['Select Type of Prediction', `Choose Method and ${this.state.type}`, 'Sumarry'];
    const { activeStep } = this.state;

    return (
      <div>
        {
          this.state.onEror ? <ErorPage />
          :
        this.state.loading ? <Spinner /> 
        :
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

    {this.state.onPredic ? <Spinner /> :
    <Typography className={classes.instructions}>
        All steps completed - you&quot;re finished
    </Typography>
    }
    
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

                {activeStep === 1 ? 
                 <Button
                 variant="raised"
                 color="primary"
                 onClick={this.handleNext}
                 className={classes.button}
               >
                 {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
               </Button>
                :
                (activeStep === steps.length - 1) 
                  ? 
                <Button
                  variant="raised"
                  color="primary"
                  onClick={this.handleSubmit}
                  className={classes.button}>Submit</Button> : 
                  <Button
                variant="raised"
                color="primary"
                onClick={this.handleNext}
                className={classes.button}>Next</Button>}
              </div>
            </div>
          )}
        </div>
      </div>
      </Paper>
      }
      {
          this.state.loading ?
          null
          :
          <Footer />
        }
       {this.state.snackbar.open === true ? <SnackBar data={this.state.snackbar} close={this.closeBtn}/>
              : 
              null
              }
      </div>
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
          <label>Select herbal medicine :</label>
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
      alignItems : "center",
      flexDirection:"column",
      width: "50%",
      minHeight: "400px"
    }}>
    <div style={{
      width: "80%"
    }}>
      <h3> Sumarry :</h3>
    </div>
    
    <label>Type of Prediction :</label>
    <span>{props.type}</span>
    <label>Type of Method :</label>
    <span>{props.model}</span>
    <label>{`Selected ${props.type} :`}</label>
    <ul>
      {props.target.map(dt => <li>{dt.sname}</li>)}
    </ul>
    </Paper>
    );
}

export default withStyles(styles)(Predict);
