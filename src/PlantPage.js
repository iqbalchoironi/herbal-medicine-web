import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Axios from "axios";

import Spinner from './Spinner'
import Card from './card'

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';

import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton'

import SnackBar from './SnackBar'
import ErorPage from './ErorPage'

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

class Plant extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          loadData: false,
          inputSearch: '',
          plans : [],
          onSearch : false,
          currentPage: 1,
          snackbar: {
            open: false,
            success: false,
            message: '',
          }
        }
        this.onScroll = this.onScroll.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getDataSearch = this.getDataSearch.bind(this);
        this.afterUpdate = this.afterUpdate.bind(this);
        this.closeBtn = this.closeBtn.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
      }

      async componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
        this.getData();
      }

      handleKeyDown (event) {
        if (event.key === 'Enter') {
          this.getDataSearch(event)
        }
      }

      async onScroll() {
        if (
          (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
          !this.props.isLoading && this.state.onSearch === false
        ){
          // Do awesome stuff like loading more content!
          await this.setState({
            loadData: true,
            currentPage: this.state.currentPage + 1
          })
          this.getData();
        }
      };
      
     async getData(){
      try {const url = '/jamu/api/plant/pages/' + this.state.currentPage;
      const res = await Axios.get(url);
      const { data } = await res;
      let newData = this.state.plans.concat(data.data);
      this.afterUpdate(data.success, data.message);
      this.setState({
        plans: newData, 
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

    async getDataSearch(event){
     try { console.log(this.state.inputSearch)
      this.setState({
        loading: true,
        onSearch: true
      })
      const url = '/jamu/api/plant/search';
      let axiosConfig = {
        headers: {
            'Content-Type': 'application/json'
          }
        };
      const res =  await Axios.get(url,{
        params: {
          search: this.state.inputSearch
        }
      },axiosConfig);
      const { data } = await res;
      let newData = data.data;
      console.log(newData)
      this.afterUpdate(data.success, data.message);
      this.setState({
        plans: newData, 
        loading: false
      })}catch (err){
        console.log(err.message)
        this.afterUpdate(false, err.message);
        this.setState({
          onEror: true,
          loading: false
        })
      }
      event.preventDefault();
    }

    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
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
                  <Link color="inherit" href="/" >
                    KMS Jamu
                  </Link>
                  <Link color="inherit" >
                    Explore
                  </Link>
                  <Typography color="textPrimary">Plant</Typography>
                </Breadcrumbs>
              </div>
              <div style={{
                width:"50%",
                display:"flex",
                flexDirection:"row-reverse"
              }}>
                 <Paper className={classes.root} elevation={1}>
                        <InputBase className={classes.input} name="inputSearch" value={this.state.inputSearch} onChange={this.handleInputChange} onKeyDown={this.handleKeyDown} placeholder="Search here..." />
                        <IconButton className={classes.iconButton} onClick={this.getDataSearch} aria-label="Search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>  
              </div>
              </div>
              {
                this.state.onEror ? <ErorPage />
                :
              this.state.loading ?
              <Spinner />
              :  
              <div className="for-card">
                {
                   this.state.plans.map(item =>
                        <Card key={item.id} id={item.idplant} name={item.sname} image={item.refimg} reff={item.refCrude} />
                      ) 
                }
              </div>
              }
              {this.state.snackbar.open === true ? <SnackBar data={this.state.snackbar} close={this.closeBtn}/>
              : 
              null
              }
              
            </div>
        );
      }
}

export default withStyles(styles)(Plant);