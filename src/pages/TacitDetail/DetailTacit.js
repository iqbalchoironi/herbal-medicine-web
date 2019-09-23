import React, { Component } from 'react';
import Axios from 'axios';
import FileDownload from 'js-file-download';

import Paper from '@material-ui/core/Paper';
import DateRange from '@material-ui/icons/DateRange';
import Typography from '@material-ui/core/Typography';

import { Editor, EditorState, convertFromRaw } from 'draft-js';
import Spinner from '../../components/Spinner/Spinner';

import SnackBar from '../../components/snackbar/SnackBar';
import ErorPage from '../ErrorPage/ErorPage';

class DetailTacit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
      datePublish: null,
      file: null,
      title: null,
      loading: true,
      snackbar: {
        open: false,
        success: false,
        message: ''
      }
    };
    this.afterUpdate = this.afterUpdate.bind(this);
    this.closeBtn = this.closeBtn.bind(this);
  }

  async componentDidMount() {
    try {
      const { id } = this.props.match.params;
      const url = '/jamu/api/tacit/get/' + id;
      const res = await Axios.get(url);
      let data = await res.data.data;
      let content = await JSON.parse(data.content);
      const contentState = await convertFromRaw(content);
      const editorState = await EditorState.createWithContent(contentState);
      this.afterUpdate(res.data.success, res.data.message);
      this.setState({
        content: editorState,
        datePublish: data.datePublish,
        file: data.file,
        title: data.title,
        loading: false
      });
    } catch (err) {
      this.afterUpdate(false, err.message);
      this.setState({
        onEror: true,
        loading: false
      });
    }
  }

  getFile(e) {
    let doc = e.target.dataset.value;
    Axios.get(`/jamu/api/explicit/file/` + e.target.dataset.value).then(
      response => {
        FileDownload(response.data, doc);
      }
    );
  }

  async afterUpdate(success, message) {
    this.setState({
      snackbar: {
        open: true,
        success: success,
        message: message
      }
    });
  }

  closeBtn() {
    this.setState({
      snackbar: {
        open: false,
        success: false,
        message: ''
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.onEror ? (
          <ErorPage />
        ) : this.state.loading ? (
          <Spinner />
        ) : (
          <Paper
            style={{
              width: '70%',
              margin: 'auto',
              marginTop: '30px',
              marginBottom: '10px',
              padding: '30px',
              backgroundColor: 'rgba(255, 255, 255, 1)'
            }}
          >
            <h1
              style={{
                textAlign: 'center'
              }}
            >
              {this.state.title}
            </h1>
            <h5>
              <DateRange /> {this.state.datePublish}
            </h5>
            {/* <Typography variant="body1" gutterBottom align="justify">
              {this.state.show.content}
            </Typography> */}
            <Editor editorState={this.state.content} readOnly={true} />
            <Typography variant="caption" gutterBottom>
              {this.state.reference}
            </Typography>
          </Paper>
        )}
        {this.state.snackbar.open === true ? (
          <SnackBar data={this.state.snackbar} close={this.closeBtn} />
        ) : null}
      </div>
    );
  }
}

export default DetailTacit;
