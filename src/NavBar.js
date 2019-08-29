/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const NavBar = ({ location }) => {
  const stateCode = location.pathname.split('/')[2]

  const routerLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props}></Link>)

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit" component={routerLink} to="/">Find Your State</Button>
          <Button color="inherit" component={routerLink} to="/news">News</Button>
          {stateCode &&
            <>
              <Button color="inherit" component={routerLink} to={`/states/${stateCode}`}>Daily Leaders</Button>
              <Button color="inherit" component={routerLink} to={`/states/${stateCode}/leaders`}>State Leaders</Button>
            </>
          }
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar
