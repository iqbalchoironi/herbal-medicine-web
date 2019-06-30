import React, { Component } from 'react';
import Axios from 'axios';

import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Link } from 'react-router-dom'

import Spinner from './Spinner'
import { Paper } from '@material-ui/core';

import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import SearchInput from './SearchInput'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import Location from '@material-ui/icons/LocationOn';

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

class EthnicDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            onDisplay: [],
            ethnic :[],
            detailEthnic: []
        }
      }
    
      async componentDidMount() {
        this.setState({
          loading:true
      })
      let url = '/jamu/api/ethnic/getlist'
      let res = await Axios.get(url);
      let {data} = await res
      this.setState({
        ethnic: data.data
    })
        await this.getDataPlantEthnic();
      }

      async componentWillReceiveProps(){
          this.setState({
            loading:true
          })
          await this.getDataPlantEthnic();
      }

      async getDataPlantEthnic(){
        const {id} = this.props.match.params;
        const urlDetailEthnic = '/jamu/api/ethnic/get/' + id
        
        const resDetailEthnic = await Axios.get(urlDetailEthnic);
        const DetailEthnic = await resDetailEthnic.data.data;
        let plantEthnic = resDetailEthnic.data.data.refPlantethnic.map( async id => {
          let urlPlant = '/jamu/api/plantethnic/get/'+id
          let resPlant = await Axios.get(urlPlant);
          return resPlant.data.data;
        })
        Promise.all(plantEthnic).then((completed) => {
          var result = [];
          completed.forEach(item => {
            var name = item.disease_ina;
            if (!(name in result)) {
              result[name] = [];
              result[name].push(item);
            } else {
              result[name].push(item);
            }
          })
          this.setState({
            detailEthnic: DetailEthnic,
            onDisplay: result,
            loading: false
          })
        })
      }

    render(){
        return (
          <div>
            {this.state.loading ? 
                <Spinner />
                :
            <div style={{
              display: "flex",
              flexDirection:"column",
              paddingTop:"90px"

            }}>
               <div style={{
                width:"90%",
                display:"flex",
                flexDirection:"row",
                margin:"auto"
              }}>
              <div style={{
                width:"50%",
                display:"flex",
                flexDirection:"row"
              }}>
                <Breadcrumbs aria-label="Breadcrumb">
                  <Typography color="textPrimary">
                    KMS Jamu
                  </Typography>
                  <Typography color="textPrimary">
                    Ethnic
                  </Typography>
                  <Typography color="textPrimary">{this.state.detailEthnic.name}</Typography>
                </Breadcrumbs>
              </div>
              <div style={{
                width:"50%",
                display:"flex",
                flexDirection:"row-reverse"
              }}>
                 <SearchInput nameInput="inputSearch" />
              </div>
              </div>
              <Paper style={{
                display:"flex",
                flexDirection:"row",
                margin:"auto",
                marginTop:"10px",
                width:"90%",
                padding: "15px"
            }}>
                <Paper style={{
                    width:"30%",
                    marginRight: "10px"
                }}> 
                <List>
                {this.state.ethnic !== undefined && 
                  this.state.ethnic.map(itm => {
                    return (
                      // <li key={itm._id} id={itm._id} style={{
                      //   color:"grey",
                      //   fontSize:"14px"
                      // }}> <Link to={`/ethnic/${itm._id}`}>ethnic {itm.name}</Link></li>
                      
                        <ListItemLink href={`/ethnic/${itm._id}`}>
                          <ListItemIcon >
                            <Location />
                          </ListItemIcon>
                          <ListItemText style={{
                          padding:"5px"
                        }} primary={`ethnic ${itm.name}`} />
                        </ListItemLink>
                     
                    )
                  })
                }
                 </List>
                </Paper>
                <Paper style={{
                    width:"70%",
                    padding:"25px"
                }}>
                { Object.keys(this.state.onDisplay).map((key, i) => { 
                    return <div>
                    <Typography key={key} variant="title" gutterBottom> {key} :</Typography>
                        <ul>
                        {this.state.onDisplay[key].map((plantethnic) => {
                            return (
                                <ExpansionPanel>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>{plantethnic.name_ina}</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails style={{
                                        display:"flex",
                                        flexDirection:"column"
                                    }}>
                                        <Typography variant="caption" gutterBottom>{plantethnic.name_ina}</Typography> 
                                        <Typography variant="caption" gutterBottom>{plantethnic.disease_ina}</Typography>
                                        <Typography variant="caption" gutterBottom>{plantethnic.disease_ing}</Typography> 
                                        <Typography variant="caption" gutterBottom>{plantethnic.species}</Typography>
                                        <Typography variant="caption" gutterBottom>{plantethnic.family}</Typography>
                                        <Typography variant="caption" gutterBottom>{plantethnic.section_ina}</Typography>
                                        <Typography variant="caption" gutterBottom>{plantethnic.section_ing}</Typography>
                                        
                                        
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            )
                        })}
                        </ul>
                    </div>
                    })  
                }  
                </Paper>
            </Paper>
            </div>
            }
          </div>
        )
    }
}

export default EthnicDetail;