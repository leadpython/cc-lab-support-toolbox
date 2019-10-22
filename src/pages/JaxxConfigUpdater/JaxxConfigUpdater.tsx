import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from '@material-ui/core/Button';
import CompareArrowsOutlinedIcon from '@material-ui/icons/CompareArrowsOutlined';
import "./JaxxConfigUpdater.css";

import axios from 'axios';

interface State {
  lab: string,
  oldConfig: string,
  internalConfig: string
}

export default class JaxxConfigUpdater extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      lab: '',
      oldConfig: '',
      internalConfig: ''
    }
  }
  handleLabInputChange(e: any) {
    this.setState({lab: e.target.value})
  }
  handleOldConfigChange(e: any) {
    this.setState({oldConfig: e.target.value})
  }
  handleGetConfig() {
    const self = this;
    if (self.state.lab.length <= 0) {
      return;
    }
    axios.get(`/api/get-lab-config?lab=${this.state.lab}`).then((response) => {
      self.setState({oldConfig: JSON.stringify(response.data.data)});
    });
  }
  render() {
    return (
      <Grid container style={{flexGrow: 1}} >

        {/* ROW */}
        <Grid container xs={12} spacing={2} style={{ marginBottom: '15px' }}>

          <Grid item xs={6}>
            <Paper className="config-box" elevation={6} square={true} style={{ position: 'relative', height: '52px', padding: '6px' }}>
              <input onChange={(e) => this.handleLabInputChange(e)} className="lab-input" placeholder="Lab ID or abbreviation here..." />
              <Button variant="outlined" style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={() => this.handleGetConfig()}>
                <Typography className="easy-font" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                  Get
                </Typography>
              </Button>
            </Paper>
          </Grid>
          
        </Grid>

        {/* ROW */}
        <Grid container xs={12} spacing={2} style={{ marginBottom: '15px' }}>

          {/* OLD CONFIG */}
          <Grid item xs={6}>
            <Paper className="config-box" elevation={6} square={true}>
              <Grid container>
                <Grid item xs={12} style={{ position: 'relative' }}>
                  <Typography className="easy-font" style={{ fontFamily: 'Open Sans', fontSize: '15px', padding: '15px' }}>
                    Old Config
                  </Typography>
                  <Divider></Divider>
                </Grid>
                <Grid item xs={12} style={{ minHeight: '200px' }}>
                  <textarea onChange={(e) => this.handleOldConfigChange(e)} className="config-textarea simple-scrollbar" placeholder="Jaxx config here...">{this.state.oldConfig}</textarea>
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
                    Internal.CC Config
                  </Typography>
                  <Divider></Divider>
                </Grid>
                <Grid item xs={12} style={{ minHeight: '200px' }}>
                  <textarea className="config-textarea simple-scrollbar" placeholder="Jaxx config here..."></textarea>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          
        </Grid>

        {/* ROW */}
        <Grid container xs={12} spacing={2} style={{ marginBottom: '15px' }}>

          <Grid item xs={6}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<CompareArrowsOutlinedIcon />}
            >
              <Typography style={{ fontFamily: 'Open Sans', fontSize: '15px' }}>
                COMBINE
              </Typography>
            </Button>
          </Grid>
          
        </Grid>

        {/* ROW */}
        <Grid container xs={12} spacing={2} style={{ marginBottom: '15px' }}>

          {/* TEST PACKAGE EDITOR */}
          <Grid item xs={8}>
            <Paper className="config-box" elevation={6} square={true}>
              <Grid container>
                <Grid item xs={12} style={{ position: 'relative' }}>
                  <Typography className="easy-font" style={{ fontFamily: 'Open Sans', fontSize: '15px', padding: '15px' }}>
                    Test Package Editor
                  </Typography>
                  <Divider></Divider>
                </Grid>
                <Grid item xs={12} className="simple-scrollbar" style={{ minHeight: '0px', maxHeight: '50vh', background: '#272821', overflowY: 'auto' }}>

                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Page Priority */}
          <Grid item xs={4}>
            <Paper className="config-box" elevation={6} square={true}>
              <Grid container>
                <Grid item xs={12} style={{ position: 'relative' }}>
                  <Typography className="easy-font" style={{ fontFamily: 'Open Sans', fontSize: '15px', padding: '15px' }}>
                    Page Priority
                  </Typography>
                  <Divider></Divider>
                </Grid>
                <Grid item xs={12} className="simple-scrollbar" style={{ minHeight: '0px', maxHeight: '50vh', background: '#272821' }}>
                  
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          
        </Grid>  

        {/* ROW */}
        <Grid container xs={3} spacing={2} style={{ marginBottom: '15px' }}>

          {/* UPDATED CONFIG */}
          <Grid item xs={12}>
            <Paper className="config-box" elevation={6} square={true}>
              <Grid container>
                <Grid item xs={12} style={{ position: 'relative' }}>
                  <Typography className="easy-font" style={{ fontFamily: 'Open Sans', fontSize: '15px', padding: '15px' }}>
                    Updated Config
                  </Typography>
                  <Button variant="outlined" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <Typography className="easy-font" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                      COPY
                    </Typography>
                  </Button>
                  <Divider></Divider>
                </Grid>
                <Grid item xs={12} style={{ height: '70px' }}>
                  <textarea className="config-textarea simple-scrollbar"></textarea>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          
        </Grid>        

      </Grid>
    );
  }
}