import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import './ImporterHelper.css';

function deepClone(stuff: any) {
  return JSON.parse(JSON.stringify(stuff));
}

interface State {
  headers: string,
  values: string
}

function copyToClipboard() {
  document.execCommand('copy');
}

export default class ImporterHelper extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      headers: '',
      values: ''
    }
  }
  render() {
    return (
      <Grid container style={{flexGrow: 1}} >   

        {/* ROW */}
        <Grid container spacing={2} style={{ marginBottom: '15px' }}>

          {/* OLD CONFIG */}
          <Grid item xs={6}>
            <Paper className="config-box" elevation={6} square={true}>
              <Grid container>
                <Grid item xs={12} style={{ position: 'relative' }}>
                  <Typography className="easy-font" style={{ fontFamily: 'Open Sans', fontSize: '15px', padding: '15px' }}>
                    Headers
                  </Typography>
                  <Divider></Divider>
                </Grid>
                <Grid item xs={12} style={{ minHeight: '200px' }}>
                  <textarea className="config-textarea simple-scrollbar" placeholder="Headers here..." ></textarea>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* NEW CONFIG */}
          <Grid item xs={6}>
            <Paper className="config-box" elevation={6} square={true}>
              <Grid container>
                <Grid item xs={12} style={{ position: 'relative' }}>
                  <Typography className="easy-font" style={{ fontFamily: 'Open Sans', fontSize: '15px', padding: '15px' }}>
                    Values
                  </Typography>
                  <Divider></Divider>
                </Grid>
                <Grid item xs={12} style={{ minHeight: '200px' }}>
                  <textarea className="config-textarea simple-scrollbar" placeholder="Values here..."></textarea>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          
        </Grid>

        {/* ROW */}
        <Grid container spacing={2} style={{ marginBottom: '15px' }}>

          {/* OLD CONFIG */}
          <Grid item xs={6}>
            <Paper className="config-box" elevation={6} square={true}>
              <Grid container>
                <Grid item xs={12} style={{ position: 'relative' }}>
                  <Typography className="easy-font" style={{ fontFamily: 'Open Sans', fontSize: '15px', padding: '15px' }}>
                    Headers
                  </Typography>
                  <Divider></Divider>
                </Grid>
                <Grid item xs={12} style={{ minHeight: '200px' }}>
                  <textarea className="config-textarea simple-scrollbar" placeholder="Headers here..." ></textarea>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          
        </Grid>

      </Grid>
    );
  }
}