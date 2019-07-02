import React, { Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton'
import ButtonCard from './ButtonCard'

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { blue } from '@material-ui/core/colors';

const BootstrapInput = withStyles(theme => ({
    root: {
      'label + &': {
        marginTop: theme.spacing.unit * 3,
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '0px solid #ced4da',
      fontSize: 16,
      width: 'auto',
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

  
const styles = {
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
      marginLeft: 8,
      flex: 1,
    },
    iconButton: {
      padding: 10,
    }
  };

  function Landing(props) {
    const { classes } = props;
    const images = [{
      url: '/asset/herbsmed.jpeg',
      title: 'Herbal Medicine',
      directory: '/herbmeds'
    },
    {
      url: '/asset/plant.jpeg',
      title: 'Plant',
      directory: '/plant'
    },
    {
      url: '/asset/compound.jpeg',
      title: 'Compound',
      directory: '/compound',
    },
    {
      url: '/asset/comparision.jpeg',
      title: 'Comparision',
      directory: '/compare'
    },
    {
      url: '/asset/prediction.jpeg',
      title: 'Prediction',
      directory: '/predict'
    },
    {
      url: '/asset/tacit.jpeg',
      title: 'Tacit Knowledge',
      directory: '/tacit'
    },
    {
      url: '/asset/explicit.jpeg',
      title: 'Explicit Knowledge',
      directory: '/explicit'
    },
    {
      url: '/asset/plant_ethnic.jpeg',
      title: 'Plant Used Ethnic',
      directory: '/map/ethnic'
    },]
        return (
            <div style={{
                display:"flex",
                flexDirection:"column"
            }}>
                <div style={{
                    width: "100%",
                    height:"500px",
                    border:"black solid 1px",
                    display: "flex",
                    justifyContent : "center",
                    alignItems : "center",
                    backgroundColor: "#a9ba9d"
                    
                }}>
                    <Paper className={classes.root} elevation={1}>
                    <FormControl className={classes.margin}>
                    {/* <InputLabel htmlFor="age-customized-native-simple" className={classes.bootstrapFormLabel}>
                        Age
                    </InputLabel> */}
                    <NativeSelect
                        // value={this.state.age}
                        // onChange={this.handleChange}
                        input={<BootstrapInput name="age" id="age-customized-native-simple" />}
                    >
                        <option value="All">All</option>
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                    </NativeSelect>
                    </FormControl>
                        <InputBase className={classes.input} placeholder="Search here..." />
                        <IconButton className={classes.iconButton} aria-label="Search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </div>
                {/* <div style={{
                    width: "70em",
                    height:"290px",
                    display: "flex",
                    backgroundColor: "#eee",
                    margin: "auto",
                    marginTop: "10px"
                }}>
                  <div style={{
                    width:"70%",
                    height:"290px"
                  }}>
                    <img style={{ width:"100%", height:"100%", objectFit:"cover"}} src="http://www.kelanadmc.com/photos/stories/jamu-11.jpg"></img>
                  </div>
                  <div>
                    
                  </div>
                </div>
                <div style={{
                    width: "70em",
                    height:"290px",
                    display: "flex",
                    backgroundColor: "#eee",
                    margin: "auto",
                    marginTop: "10px"
                }}>
                  <div style={{
                    width:"30%",
                    height:"290px"
                  }}>

                  </div>
                  <div style={{
                    width:"70%",
                    height:"290px"
                  }}>
                    <img style={{ width:"100%", height:"100%", objectFit:"cover"}} src="http://www.obatkuat.net/wp-content/uploads/2015/11/ramuan-kuat.jpg"></img>
                  </div>
                </div> */}
                <div style={{
                   width:"95%",
                   margin:"auto",
                   marginTop: "20px",
                   marginBottom: "20px",
                   display: "grid",
                   gridTemplateColumns: "repeat(auto-fill, minmax(16rem, 1fr))",
                   gridGap: "2rem"
                }}>
                  {images.map(image => {
                    return <ButtonCard image={image} />
                  })}
                      
                </div>

                <div style={{
                    width: "100%",
                    height:"300px",
                    display: "flex",
                    justifyContent : "center",
                    alignItems : "center",
                    backgroundColor: "grey"
                    
                }}>
                </div>
                
            </div>
        )
    }

Landing.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(Landing);