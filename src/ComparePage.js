import React from 'react';
import Axios from 'axios'
import PropTypes from 'prop-types';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CircularUnderLoad from './Loader'

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: 600,
    display: "flex",
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
            loading: true,
            item:[],
            herbsmed: [],
            item1: '',
            item2: '',
            displayItem1: null,
            displayItem2: null,
            same:[],
            defer: [],
            refCrude1: [],
            refCrude2: [],
            sama: []
        }
        // change code above this line
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

  async componentDidMount() {
    this.getData();
  }
  
 async getData(){
  const url = '/jamu/api/herbsmed/getlist';
  const res = await Axios.get(url);
  const { data } = await res;
  let temp = [];
  data.data.forEach(herbsmed => {
    temp.push({label:herbsmed.name,value:herbsmed.idherbsmed});
  });
  this.setState({
    item: temp, 
    herbsmed: data.herbsmed,
    loading: false
  })
}

async handleSubmit(){
  this.setState({
    loading: true
  })
  let res = await Axios.get('/jamu/api/herbsmed/get/'+ this.state.item1.value);
  const { data } = await res;
  this.setState({
    displayItem1: data.data
  })

  let refCrude1 = this.state.displayItem1.refCrude;
  let ok = []
  await refCrude1.forEach(itm => {
      Axios.get('/jamu/api/crudedrug/get/'+ itm.idcrude)
      .then(res => ok.push(res.data.data))
});
let item1 = this.state.displayItem1;
item1.refCrude = ok
this.setState({
    displayItem1: item1
})

  let res1 = await Axios.get('/jamu/api/herbsmed/get/'+ this.state.item2.value);
  const data1 = await res1.data;
  this.setState({
    displayItem2: data1.data
  })
  let refCrude2 = this.state.displayItem2.refCrude;
  let ok2 = [];
  await refCrude2.forEach(itm => {
      Axios.get('/jamu/api/crudedrug/get/'+ itm.idcrude)
      .then(res => ok2.push(res.data.data))
  });
let item2 = this.state.displayItem2;
item2.refCrude = ok2
this.setState({
    displayItem2: item2
})

  let sama = []
  await this.state.displayItem1.refCrude.forEach((crud1) => {
    this.state.displayItem2.refCrude.forEach((crud2) => {
      if ( crud1.idcrude === crud2.idcrude) {
        sama.push(crud1);
      }
    })
  })
  
  let beda1 = []
  await this.state.displayItem1.refCrude.forEach(function(itm) {
    var unique = true;
    sama.forEach(function(itm2) {
        if (itm.idcrude === itm2.idcrude) unique = false;
    });
    if (unique)  beda1.push(itm);
});


let beda2 = []
  await this.state.displayItem2.refCrude.forEach(function(itm) {
    var unique = true;
    sama.forEach(function(itm2) {
        if (itm.idcrude === itm2.idcrude) unique = false;
    });
    if (unique)  beda2.push(itm);
});
console.log(beda2)
  this.setState({
      sama: sama,
      refCrude1: beda1,
      refCrude2: beda2,
      loading: false
  })  
}


  handleChange = name => value => {
    this.setState({
      [name]: value,
    });

    if (name === 'item2'){
        this.handleSubmit();
    }
  };

  render() {
    const { classes, theme } = this.props;

    if (this.state.loading) {
        return <div style={{
          width:"100%",
          height:"100%",
          margin:"auto",
          display:"flex",
          justifyContent:"center",
          alignItems:"center"
        }}><CircularUnderLoad/></div>;
      }
    
    if (this.state.displayItem2 !== null){
        return (
      <div className={classes.root}>
      <Paper style={{
          width: "80%",
          margin: "auto",
          marginTop:"80px",
          marginBottom:"20px",
          padding: "10px",
          minHeight: "350px"
      }}>
          <Select
            options={this.state.item}
            value={this.state.item1}
            onChange={this.handleChange('item1')}
          />
          <div className={classes.divider} />
           <Select
            options={this.state.item}
            value={this.state.item2}
            onChange={this.handleChange('item2')}
          />
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
             {this.state.displayItem1.name}
             </Typography>
             <Typography component="p">
             {this.state.displayItem1.efficacy}
             </Typography>
             </Paper>
             <Paper style={{
                 width:"45%",
                 padding:"10px",
                 marginTop: "10px"
             }}>
             <Typography variant="h5" component="h3">
             {this.state.displayItem2.name}
             </Typography>
             <Typography component="p">
             {this.state.displayItem2.efficacy}
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
     </Paper>
      </div>
        )
    }
    return (
      <div className={classes.root}>
      <Paper style={{
          width: "80%",
          margin: "auto",
          marginTop:"80px",
          padding: "10px",
          minHeight: "350px"
      }}>
          <Select
            options={this.state.item}
            value={this.state.item1}
            onChange={this.handleChange('item1')}
          />
          <div className={classes.divider} />
           <Select
            options={this.state.item}
            value={this.state.item2}
            onChange={this.handleChange('item2')}
          />

          <div style={{
            height:"400px",
            border:"hsl(0,0%,80%) 1px solid",
            marginTop:"15px",
            display: "flex",
            justifyContent: "center",
            alignItems:"center"
          }}>

          <Typography component="h2" variant="display1" gutterBottom>
            Select the two herbs above !, then the comparison 
            will appear here
          </Typography>
          </div>
           
        </Paper>
      </div>
    );
  }
}

ComparePage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ComparePage);