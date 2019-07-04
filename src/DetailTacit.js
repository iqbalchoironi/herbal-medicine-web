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

import { Editor, EditorState, convertFromRaw } from "draft-js";
class DetailTacit extends Component {
  state = {
    content: null,
    datePublish: null,
    file: null,
    title: null,
    loading: true
  }

  async componentDidMount(){
    const {id} = this.props.match.params;
    const url = '/jamu/api/tacit/get/' + id;
    const res = await Axios.get(url);
    let data = await res.data.data;
    let content = await JSON.parse(data.content)
    const contentState = await convertFromRaw(content);
    const editorState = await EditorState.createWithContent(contentState);
    this.setState({
      content: editorState,
      datePublish: data.datePublish,
      file: data.file,
      title: data.title,
      loading: false
    })
  }

  getFile (e){
    console.log(e.target.dataset.value)
    let doc = e.target.dataset.value
    Axios.get(`/jamu/api/explicit/file/`+e.target.dataset.value)
   .then((response) => {
        FileDownload(response.data, doc);
   });
  }

  render(){
    console.log(this.state)
    
    if (this.state.loading) {
      return <div><br></br><br></br> <br></br>loading...</div>;
    }
    return(
        <Paper style={{
            width:"90%",
            margin:"auto",
            marginTop:"70px",
            marginBottom: "10px",
            padding: "30px"
          }}>
           <Typography variant="headline" gutterBottom>
              {this.state.title}
          </Typography>
            <Typography variant="caption" gutterBottom>
              <DateRange /> {this.state.datePublish}
            </Typography>
            {/* <Typography variant="body1" gutterBottom align="justify">
              {this.state.show.content}
            </Typography> */}
            <Editor editorState={this.state.content} readOnly={true} />
            <Typography variant="caption" gutterBottom>
               {this.state.reference}
            </Typography>
            </Paper>
    );
  }
}

export default DetailTacit;