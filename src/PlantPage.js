import React, { Component } from 'react'
import Axios from "axios";

import CardExample from './card'
import SearchInput from './SearchInput'

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';

class Plant extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          loadData: false,
          inputSearch: '',
          plans : [],
          plansOnSearch : [],
          currentPage: 1
        }
        this.onScroll = this.onScroll.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getDataSearch = this.getDataSearch.bind(this);
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
      const url = 'http://ci.apps.cs.ipb.ac.id/jamu/api/plant/pages/' + this.state.currentPage;
      const res = await Axios.get(url);
      const { data } = await res;
      let newData = this.state.plans.concat(data.data);
      this.setState({
        plans: newData, 
        loading: false
      })
    }

    async getDataSearch(event){
      console.log(this.state.inputSearch)
      const url = 'http://ci.apps.cs.ipb.ac.id/jamu/api/plant/search';
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
      let newData = data;
      console.log(newData)
      this.setState({
        plansOnSearch: newData, 
        loading: false
      })
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

      render() {
        if (this.state.loading) {
          return <div><br></br><br></br> <br></br>loading...</div>;
        }
    
        if (!this.state.plans) {
          return <div><br></br><br></br> <br></br>didn't get a person</div>;
        }

        return (
            <div style={{
              display: "flex",
              flexDirection:"column",
              paddingTop:"100px"
            }}>
            <div style={{
                width:"100%",
                display:"flex",
                flexDirection:"row",
                padding:"25px",
                paddingTop:"5px"
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
                <SearchInput />
              </div>
              </div>
              
              <div className="for-card">
                {this.state.plans.map(item =>
                          <CardExample key={item.id} name={item.sname} image={item.refimg} reff={item.refCrude} />
                        )}
                {this.state.loadData ? <div><br></br><br></br> <br></br>loading...</div>
                  : null }
              </div>
            </div>
        );
      }
}

export default Plant;