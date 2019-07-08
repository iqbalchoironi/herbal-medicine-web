import React, { Component } from 'react'
import Axios from "axios";

import CardHerbMed from './CardHerbMed'
import SearchInput from './SearchInput'
import Spinner from './Spinner'

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';

import SnackBar from './SnackBar'
import ErorPage from './ErorPage'

class HerbMeds extends Component {
    constructor(props) {
        super(props);
        this.state = {
          onEror: false,
          loading: true,
          loadData: false,
          inputSearch: '',
          onSearch:[],
          herbmeds : [],
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
      }

      async componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
        this.getData();
      }

      async onScroll() {
        if (
          (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
          !this.props.isLoading
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
      try {
        const url = '/jamu/api/herbsmed/pages/' + this.state.currentPage;
        const res = await Axios.get(url);
        const { data } = await res;
        let newData = this.state.herbmeds.concat(data.data);
        console.log(res)
        this.afterUpdate(data.success, data.message);
        this.setState({
          herbmeds: newData, 
          loading: false
        })
      } catch (err){
        console.log(err.message)
        this.afterUpdate(false, err.message);
        this.setState({
          onEror: true,
          loading: false
        })
      }
      
    }

    async getDataSearch(){
      console.log(this.state.inputSearch)
      this.setState({
        loadData: true
      })
      const url = '/jamu/api/herbsmed/search';
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
      this.setState({
        onSearch: newData, 
        loadData: false
      })
    }

    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      console.log(value)
      console.log(name)
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
        if(this.state.inputSearch !== '' && this.state.onSearch !== []){
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
                  <Typography color="textPrimary">Herbal Medicine</Typography>
                </Breadcrumbs>
              </div>
              <div style={{
                width:"50%",
                display:"flex",
                flexDirection:"row-reverse"
              }}>
                <SearchInput nameInput="inputSearch" inputValue={this.state.inputSearch} inputChange={this.handleInputChange} clickButton={this.getDataSearch}/>
              </div>
              </div>
              
              <div className="for-card">
                {this.state.onSearch.map(item =>
                           <CardHerbMed key={item.idherbsmed} id={item.idherbsmed} name={item.name} efficacy={item.efficacy} reff={item.refCrude}/>
                 )}
              </div>
            </div>
        );
      }

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
                  <Typography color="textPrimary">Herbal Medicine</Typography>
                </Breadcrumbs>
              </div>
              <div style={{
                width:"50%",
                display:"flex",
                flexDirection:"row-reverse"
              }}>
                <SearchInput nameInput="inputSearch" inputValue={this.state.inputSearch} inputChange={this.handleInputChange} clickButton={this.getDataSearch}/>
              </div>
              </div>
              {
                this.state.onEror ? <ErorPage />
                :
                this.state.loading ?
                <Spinner />
                :
                <div className="for-card">
                  {this.state.herbmeds.map(item =>
                            <CardHerbMed key={item.idherbsmed} id={item.idherbsmed} name={item.name} efficacy={item.efficacy} reff={item.refCrude}/>
                  )}
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

export default HerbMeds;