import React, { Component } from 'react';
import Axios from 'axios';
import FileDownload from 'js-file-download';
import moment from 'moment';

import Paper from '@material-ui/core/Paper';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Person from '@material-ui/icons/Person';
import CollectionsBookmark from '@material-ui/icons/CollectionsBookmark';
import DateRange from '@material-ui/icons/DateRange';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Spinner from '../../components/Spinner/Spinner';

import SnackBar from '../../components/snackbar/SnackBar';
import ErorPage from '../ErrorPage/ErorPage';

class DetailExplicit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: null,
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
      const url = '/jamu/api/explicit/get/' + id;
      const res = await Axios.get(url);
      const { data } = await res;
      this.afterUpdate(data.success, data.message);
      this.setState({
        show: data.data,
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

  getFile(file) {
    Axios.get(`/jamu/api/explicit/file/` + file).then(response => {
      FileDownload(response.data, file);
    });
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
              width: '90%',
              margin: 'auto',
              marginTop: '30px',
              marginBottom: '10px',
              padding: '30px',
              backgroundColor: 'rgba(0, 0, 0, 0.05)'
            }}
          >
            <h2
              style={{
                fontWeight: '500',
                lineHeight: '1.1',
                color: '#A5174A'
              }}
            >
              {this.state.show.title}
            </h2>
            <Paper
              style={{
                marginTop: '10px',
                marginBottom: '20px',
                width: '50%',
                padding: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.05)'
              }}
            >
              <Typography display="block" variant="caption" gutterBottom>
                <Person />
                {this.state.show.firstName + ' ' + this.state.show.lastName}
              </Typography>
              <Typography display="block" variant="caption" gutterBottom>
                <CollectionsBookmark /> {this.state.show.publisher}
              </Typography>
              <Typography display="block" variant="caption" gutterBottom>
                <DateRange />
                {moment(this.state.show.datePublish).format('DD/MM/YYYY')}
              </Typography>
            </Paper>
            <Button
              onClick={() => this.getFile(this.state.show.file)}
              variant="contained"
              color="primary"
            >
              <SaveAlt />
              Download
            </Button>
            <h3>Abstrak</h3>
            <Typography variant="body1" gutterBottom align="justify">
              {this.state.show.abstract}
            </Typography>
            <h3>Description</h3>
            <Typography variant="body1" gutterBottom align="justify">
              {this.state.show.abstract}
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

export default DetailExplicit;
