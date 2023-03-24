import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import axios from 'axios';

import {
  makeStyles,
  useTheme,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import MultiConfigUpdater from "./pages/MultiConfigUpdater/MultiConfigUpdater";
import JaxxConfigUpdater from "./pages/JaxxConfigUpdater/JaxxConfigUpdater";
import AnalyteFinder from "./pages/AnalyteFinder/AnalyteFinder";
import ImporterHelper from "./pages/ImporterHelper/ImporterHelper";

import "./App.css";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    appBar: {
      marginLeft: drawerWidth,
      background: "white",
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    typography: {
      fontFamily: ["Open Sans", "sans-serif"].join(","),
      color: "#747779",
      fontWeight: 400,
      textDecoration: "none"
    }
  })
);

const App: React.FC = (props: any, state: any) => {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const loginInternal = () => {
    axios.post(`/api/login-internal`, {email: "jeff.campecino@confidentcannabis.com", password: "qwerty"}).then((response) => {
      console.log(response.data)
      localStorage.setItem('cc_session', response.data)
    });
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link to="/multiconfigupdater" style={{ textDecoration: "none" }}>
          <ListItem button>
            <ListItemText
              disableTypography
              primary={
                <Typography
                  className={classes.typography}
                  style={{ fontSize: "14px" }}
                >
                  Multi Config Updater
                </Typography>
              }
            />
          </ListItem>
        </Link>
        <Link to="/jaxxconfigupdater" style={{ textDecoration: "none" }}>
          <ListItem button>
            <ListItemText
              disableTypography
              primary={
                <Typography
                  className={classes.typography}
                  style={{ fontSize: "14px" }}
                >
                  Jaxx Config Updater
                </Typography>
              }
            />
          </ListItem>
        </Link>
        <Link to="/analytefinder" style={{ textDecoration: "none" }}>
          <ListItem button>
            <ListItemText
              disableTypography
              primary={
                <Typography
                  className={classes.typography}
                  style={{ fontSize: "14px" }}
                >
                  Analyte Finder
                </Typography>
              }
            />
          </ListItem>
        </Link>
        <Link to="/importerhelper" style={{ textDecoration: "none" }}>
          <ListItem button>
            <ListItemText
              disableTypography
              primary={
                <Typography
                  className={classes.typography}
                  style={{ fontSize: "14px" }}
                >
                  Importer Helper
                </Typography>
              }
            />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          elevation={0}
          style={{ borderBottom: "1px solid rgba(0,0,0,0.12)" }}
          className={classes.appBar}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.typography} noWrap>
              CC Lab Support Toolbox
            </Typography>
            <input  style={{ position: 'absolute', right: '355px' }} placeholder="Email" className="login-internal-fields" />
            <input style={{ position: 'absolute', right: '175px' }} placeholder="Password" className="login-internal-fields" />
            <Button variant="outlined" style={{ position: 'absolute', right: '15px', borderRadius: '0px' }} onClick={() => loginInternal() }>
                <Typography className="easy-font" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                  LOGIN TO INTERNAL
                </Typography>
              </Button>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div>
            <Switch>
              <Route path="/multiconfigupdater">
                <MultiConfigUpdater />
              </Route>
              <Route path="/jaxxconfigupdater">
                <JaxxConfigUpdater />
              </Route>
              <Route path="/analytefinder">
                <AnalyteFinder />
              </Route>
              <Route path="/importerhelper">
                <ImporterHelper />
              </Route>
              <Route exact path="/">
                <Redirect to="/multiconfigupdater" />
              </Route>
              <Route exact path="/">
                <Redirect to="/multiconfigupdater" />
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
