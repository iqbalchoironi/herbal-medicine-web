import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Axios from "axios";

import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton'

import CardHerbMed from './CardHerbMed'
import Card from './card'
import Icon from "@material-ui/core/Icon";

import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Person from '@material-ui/icons/Person';
import CollectionsBookmark from '@material-ui/icons/CollectionsBookmark'
import DateRange from '@material-ui/icons/DateRange'
import Divider from '@material-ui/core/Divider';

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


function ListExplicit (props) {
    return (
        <div style={{
            marginTop: "0",
            marginBottom: "26px",
            maxWidth: "85%"
        }}> 
        <h1 style={{
          color: "#0071bc",
          fontWeight: "500",
          fontSize: "1.5em"
        }}>
        {/* <Link style={{ 
          textDecoration: 'none'
          }} to={`/explicit/${ props.id }`}>
            {props.title}
        </Link> */}
          {props.title}
        </h1>
        <Typography variant="caption" >
             <Person /> {props.name}
        </Typography >
        <Typography variant="caption" >
             <CollectionsBookmark /> Conference paper <DateRange /> 12-12-2001
        </Typography>
        <p className="block-with-text">
            {props.abstract}
        </p>
        <Button href={`/explicit/${ props.id }`} >
          Read More <Icon>chevron_right_rounded</Icon>
        </Button>
        <Divider light />
       </div>
    )
  }
  
  function ListTacit (props) {
    return (
        <div style={{
            marginTop: "25px"
        }}> 
        <Typography variant="subtitle1" style={{
            color: "#1976d8"
        }}>
        <Link to={`/tacit/${ props.id }`}>
            {props.title}
        </Link>
        </Typography>
        <Typography variant="caption" >
             <Person /> {props.name}
        </Typography >
        <Typography variant="caption" >
             <CollectionsBookmark /> Conference paper <DateRange /> 12-12-2001
        </Typography>
        <p className="block-with-text">
            {props.abstract}
        </p>
       </div>
    )
  }

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          onSearch: false,
          inputSearch:'',
          plan:[],
          herbsmed:[],
          tacit:[],
          explicit:[]
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getDataSearch = this.getDataSearch.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
      }

      async componentDidMount() {
        const {query} = this.props.match.params;
        await this.setState({
            inputSearch : query
        })
          this.getDataSearch();
      }

      handleKeyDown (event) {
        if (event.key === 'Enter') {
          window.location.href = `/search/${ this.state.inputSearch }`;
        }
      }
    
      handleInputChange(event) {
    
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
        console.log(this.state.inputSearch)
      }
    
      async getDataSearch(){
        
        this.setState({
          loadData: true,
          onSearch: true,
        })

        const urlSearchPlant = '/jamu/api/plant/search';
        let axiosConfig = {
          headers: {
              'Content-Type': 'application/json'
            }
          };
        const resPlant =  await Axios.get(urlSearchPlant,{
          params: {
            search: this.state.inputSearch
          }
        },axiosConfig);
        const dataPlant = await resPlant.data.data;
        console.log(dataPlant)
    
        const urlSearchHerbsMed = '/jamu/api/herbsmed/search';
          const resHerbsMed  =  await Axios.get(urlSearchHerbsMed,{
            params: {
              search:  this.state.inputSearch
            }
          },axiosConfig);
          const dataHerbsMed = await resHerbsMed.data.data;
          console.log(dataHerbsMed)
    
          const UrlTacit = '/jamu/api/tacit/search/sort/';
          const resTacit  =  await Axios.get(UrlTacit,{
            params: {
              search:  this.state.inputSearch
            }
          },axiosConfig);
          const dataTacit = await resTacit.data.data;
          console.log(dataTacit)
    
          const urlExplicit = '/jamu/api/explicit/search/sort/';
          const resExplicit  =  await Axios.get(urlExplicit,{
            params: {
              search:  this.state.inputSearch
            }
          },axiosConfig);
          const dataExplicit = await resExplicit.data.data;
          console.log(dataExplicit)
    
          this.setState({
            plan: dataPlant,
            herbsmed: dataHerbsMed,
            tacit: dataTacit,
            explicit: dataExplicit
          })
      }
    
      render () {
        const { classes } = this.props;

          return (
            <div style={{
                display:"flex",
                flexDirection:"column"
                }}>
                 <div style={{
                        marginTop: "60px",
                        width: "100%",
                        height:"150px",
                        display: "flex",
                        justifyContent : "center",
                        alignItems : "center",
                        backgroundColor: "#a9ba9d"
                        
                    }}>
                        <Paper className={classes.root} elevation={1}>
                            <InputBase className={classes.input} name="inputSearch" value={this.state.inputSearch} onChange={this.handleInputChange} onKeyDown={this.handleKeyDown} placeholder="Search here..." />
                            <IconButton className={classes.iconButton} href={`/search/${ this.state.inputSearch }`}  aria-label="Search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                      
                        
                    </div>
    
                    
                      {
                        this.state.herbsmed.length === 0 ?
                        null
                        :
                        <div style= {{
                          display:"flex",
                          padding:"20px"
                       }}>
                         <label
                         style={{
                           color: "grey",
                           fontSize : "14px",
                           width:"7%",
                         }}>Herbal Medicine</label>
                        <div  style={{
                          width: "90%",
                          margin: "auto",
                          marginTop: "9px",
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fill, minmax(16rem, 1fr))",
                          gridGap: "2rem",
                          borderLeft: "2px solid grey",
                          padding : "10px",
                          backgroundColor:"#f8f8f8"
                        }}>
                          {this.state.herbsmed.map(item =>
                                    <CardHerbMed key={item.idherbsmed} id={item.idherbsmed} name={item.name} efficacy={item.efficacy} reff={item.refCrude}/>
                          )}
                        </div>
                        </div>
                      }
                    
    
                    
                      
                      {
                        this.state.plan.length === 0 ?
                        null
                        :
                        <div style= {{
                          display:"flex",
                          padding:"20px",
                       }}>
                         <label
                         style={{
                           color: "grey",
                           fontSize : "14px",
                           width:"7%",
                         }}>Plant</label>  
                        <div style={{
                          width: "90%",
                          margin: "auto",
                          marginTop: "9px",
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fill, minmax(16rem, 1fr))",
                          gridGap: "2rem",
                          borderLeft: "2px solid grey",
                          padding : "10px",
                          backgroundColor:"#f8f8f8"
                        }}>
                          {this.state.plan.map(item =>
                                    <Card key={item.id} name={item.sname} image={item.refimg} reff={item.refCrude} />
                                  )}
                        </div>
                        </div>
                      }
                    
                    
                   
                    
                    
                      
                      {
                        this.state.explicit.length === 0 ?
                        null
                        :
                        <div style= {{
                          display:"flex",
                          padding:"20px"
                       }}>
                         <label
                         style={{
                           color: "grey",
                           fontSize : "14px",
                           width:"7%",
                         }}>Explicit Knowledge</label>  
                        <div style={{
                          display:"flex",
                          margin:"auto",
                          borderLeft: "2px solid grey",
                          width:"90%",
                          marginBottom: "10px",
                          padding : "10px",
                          backgroundColor:"#f8f8f8"
                          }}>
                            {this.state.explicit.map(item =>
                              <ListExplicit key={item._id} id={item._id} name={item.firstName+' '+item.lastName} title={item.title} abstract={item.abstract} />
                            )}
                        </div>
                        </div>
                      }
                    
    
                  
                      
                      {
                        this.state.tacit.length === 0 ?
                        null
                        :
                        <div style= {{
                          display:"flex",
                          padding:"20px"
                       }}>
                         <label
                         style={{
                           color: "grey",
                           fontSize : "14px",
                           width:"7%",
                         }}>Tacit Knowledge</label>  
                        <div style={{
                          display:"flex",
                          margin:"auto",
                          borderLeft: "2px solid grey",
                          width:"90%",
                          marginBottom: "10px",
                          padding : "10px",
                          backgroundColor:"#f8f8f8"
                          }}>
                            {this.state.tacit.map(item =>
                            <ListTacit key={item._id} id={item._id} name={item.firstName+' '+item.lastName} title={item.title} abstract={item.abstract} />
                          )} 
                        </div>
                        </div>
                      }
                    
              </div>
          )
      }
}

SearchPage.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(SearchPage);