import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from '@material-ui/core/Button';
import CompareArrowsOutlinedIcon from '@material-ui/icons/CompareArrowsOutlined';
import "./JaxxConfigUpdater.css";

export default class JaxxConfigUpdater extends Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <Grid container style={{flexGrow: 1}} >

        {/* ROW */}
        <Grid container xs={12} spacing={2} style={{ marginBottom: '15px' }}>

          <Grid item xs={6}>
            <Paper className="config-box" elevation={0} square={true} style={{ position: 'relative', height: '52px', padding: '6px' }}>
              <input className="lab-input" placeholder="Lab ID or abbreviation here..." />
              <Button variant="outlined" style={{ position: 'absolute', top: '10px', right: '10px' }}>
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
            <Paper className="config-box" elevation={0} square={true}>
              <Grid container>
                <Grid item xs={12} style={{ position: 'relative' }}>
                  <Typography className="easy-font" style={{ fontFamily: 'Open Sans', fontSize: '15px', padding: '15px' }}>
                    Old Config
                  </Typography>
                  <Divider></Divider>
                </Grid>
                <Grid item xs={12} style={{ minHeight: '200px' }}>
                  <textarea className="config-textarea simple-scrollbar" placeholder="Jaxx config here..."></textarea>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* NEW CONFIG */}
          <Grid item xs={6}>
            <Paper className="config-box" elevation={0} square={true}>
              <Grid container>
                <Grid item xs={12} style={{ position: 'relative' }}>
                  <Typography className="easy-font" style={{ fontFamily: 'Open Sans', fontSize: '15px', padding: '15px' }}>
                    New Config
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

          {/* UPDATED CONFIG */}
          <Grid item xs={8}>
            <Paper className="config-box" elevation={0} square={true}>
              <Grid container>
                <Grid item xs={12} style={{ position: 'relative' }}>
                  <Typography className="easy-font" style={{ fontFamily: 'Open Sans', fontSize: '15px', padding: '15px' }}>
                    Test Package Editor
                  </Typography>
                  <Divider></Divider>
                </Grid>
                <Grid item xs={12} style={{ minHeight: '200px' }}>
                  
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* DIFF */}
          <Grid item xs={4}>
            <Paper className="config-box" elevation={0} square={true}>
              <Grid container>
                <Grid item xs={12} style={{ position: 'relative' }}>
                  <Typography className="easy-font" style={{ fontFamily: 'Open Sans', fontSize: '15px', padding: '15px' }}>
                    Diff
                  </Typography>
                  <Divider></Divider>
                </Grid>
                <Grid item xs={12} style={{ minHeight: '200px' }}>
                  
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          

        </Grid>       

      </Grid>
    );
  }
}