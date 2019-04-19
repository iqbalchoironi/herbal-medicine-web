import React, { Component } from 'react';
import Axios from 'axios';

import Select from './components/select';

const List = ({ item }) => {
  if(item.sname !== ''){
    return <li>{item.sname}</li>
  }

  return null;
}
class Compare extends Component {
    constructor(props) {
        super(props);
        // change code below this line
        this.state = {
            loading: true,
            item:[],
            herbsmed: [],
            item1: '',
            item2: '',
            same:[],
            defer: [],
            refCrude1: [],
            refCrude2: [],
            sama: []
        }
        // change code above this line
        this.back = this.back.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      async componentDidMount() {
        this.getData();
      }
      
     async getData(){
      const url = 'http://ci.apps.cs.ipb.ac.id/jamu/api/herbsmed/getlist';
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

    handleChange = event => {
      const {name, value} = event.target
      this.setState({
        [name]: value
      })  
    }

    async handleSubmit(){
      this.setState({
        loading: true
      })
      let res = await Axios.get('http://ci.apps.cs.ipb.ac.id/jamu/api/herbsmed/get/'+ this.state.item1);
      const { data } = await res;
      this.setState({
        item1: data.data
      })

      let refCrude1 = this.state.item1.refCrude;
      let uniq = [];
      refCrude1.forEach(function(itm) {
        var unique = true;
        uniq.forEach(function(itm2) {
            if (itm.idcrude === itm2.idcrude) unique = false;
        });
        if (unique)  uniq.push(itm);
    });

    console.log(uniq)

      console.log(this.state.item2)
      let res1 = await Axios.get('http://ci.apps.cs.ipb.ac.id/jamu/api/herbsmed/get/'+ this.state.item2);
      const data1 = await res1.data;
      this.setState({
        item2: data1.data
      })
      let refCrude2 = this.state.item2.refCrude;
      console.log(refCrude2)
      let uniq1 = [];
      refCrude2.forEach(function(itm) {
        var unique = true;
        uniq1.forEach(function(itm2) {
            if (itm.idcrude === itm2.idcrude) unique = false;
        });
        if (unique)  uniq1.push(itm);
    });
      console.log(uniq1)

      let sama = []
      await uniq.forEach((crud1,i) => {
        uniq1.forEach((crud2,j) => {
          if ( crud1.idcrude === crud2.idcrude) {
            sama.push(crud1);
          }
        })
      })
      
      let beda1 = []
      await uniq.forEach(function(itm) {
        var unique = true;
        sama.forEach(function(itm2) {
            if (itm.idcrude === itm2.idcrude) unique = false;
        });
        if (unique)  beda1.push(itm);
    });

    let beda2 = []
      await uniq1.forEach(function(itm) {
        var unique = true;
        sama.forEach(function(itm2) {
            if (itm.idcrude === itm2.idcrude) unique = false;
        });
        if (unique)  beda2.push(itm);
    });

      console.log(sama)
      console.log(beda1)
      console.log(beda2)

      this.setState({
          sama: sama,
          refCrude1: beda1,
          refCrude2: beda2,
          loading: false
      })  
    }

    back(){
      this.setState({
        sama: [],
        refCrude1: [],
        refCrude2: []
    })  
    }

    render(){
      if (this.state.loading) {
        return <div><br></br><br></br> <br></br>loading...</div>;
      }

      if(this.state.sama.length){
        return(
          <div className="wraper">
            <h3 className="btn-center">Result Compare Herbal Medicine</h3>
            <h5>jamu 1 :</h5>
            <h6>{this.state.item1.name}</h6>
            <p>{this.state.item1.efficacy}</p>
            
            <h5>jamu 2 :</h5>
            <h6>{this.state.item2.name}</h6>
            <p>{this.state.item2.efficacy}</p>


            <ul className="reff">
                 {this.state.sama.map( item => (
                    <List item = { item } />
                ))} 
          </ul>

          <ul className="reff">
                 {this.state.refCrude1.map( item => (
                    <List item = { item } />
                ))} 
          </ul>

          <ul className="reff">
                 {this.state.refCrude2.map( item => (
                    <List item = { item } />
                ))} 
          </ul>

          <button onClick={this.back}>Back</button>
          </div>
        )
      }
        return(
          <div className="wraper">
            <h3 className="btn-center">Compare Herbal Medicine</h3>
  
              <div className="coba1"> 
                <Select options={this.state.item} nameState={'item1'} handleChange={this.handleChange}/>
              </div>
              <div className="coba1">
                <Select options={this.state.item} nameState={'item2'} handleChange={this.handleChange} />
              </div>
              <button className="btn-center" onClick={this.handleSubmit}>Compare</button>
          </div>
        );
    }
}
export default Compare;