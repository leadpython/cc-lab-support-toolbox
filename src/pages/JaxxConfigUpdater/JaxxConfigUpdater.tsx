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
  oldConfig: any,
  internalConfig: any,
  updatedConfig: any,
  diff: any
}

export default class JaxxConfigUpdater extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      lab: '',
      oldConfig: {
        "additional_files": "default/coa/templates/additional_files",
        "qc": "default/coa/templates/qc",
        "page_priority": [
          "actoh/coa/templates/can-ter-combo",
          "default/coa/templates/pes-mic-sol-hvy-myc",
          "default/coa/templates/ter",
          "default/coa/templates/pes",
          "default/coa/templates/myc"
        ],
        "packages": {
          "34844": {
            "name": "demo",
            "pages": [
              "actoh/coa/templates/can-ter-combo",
              "default/coa/templates/pes-mic-sol-hvy-myc"
            ],
            "test_types": [
              "CAN",
              "TER",
              "HVY",
              "MYC",
              "MIC-R",
              "SOL-R",
              "WA"
            ]
          },
          "35087": {
            "name": "Concentrate Full Bundle",
            "pages": [
              "actoh/coa/templates/can-ter-combo",
              "default/coa/templates/pes-mic-sol-hvy-myc"
            ],
            "test_types": [
              "MYC",
              "TER",
              "SOL-R",
              "MIC-R",
              "HVY",
              "FMI",
              "CAN"
            ]
          },
          "35116": {
            "name": "Potency Only",
            "pages": [
              "actoh/coa/templates/can-ter-combo"
            ],
            "test_types": [
              "FMI",
              "CAN"
            ]
          },
          "35118": {
            "name": "Terpenes Only",
            "pages": [
              "actoh/coa/templates/can-ter-combo"
            ],
            "test_types": [
              "FMI"
            ]
          },
          "35119": {
            "name": "Microbial Only",
            "pages": [
              "actoh/coa/templates/can-ter-combo",
              "default/coa/templates/pes-mic-sol-hvy-myc"
            ],
            "test_types": [
              "FMI",
              "MIC-R"
            ]
          },
          "35120": {
            "name": "Pesticide Only",
            "pages": [
              "actoh/coa/templates/can-ter-combo",
              "default/coa/templates/pes-mic-sol-hvy-myc"
            ],
            "test_types": [
              "FMI",
              "PES-R"
            ]
          },
          "35122": {
            "name": "Mycotoxins Only",
            "pages": [
              "actoh/coa/templates/can-ter-combo",
              "default/coa/templates/pes-mic-sol-hvy-myc"
            ],
            "test_types": [
              "MYC",
              "FMI"
            ]
          },
          "35151": {
            "name": "Residual Solvents Only",
            "pages": [
              "actoh/coa/templates/can-ter-combo",
              "default/coa/templates/pes-mic-sol-hvy-myc"
            ],
            "test_types": [
              "SOL-R"
            ]
          },
          "35152": {
            "name": "Moisture Only",
            "pages": [
              "actoh/coa/templates/can-ter-combo"
            ],
            "test_types": [
              "H20"
            ]
          },
          "35153": {
            "name": "Water Activity Only",
            "pages": [
              "actoh/coa/templates/can-ter-combo"
            ],
            "test_types": [
              "WA"
            ]
          },
          "35963": {
            "name": "Infused Product Full Bundle",
            "pages": [
              "actoh/coa/templates/can-ter-combo",
              "default/coa/templates/pes-mic-sol-hvy-myc"
            ],
            "test_types": [
              "MIC-R",
              "CAN"
            ]
          },
          "36008": {
            "name": "Flower to Processor Bundle",
            "pages": [
              "actoh/coa/templates/can-ter-combo",
              "default/coa/templates/pes-mic-sol-hvy-myc"
            ],
            "test_types": [
              "PES-R",
              "CAN"
            ]
          },
          "37564": {
            "name": "Heavy Metals Only",
            "pages": [
              "default/coa/templates/pes-mic-sol-hvy-myc"
            ],
            "test_types": [
              "HVY"
            ]
          },
          "42256": {
            "name": "Final Infused Product \"Post Test\" - Oil was tested prior",
            "pages": [
              "actoh/coa/templates/can-ter-combo",
              "default/coa/templates/pes-mic-sol-hvy-myc"
            ],
            "test_types": [
              "FMI",
              "MIC-R",
              "CAN"
            ]
          },
          "42257": {
            "name": "Final Infused Product \"Pre Test\" - Oil was not tested Prior",
            "pages": [
              "actoh/coa/templates/can-ter-combo",
              "default/coa/templates/pes-mic-sol-hvy-myc"
            ],
            "test_types": [
              "CAN",
              "HVY",
              "MYC",
              "SOL-R",
              "PES-R",
              "FMI"
            ]
          },
          "42258": {
            "name": "Hydrocarbon / Other Methods Extract",
            "pages": [
              "actoh/coa/templates/can-ter-combo",
              "default/coa/templates/pes-mic-sol-hvy-myc"
            ],
            "test_types": [
              "FMI",
              "PES-R",
              "SOL-R",
              "MYC",
              "HVY",
              "TER",
              "CAN"
            ]
          },
          "42259": {
            "name": "Carbon Dioxide Extract",
            "pages": [
              "actoh/coa/templates/can-ter-combo",
              "default/coa/templates/pes-mic-sol-hvy-myc"
            ],
            "test_types": [
              "TER",
              "PES-R",
              "MYC",
              "HVY",
              "FMI",
              "CAN"
            ]
          },
          "42260": {
            "name": "Other Method Extract",
            "pages": [
              "actoh/coa/templates/can-ter-combo",
              "default/coa/templates/pes-mic-sol-hvy-myc"
            ],
            "test_types": [
              "MIC-R",
              "FMI",
              "PES-R",
              "MYC",
              "HVY",
              "TER",
              "CAN"
            ]
          },
          "45400": {
            "name": "Kief Full Bundle",
            "pages": [
              "actoh/coa/templates/can-ter-combo",
              "default/coa/templates/pes-mic-sol-hvy-myc",
              "default/coa/templates/myc"
            ],
            "test_types": [
              "CAN",
              "TER",
              "HVY",
              "MYC",
              "MIC-R",
              "PES-R",
              "FMI"
            ]
          }
        }
      },
      internalConfig: {
        "additional_files": "default/coa/templates/additional_files",
        "qc": "default/coa/templates/qc",
        "page_priority": [
          "actoh/coa/templates/can-ter-combo",
          "default/coa/templates/pes-mic-sol-hvy-myc",
          "default/coa/templates/ter",
          "default/coa/templates/pes",
          "default/coa/templates/myc"
        ],
        "packages": {
          "34844": {
            "name": "demo",
            "pages": [
              "actoh/coa/templates/can-ter-combo",
              "default/coa/templates/pes-mic-sol-hvy-myc"
            ],
            "test_types": [
              "CAN",
              "TER",
              "HVY",
              "MYC",
              "MIC-R",
              "SOL-R",
              "WA",
              "H20",
              "PES-R",
              "FMI"
            ]
          },
          "35086": {
            "name": "Flower Full Bundle",
            "pages": [
              "actoh/coa/templates/can-ter-combo",
              "default/coa/templates/pes-mic-sol-hvy-myc"
            ],
            "test_types": [
              "CAN",
              "TER",
              "HVY",
              "MYC",
              "PES-R",
              "H20",
              "WA",
              "MIC-R",
              "FMI"
            ]
          },
          "35087": {
            "name": "Concentrate Full Bundle",
            "pages": [
              "actoh/coa/templates/can-ter-combo",
              "default/coa/templates/pes-mic-sol-hvy-myc"
            ],
            "test_types": [
              "MYC",
              "TER",
              "SOL-R",
              "PES-R",
              "MIC-R",
              "HVY",
              "FMI",
              "CAN"
            ]
          },
          "35116": {
            "name": "Potency Only",
            "pages": [
              "actoh/coa/templates/can-ter-combo"
            ],
            "test_types": [
              "FMI",
              "CAN"
            ]
          },
          "35118": {
            "name": "Terpenes Only",
            "pages": [
              "actoh/coa/templates/can-ter-combo"
            ],
            "test_types": [
              "FMI",
              "TER"
            ]
          },
          "35119": {
            "name": "Microbial Only",
            "pages": [
              "actoh/coa/templates/can-ter-combo",
              "default/coa/templates/pes-mic-sol-hvy-myc"
            ],
            "test_types": [
              "FMI",
              "MIC-R"
            ]
          },
          "35120": {
            "name": "Pesticide Only",
            "pages": [
              "actoh/coa/templates/can-ter-combo",
              "default/coa/templates/pes-mic-sol-hvy-myc"
            ],
            "test_types": [
              "FMI",
              "PES-R"
            ]
          },
          "35122": {
            "name": "Mycotoxins Only",
            "pages": [
              "actoh/coa/templates/can-ter-combo",
              "default/coa/templates/pes-mic-sol-hvy-myc"
            ],
            "test_types": [
              "MYC",
              "FMI"
            ]
          },
          "35151": {
            "name": "Residual Solvents Only",
            "pages": [
              "actoh/coa/templates/can-ter-combo",
              "default/coa/templates/pes-mic-sol-hvy-myc"
            ],
            "test_types": [
              "SOL-R"
            ]
          },
          "35152": {
            "name": "Moisture Only",
            "pages": [
              "actoh/coa/templates/can-ter-combo"
            ],
            "test_types": [
              "H20"
            ]
          },
          "35153": {
            "name": "Water Activity Only",
            "pages": [
              "actoh/coa/templates/can-ter-combo"
            ],
            "test_types": [
              "WA"
            ]
          },
          "35963": {
            "name": "Infused Product Full Bundle",
            "pages": [
              "actoh/coa/templates/can-ter-combo",
              "default/coa/templates/pes-mic-sol-hvy-myc"
            ],
            "test_types": [
              "MIC-R",
              "CAN"
            ]
          },
          "36008": {
            "name": "Flower to Processor Bundle",
            "pages": [
              "actoh/coa/templates/can-ter-combo",
              "default/coa/templates/pes-mic-sol-hvy-myc"
            ],
            "test_types": [
              "PES-R",
              "CAN"
            ]
          },
          "37564": {
            "name": "Heavy Metals Only",
            "pages": [
              "default/coa/templates/pes-mic-sol-hvy-myc"
            ],
            "test_types": [
              "HVY"
            ]
          },
          "42256": {
            "name": "Final Infused Product \"Post Test\" - Oil was tested prior",
            "pages": [
              "actoh/coa/templates/can-ter-combo",
              "default/coa/templates/pes-mic-sol-hvy-myc"
            ],
            "test_types": [
              "FMI",
              "MIC-R",
              "CAN"
            ]
          },
          "42257": {
            "name": "Final Infused Product \"Pre Test\" - Oil was not tested Prior",
            "pages": [
              "actoh/coa/templates/can-ter-combo",
              "default/coa/templates/pes-mic-sol-hvy-myc"
            ],
            "test_types": [
              "CAN",
              "HVY",
              "MYC",
              "SOL-R",
              "MIC-R",
              "PES-R",
              "FMI"
            ]
          },
          "42258": {
            "name": "Hydrocarbon / Other Methods Extract",
            "pages": [
              "actoh/coa/templates/can-ter-combo",
              "default/coa/templates/pes-mic-sol-hvy-myc"
            ],
            "test_types": [
              "FMI",
              "PES-R",
              "SOL-R",
              "MYC"
            ]
          },
          "42259": {
            "name": "Carbon Dioxide Extract",
            "pages": [
              "actoh/coa/templates/can-ter-combo",
              "default/coa/templates/pes-mic-sol-hvy-myc"
            ],
            "test_types": [
              "TER",
              "PES-R",
              "MYC",
              "HVY",
              "FMI",
              "CAN"
            ]
          },
          "42260": {
            "name": "Other Method Extract",
            "pages": [
              "actoh/coa/templates/can-ter-combo",
              "default/coa/templates/pes-mic-sol-hvy-myc"
            ],
            "test_types": [
              "MIC-R",
              "FMI",
              "PES-R",
              "MYC",
              "HVY",
              "TER",
              "CAN"
            ]
          },
          "45400": {
            "name": "Kief Full Bundle",
            "pages": [
              "actoh/coa/templates/can-ter-combo",
              "default/coa/templates/pes-mic-sol-hvy-myc",
              "default/coa/templates/myc"
            ],
            "test_types": [
              "CAN",
              "TER",
              "HVY",
              "MYC",
              "MIC-R",
              "PES-R",
              "FMI"
            ]
          }
        }
      },
      updatedConfig: {
        "additional_files": "",
        "qc": "",
        "page_priority": [],
        "packages": {}
      },
      diff: {}
    }
  }
  handleLabInputChange(e: any) {
    this.setState({lab: e.target.value})
  }
  handleOldConfigChange(e: any) {
    this.setState({oldConfig: JSON.parse(e.target.value)})
  }
  handleInternalConfigChange(e: any) {
    this.setState({internalConfig: JSON.parse(e.target.value)})
  }
  handleGetConfig() {
    const self = this;
    if (self.state.lab.length > 0) {
      axios.get(`/api/get-lab-internal-config?lab=${self.state.lab}`).then((response) => {
        console.log(response)
      });
    }
  }
  handleCombine() {
    const oldConfig = this.state.oldConfig;
    const internalConfig = this.state.internalConfig;
    let updatedConfig: any = {};
    let diff: any = {};

    updatedConfig.additional_files = oldConfig.additional_files;
    updatedConfig.qc = oldConfig.qc;
    updatedConfig.page_priority = oldConfig.page_priority;
    updatedConfig.packages = oldConfig.packages;
    
    // check for new test types
    for (let packageID in internalConfig.packages) {
      // check if new test package
      if (!oldConfig.packages[packageID]) {
        // if new package, add it
        diff[packageID] = {
          isNewPackage: 1
        };
        updatedConfig.packages[packageID] = internalConfig.packages[packageID];
      } else {
        diff[packageID] = {
          isNewPackage: 0
        }
      }

      // check if name changed
      if (diff[packageID].isNewPackage === 0 && oldConfig.packages[packageID].name !== internalConfig.packages[packageID].name) {
        // set new name
        updatedConfig.packages[packageID].name = internalConfig.packages[packageID].name;
        diff[packageID].nameChanged = true;
      }

      for (let i = 0; i < internalConfig.packages[packageID].test_types.length; i++) {
        // skip new packages
        if (diff[packageID] === 1) {
          continue;
        }

        if (!diff[packageID].tests) {
          diff[packageID].tests = {};
        }

        // check if package's test_type is new
        if (oldConfig.packages[packageID].test_types.indexOf(internalConfig.packages[packageID].test_types[i]) === -1) {
          diff[packageID].tests[internalConfig.packages[packageID].test_types[i]] = 1
          updatedConfig.packages[packageID].test_types.push(internalConfig.packages[packageID].test_types[i]);
        } else {
          diff[packageID].tests[internalConfig.packages[packageID].test_types[i]] = 0
        }
      }
    }
    
    console.log(diff)


    /*"34844": {
      "name": "demo",
      "pages": [
        "actoh/coa/templates/can-ter-combo",
        "default/coa/templates/pes-mic-sol-hvy-myc"
      ],
      "test_types": [
        "CAN",
        "TER",
        "HVY",
        "MYC",
        "MIC-R",
        "SOL-R",
        "WA",
        "H20",
        "PES-R",
        "FMI"
      ]
    }*/


  }
  render() {
    return (
      <Grid container style={{flexGrow: 1}} >

        {/* ROW */}
        <Grid container spacing={2} style={{ marginBottom: '15px' }}>

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
        <Grid container spacing={2} style={{ marginBottom: '15px' }}>

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
                  <textarea onChange={(e) => this.handleOldConfigChange(e)} className="config-textarea simple-scrollbar" placeholder="Jaxx config here..." value={JSON.stringify(this.state.oldConfig)}></textarea>
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
                  <textarea onChange={(e) => this.handleInternalConfigChange(e)} className="config-textarea simple-scrollbar" placeholder="Jaxx config here..." value={JSON.stringify(this.state.internalConfig)}></textarea>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          
        </Grid>

        {/* ROW */}
        <Grid container spacing={2} style={{ marginBottom: '15px' }}>

          <Grid item xs={6}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<CompareArrowsOutlinedIcon />}
              onClick={() => this.handleCombine()}
            >
              <Typography style={{ fontFamily: 'Open Sans', fontSize: '15px' }}>
                COMBINE
              </Typography>
            </Button>
          </Grid>
          
        </Grid>

        {/* ROW */}
        <Grid container spacing={2} style={{ marginBottom: '15px' }}>

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
        <Grid container spacing={2} style={{ marginBottom: '15px' }}>

          {/* UPDATED CONFIG */}
          <Grid item xs={3}>
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