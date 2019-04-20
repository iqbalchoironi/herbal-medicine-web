import React, {Component} from 'react';
import Axios from 'axios'
import FileDownload from 'js-file-download'

import Paper from '@material-ui/core/Paper'
import SaveAlt from '@material-ui/icons/SaveAlt';
import Person from '@material-ui/icons/Person';
import CollectionsBookmark from '@material-ui/icons/CollectionsBookmark'
import DateRange from '@material-ui/icons/DateRange'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class DetailExplicit extends Component {
  state = {
    show : null,
    loading: true
  }

  async componentDidMount(){
    const {id} = this.props.match.params;
    const url = 'http://ci.apps.cs.ipb.ac.id/jamu/api/explicit/get/' + id;
    const res = await Axios.get(url);
    const { data } = await res;
    this.setState({
      show: data.data,
      loading: false
    })
  }

  getFile (e){
    console.log(e.target.dataset.value)
    let doc = e.target.dataset.value
    Axios.get(`http://ci.apps.cs.ipb.ac.id/jamu/api/explicit/file/`+e.target.dataset.value)
   .then((response) => {
        FileDownload(response.data, doc);
   });
  }

  render(){
    if (this.state.loading) {
      return <div><br></br><br></br> <br></br>loading...</div>;
    }
    return(
        <Paper style={{
            width:"90%",
            margin:"auto",
            marginTop:"20px",
            marginBottom: "10px",
            padding: "30px"
          }}>
           <Typography variant="headline" gutterBottom>
              {this.state.show.title}
          </Typography>
            <Typography variant="caption" gutterBottom>
             <Person /> {this.state.show.firstName+" "+this.state.show.lastName}
            </Typography >
            <Typography variant="caption" gutterBottom>
             <CollectionsBookmark /> Conference paper <DateRange /> 12-12-2001
            </Typography>
            <Button data-value={this.state.show.doc} onClick={this.getFile} style={{marginTop:"10px",marginBottom:"10px"}} variant="raised" size="large" color="default" gutterBottom>
            <Typography variant="caption" gutterBottom>
              <SaveAlt />
                Download
            </Typography>
            </Button>
            <Typography variant="title" gutterBottom>
              Abstrak
            </Typography>
            <Typography variant="body1" gutterBottom align="justify">
              {this.state.show.abstract}
            </Typography>
            </Paper>
    );
  }
}

export default DetailExplicit;