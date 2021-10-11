import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

// react.school/material-ui

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  offset: theme.mixins.toolbar
}));

export default function ButtonAppBar({title, menu, login}) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar>
        <Toolbar color="primary">
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
					{menu.map(menu => (
						<form action={menu.link} key={menu.key}>
		          <IconButton color="inherit" type="submit">
  		          {menu.name}
    		      </IconButton>
						</form>
					))}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
