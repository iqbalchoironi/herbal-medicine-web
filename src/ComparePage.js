import React from 'react';
import Axios from 'axios'
import PropTypes from 'prop-types';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Spinner from './Spinner'
import LinearProgress from './LinearProgress'

import { Button } from '@material-ui/core';

import SnackBar from './SnackBar'
import ErorPage from './ErorPage'

import Footer from './Footer'

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: 600,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});


class ComparePage extends React.Component {
    constructor(props) {
        super(props);
        // change code below this line
        this.state = {
            loading: false,
            loadCompare: false,
            compare: false,

            refHerbMed:[],

            forLabelherbmed1: null,
            forLabelherbmed2: null,

            herbmed1: null,
            herbmed2: null,

            refCrude1: [],
            refCrude2: [],
            sama: [],
            snackbar: {
              open: false,
              success: false,
              message: '',
            }
        }
        // change code above this line
        this.handleChange = this.handleChange.bind(this);
        this.getDataHerbmed1 = this.getDataHerbmed1.bind(this);
        this.getDataHerbmed2 = this.getDataHerbmed2.bind(this);
        this.getSame = this.getSame.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.reset = this.reset.bind(this);
        this.afterUpdate = this.afterUpdate.bind(this);
        this.closeBtn = this.closeBtn.bind(this);
      }

  async componentDidMount() {
    this.setState({
      loading: true
    })
    await this.getData();
  }
  
  async getData(){
   try { const url = '/jamu/api/herbsmed/getlist';
    const res = await Axios.get(url);
    const { data } = await res;
    let herbsmed = data.data.map( dt => {
      return { label : dt.name, value : dt.idherbsmed }
    });
    this.afterUpdate(data.success, data.message);
    this.setState({
      refHerbMed: herbsmed,
      loading: false
    })} catch (err){
      console.log(err.message)
      this.afterUpdate(false, err.message);
      this.setState({
        onEror: true,
        loading: false
      })
    }
  }

  handleChange = name => value => {
    this.setState({
      [name]: value
    })
  }

  async getDataHerbmed1(){
    try {let res = await Axios.get('/jamu/api/herbsmed/get/'+ this.state.forLabelherbmed1.value);
    const { data } = await res;
    this.setState({
      herbmed1: data.data
    })

    let refCrude1 = this.state.herbmed1.refCrude;
    let tempRefCrude1= []
    for (let itm of refCrude1) {
      await Axios.get('/jamu/api/crudedrug/get/'+ itm.idcrude)
         .then(res => tempRefCrude1.push(res.data.data))
    }

    let item1 = this.state.herbmed1;
    item1.refCrude = tempRefCrude1
    this.afterUpdate(data.success, data.message);
    this.setState({
        herbmed1: item1
    })} catch (err){
      console.log(err.message)
      this.afterUpdate(false, err.message);
      this.setState({
        onEror: true,
        loading: false
      })
    }
  }

  async getDataHerbmed2(){
    try {let res = await Axios.get('/jamu/api/herbsmed/get/'+ this.state.forLabelherbmed2.value);
    const { data } = await res;
    this.setState({
      herbmed2: data.data
    })

    let refCrude2 = this.state.herbmed2.refCrude;
    let tempRefCrude2= []
    for (let itm of refCrude2) {
      await Axios.get('/jamu/api/crudedrug/get/'+ itm.idcrude)
         .then(res => tempRefCrude2.push(res.data.data))
    }

    let item2 = this.state.herbmed2;
    item2.refCrude = tempRefCrude2
    this.afterUpdate(data.success, data.message);
    this.setState({
        herbmed2: item2
    })} catch (err){
      console.log(err.message)
      this.afterUpdate(false, err.message);
      this.setState({
        onEror: true,
        loading: false
      })
    }
  }

  getSame(){
    return new Promise(resolve => {
      let sama = [];
      let i = 0;
      for (let itm1 of this.state.herbmed1.refCrude){
        if (i !== this.state.herbmed1.refCrude.leght){
          for (let itm2 of this.state.herbmed2.refCrude){
            if (itm1.idcrude === itm2.idcrude) {
              sama.push(itm1)
            }
          }
          i++;
        }
        this.setState({
          sama:sama
        })
        resolve(sama);
      }
    })
  }

  getBeda1(){
    return new Promise(resolve => {
      let beda1= []
      let i = 0;
      let cek = false;
      for (let itm1 of this.state.herbmed1.refCrude){
        if (i !== this.state.herbmed1.refCrude.leght){
          cek = false;
          for (let sm of this.state.sama){
            if (itm1.idcrude === sm.idcrude) {
              cek = true;
            }
          }
          i++;
          if (cek === false) {
            beda1.push(itm1)
          }
        }
        resolve(beda1);
      }
    })
  }

