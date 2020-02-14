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

function deepClone(stuff: any) {
  return JSON.parse(JSON.stringify(stuff));
}

function copyToClipboard() {
  document.execCommand('copy');
}

export default class JaxxConfigUpdater extends Component<{}, State> {
  updatedConfigRef: any;
  constructor(props: any) {
    super(props);
    this.updatedConfigRef = React.createRef();
    this.state = {
      lab: '',
      oldConfig: {
        "additional_files": "default/coa/templates/additional_files",
        "qc": "default/coa/templates/qc",
        "page_priority": [
          "atls/coa/templates/cover-can",
          "atls/coa/templates/mic-myc",
          "default/coa/templates/hvy",
          "default/coa/templates/pes",
          "default/coa/templates/sol",
          "default/coa/templates/ter"
        ],
        "packages": {
          "47435": {
            "name": "I-502 Initial Panel *or Other Material That Will Not Be Extracted",
            "pages": [
              "atls/coa/templates/cover-can",
              "atls/coa/templates/mic-myc"
            ],
            "test_types": [
              "MIC-R",
              "FMI",
              "WA",
              "CAN"
            ]
          },
          "47436": {
            "name": "I-502 Panel Flower",
            "pages": [
              "atls/coa/templates/cover-can",
              "atls/coa/templates/mic-myc"
            ],
            "test_types": [
              "CAN",
              "MYC",
              "MIC-R",
              "WA",
              "H20",
              "FMI"
            ]
          },
          "47440": {
            "name": "I-502 Panel Concentrate",
            "pages": [
              "atls/coa/templates/cover-can",
              "atls/coa/templates/mic-myc",
              "default/coa/templates/sol"
            ],
            "test_types": [
              "CAN",
              "SOL-R",
              "MYC"
            ]
          },
          "47443": {
            "name": "I-502 Cannabinoid (Potency Only)",
            "pages": [
              "atls/coa/templates/cover-can"
            ],
            "test_types": [
              "CAN"
            ]
          },
          "47444": {
            "name": "I-502 Cannabinoid (Potency Only)",
            "pages": [
              "atls/coa/templates/cover-can"
            ],
            "test_types": [
              "CAN"
            ]
          },
          "47445": {
            "name": "I-502 Tincture (Potency Only)",
            "pages": [
              "atls/coa/templates/cover-can"
            ],
            "test_types": [
              "CAN"
            ]
          },
          "47479": {
            "name": "I-502 Panel Flower + Terpenes",
            "pages": [
              "atls/coa/templates/cover-can",
              "atls/coa/templates/mic-myc",
              "default/coa/templates/ter"
            ],
            "test_types": [
              "FMI",
              "MYC",
              "TER",
              "CAN"
            ]
          },
          "47482": {
            "name": "I-502 Panel Concentrate + Terpenes",
            "pages": [
              "atls/coa/templates/cover-can",
              "atls/coa/templates/mic-myc",
              "default/coa/templates/sol",
              "default/coa/templates/ter"
            ],
            "test_types": [
              "SOL-R",
              "MYC",
              "TER",
              "CAN"
            ]
          },
          "47484": {
            "name": "I-502 Panel Flower + Pesticides",
            "pages": [
              "atls/coa/templates/cover-can",
              "atls/coa/templates/mic-myc",
              "default/coa/templates/pes",
              "default/coa/templates/ter"
            ],
            "test_types": [
              "CAN",
              "MYC",
              "MIC-R",
              "WA",
              "H20",
              "PES-R",
              "FMI"
            ]
          },
          "47485": {
            "name": "I-502 Panel Concentrate + Pesticides",
            "pages": [
              "atls/coa/templates/cover-can",
              "atls/coa/templates/mic-myc",
              "default/coa/templates/pes",
              "default/coa/templates/sol"
            ],
            "test_types": [
              "PES-R",
              "SOL-R",
              "MYC",
              "CAN"
            ]
          },
          "47486": {
            "name": "I-502 Panel Flower + Pesticides + Terpenes",
            "pages": [
              "atls/coa/templates/cover-can",
              "atls/coa/templates/mic-myc",
              "default/coa/templates/pes",
              "default/coa/templates/ter"
            ],
            "test_types": [
              "CAN",
              "TER",
              "MYC",
              "MIC-R",
              "WA",
              "H20",
              "PES-R",
              "FMI"
            ]
          },
          "47487": {
            "name": "I-502 Panel Concentrate + Pesticides + Terpenes",
            "pages": [
              "atls/coa/templates/cover-can",
              "atls/coa/templates/mic-myc",
              "default/coa/templates/pes",
              "default/coa/templates/sol",
              "default/coa/templates/ter"
            ],
            "test_types": [
              "PES-R",
              "TER",
              "SOL-R",
              "MYC",
              "CAN"
            ]
          },
          "47488": {
            "name": "I-502 Panel Flower + Pesticides + Heavy Metals",
            "pages": [
              "atls/coa/templates/cover-can",
              "default/coa/templates/mic",
              "default/coa/templates/myc",
              "default/coa/templates/hvy",
              "default/coa/templates/pes"
            ],
            "test_types": [
              "FMI",
              "PES-R",
              "H20",
              "WA",
              "MIC-R",
              "MYC",
              "HVY",
              "CAN"
            ]
          },
          "47489": {
            "name": "I-502 Panel Concentrate + Pesticides + Heavy Metals",
            "pages": [
              "atls/coa/templates/cover-can",
              "atls/coa/templates/mic-myc",
              "default/coa/templates/hvy",
              "default/coa/templates/pes",
              "default/coa/templates/sol"
            ],
            "test_types": [
              "PES-R",
              "SOL-R",
              "MYC",
              "HVY",
              "CAN"
            ]
          },
          "47490": {
            "name": "I-502 Panel Flower + Pesticides + Heavy Metals + Terpenes",
            "pages": [
              "atls/coa/templates/cover-can",
              "atls/coa/templates/mic-myc",
              "default/coa/templates/hvy",
              "default/coa/templates/pes",
              "default/coa/templates/ter"
            ],
            "test_types": [
              "FMI",
              "PES-R",
              "H20",
              "WA",
              "MIC-R",
              "MYC",
              "HVY",
              "TER",
              "CAN"
            ]
          },
          "47491": {
            "name": "I-502 Panel Concentrates + Pesticides + Heavy Metals + Terpenes",
            "pages": [
              "atls/coa/templates/cover-can",
              "atls/coa/templates/mic-myc",
              "default/coa/templates/hvy",
              "default/coa/templates/pes",
              "default/coa/templates/sol",
              "default/coa/templates/ter"
            ],
            "test_types": [
              "PES-R",
              "SOL-R",
              "TER",
              "HVY",
              "MYC",
              "CAN"
            ]
          },
          "47492": {
            "name": "Cannabinoid Profile Flower or Concentrate",
            "pages": [
              "atls/coa/templates/cover-can"
            ],
            "test_types": [
              "CAN"
            ]
          },
          "47493": {
            "name": "Terpene Profile Flower or Concentrate",
            "pages": [
              "default/coa/templates/ter"
            ],
            "test_types": [
              "TER"
            ]
          },
          "47494": {
            "name": "Residual Solvent Analysis",
            "pages": [
              "default/coa/templates/sol"
            ],
            "test_types": [
              "SOL-R"
            ]
          },
          "47495": {
            "name": "Microbial Analysis",
            "pages": [
              "atls/coa/templates/mic-myc"
            ],
            "test_types": [
              "MIC-R"
            ]
          },
          "47496": {
            "name": "Microbial Analysis",
            "pages": [
              "atls/coa/templates/mic-myc"
            ],
            "test_types": [
              "MIC-A",
              "MIC-R"
            ]
          },
          "47497": {
            "name": "Mycotoxin Analysis Flower or Concentrate",
            "pages": [
              "atls/coa/templates/mic-myc"
            ],
            "test_types": [
              "MYC"
            ]
          },
          "47499": {
            "name": "Pesticides Flower or Concentrate",
            "pages": [
              "default/coa/templates/pes"
            ],
            "test_types": [
              "PES-R"
            ]
          },
          "47500": {
            "name": "Heavy Metals (DOH Compliant)",
            "pages": [
              "default/coa/templates/hvy"
            ],
            "test_types": [
              "HVY"
            ]
          },
          "47502": {
            "name": "2-Day Rush",
            "pages": "empty",
            "test_types": [
              "OTHER"
            ]
          },
          "47503": {
            "name": "3-Day Rush",
            "pages": "empty",
            "test_types": [
              "OTHER"
            ]
          },
          "47504": {
            "name": "Combination",
            "pages": "empty",
            "test_types": [
              "OTHER"
            ]
          },
          "47505": {
            "name": "Hemp Analysis",
            "pages": [
              "atls/coa/templates/cover-can"
            ],
            "test_types": [
              "CAN"
            ]
          },
          "47506": {
            "name": "Hemp Analysis",
            "pages": [
              "atls/coa/templates/cover-can",
              "default/coa/templates/ter"
            ],
            "test_types": [
              "TER",
              "CAN"
            ]
          },
          "53546": {
            "name": "Hemp 1-Day Rush",
            "pages": [
              "atls/coa/templates/cover-can"
            ],
            "test_types": [
              "CAN"
            ]
          },
          "53578": {
            "name": "Hemp 2-Day Rush",
            "pages": [
              "atls/coa/templates/cover-can"
            ],
            "test_types": [
              "CAN"
            ]
          },
          "53787": {
            "name": "Hemp Analysis RSA",
            "pages": [
              "default/coa/templates/sol"
            ],
            "test_types": [
              "SOL-R",
              "SOL-A"
            ]
          },
          "53823": {
            "name": "Hemp Potency + RSA",
            "pages": [
              "atls/coa/templates/cover-can",
              "default/coa/templates/sol"
            ],
            "test_types": [
              "CAN",
              "SOL-R"
            ]
          },
          "54501": {
            "name": "R&D In-House QC Samples",
            "pages": [
              {
                "page": "atls/coa/templates/cover-can",
                "options": {
                  "regulatory_type": "non-regulatory"
                }
              },
              {
                "page": "atls/coa/templates/mic-myc",
                "options": {
                  "regulatory_type": "non-regulatory"
                }
              },
              {
                "page": "default/coa/templates/pes",
                "options": {
                  "regulatory_type": "non-regulatory"
                }
              },
              {
                "page": "default/coa/templates/sol",
                "options": {
                  "regulatory_type": "non-regulatory"
                }
              },
              {
                "page": "default/coa/templates/ter",
                "options": {
                  "regulatory_type": "non-regulatory"
                }
              }
            ],
            "test_types": [
              "OTHER",
              "FMI",
              "H20",
              "WA",
              "SOL-R",
              "MIC-R",
              "SOL-A",
              "MIC-A",
              "MYC",
              "TER",
              "CAN"
            ]
          }
        }
      },
      internalConfig: {
        "additional_files": "default/coa/templates/additional_files",
        "qc": "default/coa/templates/qc",
        "page_priority": [],
        "packages": {
          "47435": {
            "name": "I-502 Initial Panel *or Other Material That Will Not Be Extracted",
            "pages": [],
            "test_types": [
              "MIC-R",
              "FMI",
              "WA",
              "H20",
              "MYC",
              "CAN"
            ]
          },
          "47436": {
            "name": "I-502 Panel Flower",
            "pages": [],
            "test_types": [
              "CAN",
              "MYC",
              "MIC-R",
              "WA",
              "H20",
              "FMI"
            ]
          },
          "47440": {
            "name": "I-502 Panel Concentrate",
            "pages": [],
            "test_types": [
              "CAN",
              "SOL-R",
              "MYC"
            ]
          },
          "47443": {
            "name": "I-502 Cannabinoid (Potency Only)",
            "pages": [],
            "test_types": [
              "CAN"
            ]
          },
          "47444": {
            "name": "I-502 Cannabinoid (Potency Only)",
            "pages": [],
            "test_types": [
              "CAN"
            ]
          },
          "47445": {
            "name": "I-502 Tincture (Potency Only)",
            "pages": [],
            "test_types": [
              "CAN"
            ]
          },
          "47479": {
            "name": "I-502 Panel Flower + Terpenes",
            "pages": [],
            "test_types": [
              "FMI",
              "H20",
              "WA",
              "MIC-R",
              "MYC",
              "TER",
              "CAN"
            ]
          },
          "47482": {
            "name": "I-502 Panel Concentrate + Terpenes",
            "pages": [],
            "test_types": [
              "SOL-R",
              "MYC",
              "TER",
              "CAN"
            ]
          },
          "47484": {
            "name": "I-502 Panel Flower + Pesticides",
            "pages": [],
            "test_types": [
              "CAN",
              "MYC",
              "MIC-R",
              "WA",
              "H20",
              "PES-R",
              "FMI"
            ]
          },
          "47485": {
            "name": "I-502 Panel Concentrate + Pesticides",
            "pages": [],
            "test_types": [
              "PES-R",
              "SOL-R",
              "MYC",
              "CAN"
            ]
          },
          "47486": {
            "name": "I-502 Panel Flower + Pesticides + Terpenes",
            "pages": [],
            "test_types": [
              "CAN"
            ]
          },
          "47487": {
            "name": "I-502 Panel Concentrate + Pesticides + Terpenes",
            "pages": [],
            "test_types": [
              "PES-R",
              "TER",
              "SOL-R",
              "MYC",
              "CAN"
            ]
          },
          "47488": {
            "name": "I-502 Panel Flower + Pesticides + Heavy Metals",
            "pages": [
              "atls/coa/templates/cover-can",
              "default/coa/templates/mic",
              "default/coa/templates/myc",
              "default/coa/templates/hvy",
              "default/coa/templates/pes"
            ],
            "test_types": [
              "FMI",
              "PES-R",
              "H20",
              "WA",
              "MIC-R",
              "MYC",
              "HVY",
              "CAN"
            ]
          },
          "47489": {
            "name": "I-502 Panel Concentrate + Pesticides + Heavy Metals",
            "pages": [],
            "test_types": [
              "PES-R",
              "SOL-R",
              "MYC",
              "HVY",
              "CAN"
            ]
          },
          "47490": {
            "name": "I-502 Panel Flower + Pesticides + Heavy Metals + Terpenes",
            "pages": [],
            "test_types": [
              "FMI",
              "PES-R",
              "H20",
              "WA",
              "TER",
              "CAN"
            ]
          },
          "47491": {
            "name": "I-502 Panel Concentrates + Pesticides + Heavy Metals + Terpenes",
            "pages": [],
            "test_types": [
              "PES-R",
              "SOL-R",
              "TER",
              "HVY",
              "MYC",
              "CAN"
            ]
          },
          "47492": {
            "name": "Cannabinoid Profile Flower or Concentrate",
            "pages": [],
            "test_types": [
              "CAN"
            ]
          },
          "47493": {
            "name": "Terpene Profile Flower or Concentrate",
            "pages": [],
            "test_types": [
              "TER"
            ]
          },
          "47494": {
            "name": "Residual Solvent Analysis",
            "pages": [
              "default/coa/templates/sol"
            ],
            "test_types": [
              "SOL-R"
            ]
          },
          "47495": {
            "name": "Microbial Analysis",
            "pages": [],
            "test_types": [
              "MIC-R"
            ]
          },
          "47496": {
            "name": "Microbial Analysis",
            "pages": [],
            "test_types": [
              "MIC-A",
              "MIC-R"
            ]
          },
          "47497": {
            "name": "Mycotoxin Analysis Flower or Concentrate",
            "pages": [],
            "test_types": [
              "MYC"
            ]
          },
          "47498": {
            "name": "Moisture % + Water Activity Flower",
            "pages": [
              "atls/coa/templates/cover-can"
            ],
            "test_types": [
              "WA",
              "H20"
            ]
          },
          "47499": {
            "name": "Pesticides Flower or Concentrate",
            "pages": [
              "default/coa/templates/pes"
            ],
            "test_types": [
              "PES-R"
            ]
          },
          "47500": {
            "name": "Heavy Metals (DOH Compliant)",
            "pages": [
              "default/coa/templates/hvy"
            ],
            "test_types": [
              "HVY"
            ]
          },
          "47501": {
            "name": "1-Day Rush",
            "pages": "empty",
            "test_types": [
              "OTHER"
            ]
          },
          "47502": {
            "name": "2-Day Rush",
            "pages": "empty",
            "test_types": [
              "OTHER"
            ]
          },
          "47503": {
            "name": "3-Day Rush",
            "pages": "empty",
            "test_types": [
              "OTHER"
            ]
          },
          "47504": {
            "name": "Combination",
            "pages": "empty",
            "test_types": [
              "OTHER"
            ]
          },
          "47505": {
            "name": "Hemp Analysis",
            "pages": [
              "atls/coa/templates/cover-can"
            ],
            "test_types": [
              "CAN"
            ]
          },
          "47506": {
            "name": "Hemp Analysis",
            "pages": [
              "atls/coa/templates/cover-can",
              "default/coa/templates/ter"
            ],
            "test_types": [
              "TER",
              "CAN"
            ]
          },
          "53546": {
            "name": "Hemp 1-Day Rush",
            "pages": [
              "atls/coa/templates/cover-can"
            ],
            "test_types": [
              "CAN"
            ]
          },
          "53578": {
            "name": "Hemp 2-Day Rush",
            "pages": [
              "atls/coa/templates/cover-can"
            ],
            "test_types": [
              "CAN"
            ]
          },
          "53787": {
            "name": "Hemp Analysis RSA",
            "pages": [
              "default/coa/templates/sol"
            ],
            "test_types": [
              "SOL-R",
              "SOL-A"
            ]
          },
          "54501": {
            "name": "R&D In-House QC Samples",
            "pages": [
              {
                "page": "atls/coa/templates/cover-can",
                "options": {
                  "regulatory_type": "non-regulatory"
                }
              },
              {
                "page": "atls/coa/templates/mic-myc",
                "options": {
                  "regulatory_type": "non-regulatory"
                }
              },
              {
                "page": "default/coa/templates/pes",
                "options": {
                  "regulatory_type": "non-regulatory"
                }
              },
              {
                "page": "default/coa/templates/sol",
                "options": {
                  "regulatory_type": "non-regulatory"
                }
              },
              {
                "page": "default/coa/templates/ter",
                "options": {
                  "regulatory_type": "non-regulatory"
                }
              }
            ],
            "test_types": [
              "OTHER",
              "FMI",
              "H20",
              "WA",
              "SOL-R",
              "MIC-R",
              "SOL-A",
              "MIC-A",
              "MYC",
              "TER",
              "CAN"
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
  makePackagesComply() {
    const self = this;
    let config = deepClone(self.state.updatedConfig);
    
    for (let packageID in config.packages) {
      let tps: any = config.packages[packageID];
      if (!tps.compliance) {
        for (let i = 0; i < tps.pages; i++) {
          let page = tps.pages[i];
          if (typeof page === 'string') {
            config.packages[packageID].pages[i] = {
              page,
              regulatory_type: 'non-regulatory'
            }
          } else {
            config.packages[packageID].pages[i].regulatory_type = 'non-regulatory';
          }
        }
      }
    }
    this.setState({ updatedConfig: config });
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
    console.log(self.state.lab)
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
    updatedConfig.packages = deepClone(oldConfig.packages);
    
    // check for new test types
    for (let packageID in internalConfig.packages) {
      // check if new test package
      if (!oldConfig.packages[packageID]) {
        // if new package, add it
        diff[packageID] = {
          isNewPackage: 1
        };
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
        if (diff[packageID].isNewPackage === 1) {
          continue;
        }

        if (!diff[packageID].tests) {
          diff[packageID].tests = {};
        }

        // check if package's test_type is new
        if (oldConfig.packages[packageID].test_types.indexOf(internalConfig.packages[packageID].test_types[i]) === -1) {
          diff[packageID].tests[internalConfig.packages[packageID].test_types[i]] = 1
        } else {
          diff[packageID].tests[internalConfig.packages[packageID].test_types[i]] = 0
        }
      }
      updatedConfig.packages[packageID] = deepClone(internalConfig.packages[packageID]);
    }

     // check for deleted test types
     for (let packageID in oldConfig.packages) {
      // check if deleted test package
      if (!internalConfig.packages[packageID]) {
        // if new package, add it
        diff[packageID] = {
          isNewPackage: -1
        };
      }

      for (let i = 0; i < oldConfig.packages[packageID].test_types.length; i++) {
        // skip deleted packages
        if (diff[packageID].isNewPackage === -1) {
          continue;
        }

        if (!diff[packageID].tests) {
          diff[packageID].tests = {};
        }

        // check if package's test_type is new
        if (internalConfig.packages[packageID].test_types.indexOf(oldConfig.packages[packageID].test_types[i]) === -1) {
          diff[packageID].tests[oldConfig.packages[packageID].test_types[i]] = -1
        }
      }
      updatedConfig.packages[packageID].pages = deepClone(oldConfig.packages[packageID].pages);
    }

    this.setState({ updatedConfig, diff })
  }
  renderPagePriority() {
    return this.state.updatedConfig.page_priority.map((page: string, index: number) => {
      return (
        <Grid item xs={12} key={index}>
          <Paper elevation={1} square={true} style={{ background: 'white', position: 'relative', margin: '10px', padding: '6px' }}>
            <Typography className="easy-font" style={{ fontFamily: 'Open Sans', fontSize: '12px', padding: '2px 5px' }}>
              {page}
            </Typography>
          </Paper>
        </Grid>
      )
    });
  }
  renderPackagePages(pages: any) {
    const style: any = {
      display: 'block',
      width: '100%',
      padding: '4px',
      marginBottom: '4px',
      marginLeft: '15px'
    };
    if (typeof pages === 'string') {
      return (
        <div style={style} className="package-pages">
          <Typography className="easy-font" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
            EMPTY
          </Typography>
        </div>  
      );
    }
    return pages.map((page: any, index: number) => {
      let pageName: string = '';
      if (typeof page === 'string') {
        pageName = page;
      } else {
        pageName = page.page;
      }
      return (
        <div style={style} key={index}  className="package-pages">
          <Typography className="easy-font" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
            {pageName}
          </Typography>
        </div>  
      )
    });
  }
  renderPackages() {
    let packages = [];
    for (let id in this.state.updatedConfig.packages) {
      if (!this.state.diff[id]) { continue; }
      packages.push(
        <Grid item xs={12} key={id}>
          <Paper elevation={1} square={true} style={{ background: 'white', position: 'relative', margin: '10px', padding: '6px' }}>
            <Typography  className="easy-font" style={{ fontWeight: 'bold', fontFamily: 'Open Sans', fontSize: '16px', padding: '2px 5px' }}>
              {id} | {this.state.updatedConfig.packages[id].name}
            </Typography>
            <Grid container style={{ padding: '10px 0px' }}>
              {this.renderPackagePages(this.state.updatedConfig.packages[id].pages)}
              {/* <Button variant="outlined" style={{ fontSize: '10px', width: '100%', borderRadius: '0px', fontWeight: 300 }}>Add Page</Button> */}
            </Grid>
            <Grid container>
              {this.renderTestTypes(this.state.diff[id].tests)}
            </Grid>
          </Paper>
        </Grid>
      );
    }
    return packages;
  }
  renderTestTypes(tests: any) {
    let testStatuses: any = [];
    let colorMap: any = {0: 'transparent', 1: 'rgba(0,255,0,0.15)', '-1': 'rgba(255,0,0,0.15)' };

    for (let test in tests) {
      const status: number = tests[test];
      const color: string = colorMap[status];
      let style: any = {
        display: 'inline-block',
        fontSize: '12px',
        border: '1px solid rgba(0,0,0,0.25)',
        color: 'rgba(0,0,0,0.5)',
        borderRadius: '5px',
        padding: '5px 10px',
        margin: '1px',
        background: color
      };
      testStatuses.push(<span style={style} key={test}>{test}</span>);
    }
    return testStatuses;
  }
  copyToClipboard() {
    this.updatedConfigRef.current.select();
    copyToClipboard();
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
                  <Button variant="outlined" style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={() => this.makePackagesComply()}>
                    <Typography className="easy-font" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                      MAKE PACKAGES COMPLY
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={12} className="simple-scrollbar" style={{ minHeight: '0px', maxHeight: '50vh', background: 'white', overflowY: 'auto' }}>
                  {this.renderPackages()}
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
                <Grid item xs={12} className="simple-scrollbar" style={{ minHeight: '0px', maxHeight: '50vh', background: 'white' }}>
                  {this.renderPagePriority()}
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
                  <Button variant="outlined" style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={() => this.copyToClipboard()}>
                    <Typography className="easy-font" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                      COPY
                    </Typography>
                  </Button>
                  <Divider></Divider>
                </Grid>
                <Grid item xs={12} style={{ height: '70px' }}>
                  <textarea className="config-textarea simple-scrollbar" ref={this.updatedConfigRef} value={JSON.stringify(this.state.updatedConfig)}></textarea>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          
        </Grid>        

      </Grid>
    );
  }
}