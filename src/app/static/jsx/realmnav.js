import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from '@mui/material/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import blue from "@material-ui/core/colors/blue";

import Tooltip from '@mui/material/Tooltip';
import json_parse from './json_parse';

// react.school/material-ui

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  offset: theme.mixins.toolbar,
}));


export default function RealmNavbar({domain, pages}) {
	
	var pages = json_parse(pages);
  const classes = useStyles();
	const icons = {
	};


  return (
    <React.Fragment>
			<AppBar position="static" style={{backgroundColor: blue[600]}}>
	      <Container maxWidth="xl">
		      <Toolbar disableGutters>
						<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} justifyContent="center">
		          {pages.map(page => (
			          <Button key={page.key} variant="contained"
					        href={page.link}
						      sx={{ my: 2, color: 'white', display: 'block' }}>
								  {page.key}
	              </Button>
		          ))}
	          </Box>
					</Toolbar>
	      </Container>
		  </AppBar>
    </React.Fragment>
  );
	
}