  getBeda2(){
    return new Promise(resolve => {
      let beda2= []
      let i = 0;
      let cek = false;
      for (let itm2 of this.state.herbmed2.refCrude){
        if (i !== this.state.herbmed2.refCrude.leght){
          cek = false;
          for (let sm of this.state.sama){
            if (itm2.idcrude === sm.idcrude) {
              cek = true;
            }
          }
          i++;
          if (cek === false) {
            beda2.push(itm2)
          }
        }
        resolve(beda2);
      }
    })
  }

  async handleSubmit(){
    this.setState({
      loadCompare: true
    })

    await this.getDataHerbmed1();
    await this.getDataHerbmed2();

    await this.getSame();
    let beda1 = await this.getBeda1();
    let beda2 = await this.getBeda2();
    
    this.setState({
      refCrude1: beda1,
      refCrude2: beda2,
      compare: true,
      loadCompare:false
    })
    
  }

  reset(){
    this.setState({
      compare: false
    })
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

    return (
      <div className={classes.root}>
        {
          this.state.onEror ? <ErorPage />
          :
        this.state.loading ? 
        <Spinner />
        :
        <Paper style={{
          width: "70%",
          margin: "auto",
          marginTop:"90px",
          marginBottom:"30px",
          padding: "10px",
          minHeight: "350px",
          backgroundColor:"#f8f8f8"
        }}>
          <Select
            options={this.state.refHerbMed}
            value={this.state.forLabelherbmed1}
            onChange={this.handleChange('forLabelherbmed1')}
          />
          <div className={classes.divider} />
           <Select
            options={this.state.refHerbMed}
            value={this.state.forLabelherbmed2}
            onChange={this.handleChange('forLabelherbmed2')}
          />
          <div style={{
            width:"100%",
            display:"flex",
            flexDirection:"row",
            justifyContent:"flex-end",
            marginTop:"10px"
          }}>
            {this.state.compare ?
              <Button variant="contained" onClick={this.reset}>Reset</Button>
              :
              <Button variant="contained" onClick={this.handleSubmit}>Compare</Button>
            }
          </div>
          
          {
            this.state.loadCompare ?
              <div style={{
                height:"400px",
                border:"hsl(0,0%,80%) 1px solid",
                marginTop:"15px",
                display: "flex",
                justifyContent: "center",
                alignItems:"center"
              }}>
                <LinearProgress />
              </div>
            :
            this.state.compare ?
              <div>
                <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around"
            }}> 
             <Paper style={{
                 width:"45%",
                 padding:"10px",
                 marginTop: "10px"
             }}>
             <Typography variant="h5" component="h3">
             {this.state.herbmed1.name}
             </Typography>
             <Typography component="p">
             {this.state.herbmed1.efficacy}
             </Typography>
             </Paper>
             <Paper style={{
                 width:"45%",
                 padding:"10px",
                 marginTop: "10px"
             }}>
             <Typography variant="h5" component="h3">
             {this.state.herbmed2.name}
             </Typography>
             <Typography component="p">
             {this.state.herbmed2.efficacy}
             </Typography>
             </Paper>
         </div>
         
         <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: "15px"
            }}> 
 
         <div style={{
             width: "46%"
         }}>
        {this.state.refCrude1.map(item => {
            return (
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>{item.sname}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Typography>
                        {item.idcrude}
                        <br></br>
                        {item.effect}
                        <br></br>
                        {item.position}
                    </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            )
        })}
     </div>
 
     <div style={{
             width: "46%"
         }}>
       {this.state.refCrude2.map(item => {
            return (
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>{item.gname}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Typography>
                        {item.idcrude}
                        {item.name_loc1}
                        {item.position}
                    </Typography>
                    </ExpansionPanelDetails>
                    </ExpansionPanel>
            )
        })}
     </div>
         </div>
 
         <div style={{
             width: "55%",
             margin:"auto",
             marginTop : "15px"
         }}>
       {this.state.sama.map(item => {
            return (
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>{item.sname}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Typography>
                        {item.idcrude}
                    </Typography>
                    </ExpansionPanelDetails>
                    </ExpansionPanel>
            )
        })}
     </div>
              </div>
               :
               <div style={{
                height:"400px",
                border:"hsl(0,0%,80%) 1px solid",
                marginTop:"15px",
                display: "flex",
                flexDirection:"column",
                justifyContent: "center",
                alignItems:"center",
                backgroundColor:"white"
              }}>
              <img style={{
                width: "250px",
                height: "250px"
              }} src={'/asset/comparision.jpeg'} alt="Logo" />
              <Typography component="h2" variant="display1" gutterBottom>
                Select the two herbs above !, then the comparison 
                will appear here
              </Typography>
              </div>
          }
          
           
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

ComparePage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ComparePage);