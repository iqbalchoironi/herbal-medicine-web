import React, { Component } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

import Typography from '@material-ui/core/Typography';

import Person from '@material-ui/icons/Person';
import CollectionsBookmark from '@material-ui/icons/CollectionsBookmark'
import DateRange from '@material-ui/icons/DateRange'

function ListExplicit (props) {
    return (
        <div style={{
            marginTop: "25px"
        }}> 
        <Typography variant="subheading" style={{
            color: "#1976d8"
        }}>
        <Link to={`/explicit/${ props.id }`}>
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


class ExplicitPage extends Component {
      constructor(props) {
        super(props);
        this.state = {
          loading: true,
          loadData: false,
          explicit : [],
          currentPage: 1,
        }
        // this.onScroll = this.onScroll.bind(this);
      }
    
      async componentDidMount() {
        // window.addEventListener('scroll', this.onScroll);
        this.getData();
      }
      
    //   async onScroll() {
    //     if (
    //       window.innerHeight + document.documentElement.scrollTop
    //       === document.documentElement.offsetHeight
    //     ) {
    //       // Do awesome stuff like loading more content!
    //       await this.setState({
    //         loadData: true,
    //         currentPage: this.state.currentPage + 1
    //       })
    //       this.getData();
    //     }
    //   }
      
      async getData(){
        const url = 'http://ci.apps.cs.ipb.ac.id/jamu/api/explicit';
        const res = await Axios.get(url);
        const { data } = await res;
        let newData = this.state.explicit.concat(data.data);
        console.log(newData)
        this.setState({
          explicit: newData, 
          loading: false
        })
      }
    
        logout = event => {
            window.location.href = '/form/explicit';
        }

    render (){
        return (
            <div style={{
                display:"flex",
                flexDirection:"row",
                margin:"auto",
                border:"1px solid black",
                marginTop: "15px",
                width:"90%"
            }}>
                <div style={{
                    width:"20%"
                }}> 

                </div>
                <div style={{
                    width:"70%"
                }}>
                {this.state.explicit.map(item =>
                    <ListExplicit key={item._id} id={item._id} name={item.firstName+' '+item.lastName} title={item.title} abstract={item.abstract} />
                )}
                </div>
            </div>
        );
    }
}

export default ExplicitPage;
