import React, { Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Axios from "axios";

import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton'
import ButtonCard from './ButtonCard'

import CardHerbMed from './CardHerbMed'
import Card from './card'


import FormControl from '@material-ui/core/FormControl';


import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Person from '@material-ui/icons/Person';
import CollectionsBookmark from '@material-ui/icons/CollectionsBookmark'
import DateRange from '@material-ui/icons/DateRange'

import Footer from './Footer'

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

  function ListExplicit (props) {
    return (
        <div style={{
            marginTop: "0",
            marginBottom: "26px",
            maxWidth: "80%"
        }}> 
        <Typography variant="subtitle1">
        <Link style={{ 
          textDecoration: 'none'
          }} to={`/explicit/${ props.id }`}>
            {props.title}
        </Link>
        </Typography>
        <Typography variant="caption" >
             <Person /> {props.name}
        </Typography >
        <Typography variant="caption" >
             <CollectionsBookmark /> Conference paper <DateRange /> 12-12-2001
        </Typography>
        <p style={{
          marginBlockStart: "5px",
          fontFamily: "arial,sans-serif",
          fontSize: "small"
        }} className="block-with-text">
            {props.abstract}
        </p>
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


class Landing extends Component{
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
    // const url = '/jamu/api/herbsmed/search';
    // let axiosConfig = {
    //   headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   };
    // const res =  await Axios.get(url,{
    //   params: {
    //     search: this.state.inputSearch
    //   }
    // },axiosConfig);
    // const { data } = await res;
    // let newData = data.data;
    // console.log(newData)
    // this.setState({
    //   onSearch: newData, 
    //   loadData: false
    // })

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
          search: this.state.inputSearch
        }
      },axiosConfig);
      const dataHerbsMed = await resHerbsMed.data.data;
      console.log(dataHerbsMed)

      const UrlTacit = '/jamu/api/tacit/search/sort/';
      const resTacit  =  await Axios.get(UrlTacit,{
        params: {
          search: this.state.inputSearch
        }
      },axiosConfig);
      const dataTacit = await resTacit.data.data;
      console.log(dataTacit)

      const urlExplicit = '/jamu/api/explicit/search/sort/';
      const resExplicit  =  await Axios.get(urlExplicit,{
        params: {
          search: this.state.inputSearch
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

    render (){
      const { classes } = this.props;
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
      }]

      return (
        <div>
          { this.state.onSearch ? 
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
                        <InputBase className={classes.input} name="inputSearch" value={this.state.inputSearch} onChange={this.handleInputChange} placeholder="Search here..." />
                        <IconButton className={classes.iconButton} onClick={this.getDataSearch} aria-label="Search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                  
                    
                </div>

                {
                  this.state.herbsmed === [] ?
                  null
                  :
                  <div className="for-card">
                    {this.state.herbsmed.map(item =>
                              <CardHerbMed key={item.idherbsmed} id={item.idherbsmed} name={item.name} efficacy={item.efficacy} reff={item.refCrude}/>
                    )}
                  </div>
                }

                {
                  this.state.plan === [] ?
                  null
                  :
                  <div className="for-card">
                    {this.state.plan.map(item =>
                              <Card key={item.id} name={item.sname} image={item.refimg} reff={item.refCrude} />
                            )}
                  </div>
                }
              
                  <div style={{
                    display:"flex",
                    margin:"auto",
                    // border:"hsl(0,0%,80%) 1px solid",
                    width:"90%",
                    marginBottom: "10px"
                    }}>
                      {this.state.explicit.map(item =>
                        <ListExplicit key={item._id} id={item._id} name={item.firstName+' '+item.lastName} title={item.title} abstract={item.abstract} />
                      )}
                  </div>
                  
                  <div style={{
                    display:"flex",
                    margin:"auto",
                    // border:"hsl(0,0%,80%) 1px solid",
                    width:"90%",
                    marginBottom: "10px"
                    }}>
                      {this.state.tacit.map(item =>
                        <ListTacit key={item._id} id={item._id} name={item.firstName+' '+item.lastName} title={item.title} abstract={item.abstract} />
                      )} 
                    </div>
          </div>
          :
          <div style={{
            display:"flex",
            flexDirection:"column"
            }}>
                <div style={{
                    width: "100%",
                    height:"500px",
                    display: "flex",
                    justifyContent : "center",
                    alignItems : "center",
                    backgroundImage: `url(/asset/bg-search.png)`,
                    backgroundSize: 'cover'
                    
                }}>
                    <Paper className={classes.root} elevation={1}>
                    <FormControl className={classes.margin}>
                    {/* <InputLabel htmlFor="age-customized-native-simple" className={classes.bootstrapFormLabel}>
                        Age
                    </InputLabel> */}
                    {/* <NativeSelect
                        // value={this.state.age}
                        // onChange={this.handleChange}
                        input={<BootstrapInput name="age" id="age-customized-native-simple" />}
                    >
                        <option value="All">All</option>
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                    </NativeSelect> */}
                    </FormControl>
                        <InputBase className={classes.input} name="inputSearch" value={this.state.inputSearch} onChange={this.handleInputChange} placeholder="Search here..." />
                        <IconButton className={classes.iconButton} onClick={this.getDataSearch} aria-label="Search">
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

                {/* <div style={{
                    width: "100%",
                    height:"300px",
                    display: "flex",
                    justifyContent : "center",
                    alignItems : "center",
                    backgroundColor: "grey"
                    
                }}>
                </div> */}

                {/* footer */}
                <Footer />
            </div>
          }
        </div>
      )
    }
        
    }

Landing.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(Landing);