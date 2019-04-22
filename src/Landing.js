import React, { Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton'

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
                    backgroundColor: "pink"
                    
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
                <div style={{
                    width: "100%",
                    height:"300px",
                    border:"black solid 1px",
                    display: "flex",
                    justifyContent : "center",
                    alignItems : "center",
                    backgroundColor: "#b3ffb3"
                    
                }}>

                </div>
                <div style={{
                    width: "100%",
                    height:"300px",
                    border:"black solid 1px",
                    display: "flex",
                    justifyContent : "center",
                    alignItems : "center",
                    backgroundColor: "#99ccff"
                    
                }}>

                </div>
            </div>
        )
    }

Landing.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(Landing);