import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import "./MultiConfigUpdater.css";
import axios from 'axios';

interface State {
  labs: string,
  diffs: any,
  isLoading: boolean
}


export default class MultiConfigUpdater extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      labs: '',
      diffs: {},
      isLoading: false
    }
  }
  updateLabList(e: any) {
    this.setState({labs: e.target.value})
  }
  updateJaxxConfigs() {
    let labs = this.state.labs || ''
    let session = localStorage.getItem('cc_session')
    this.setState({ isLoading: true })
    axios.post('/api/update-jaxx-configs', { labs, session }).then(response => {
      let diffs = response.data
      this.setState({ diffs, isLoading: false })
    })
  }
  renderDiffs() {
    let diffs = this.state.diffs
    let diffComponents = [];
    let renderTpDiff = (tpDiff: any) => {
      return (
        <div className="easy-font" style={{display: 'block', fontWeight: 'normal', fontFamily: 'Open Sans', fontSize: '11px', padding: '0px', marginLeft: '15px' }}>
          <div>Added: {tpDiff.added.join(', ')}</div>
          <div>Removed: {tpDiff.removed.join(', ')}</div>
        </div>
      )
    }
    let renderlabDiff = (labDiff: any) => {
      let labDiffComponents: any[] = []
      let labs = Object.keys(labDiff).sort()
      for (let i = 0; i < labs.length; i++) {
        let id = labs[i]
        let tpDiff = labDiff[id].diff
        if (labDiff[id].new) {
          labDiffComponents.push(<div  className="easy-font" style={{ display: 'block', fontWeight: 'normal', fontFamily: 'Open Sans', fontSize: '11px', padding: '0px', marginLeft: '15px' }}>
            {id} - NEW
          </div>)
        } else if (tpDiff.removed.length > 0 || tpDiff.added.length > 0) {
          labDiffComponents.push(<div  className="easy-font" style={{ display: 'block', fontWeight: 'normal', fontFamily: 'Open Sans', fontSize: '11px', padding: '0px', marginLeft: '15px' }}>
            <div>{id}</div>
            <div>{renderTpDiff(tpDiff)}</div>
          </div>)
        }
      }
      return labDiffComponents;
    }
    for (let lab in diffs) {
      diffComponents.push(
        <div  className="easy-font" style={{ background: 'rgba(225,225,225,0.75)', display: 'block', fontWeight: 'normal', fontFamily: 'Open Sans', fontSize: '11px', padding: '5px', marginBottom: '5px' }}>
            <div style={{ fontWeight: 'bold' }}>{lab.toUpperCase()}</div>
            <div>{renderlabDiff(diffs[lab])}</div>
        </div>
      )
    }
    return diffComponents
  }
  render() {
    return (
      <div style={{ height: '100%' }}>

        <Grid container spacing={2} style={{ marginBottom: '15px' }}>

          <Grid item xs={12}>
            <Paper className="config-box" elevation={0} square={true} style={{ position: 'relative', height: '52px', padding: '5px' }}>
              <input onChange={(e) => this.updateLabList(e)} onSubmit={() => { this.updateJaxxConfigs() }} className="lab-input" placeholder="Lab abbreviations here..." />
              <Button onClick={() => { this.updateJaxxConfigs() }} variant="outlined" style={{ position: 'absolute', top: '10px', right: '10px', borderRadius: '0px' }}>
                <Typography className="easy-font" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                  UPDATE LAB TEST PACKAGES
                </Typography>
              </Button>
            </Paper>
          </Grid>

        </Grid>
        
        <div style={{ display: (this.state.isLoading ? 'none' : 'block'), border: '1px solid rgba(200,200,200,0.5)', padding: '5px' }}>
          {this.renderDiffs()}
        </div>

        <div style={{ display: (this.state.isLoading ? 'flex' : 'none') }} className="spinner-container">
          <div className="loading-spinner">
          </div>
        </div>

      </div>
    );
  }
}