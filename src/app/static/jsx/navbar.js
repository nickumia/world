import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import Tooltip from '@mui/material/Tooltip';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import BlurOnIcon from '@mui/icons-material/BlurOn';

import SearchBar from "material-ui-search-bar";

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
	// Adapted from https://react.school/material-ui/appbar/
  const classes = useStyles();
	var search_value = '';
	const icons = {
		"Login": <LoginIcon />,
		"Logout": <LogoutIcon />,
		"Home": <HomeIcon />,
		"Posts": <BookIcon />,
		"Processing": <ChangeHistoryIcon />,
		"Language": <CheckBoxOutlineBlankIcon />,
		"Natural": <CircleOutlinedIcon />,
		"Kumia": <BlurOnIcon />,
	};
	const [search_api, setSearch] = React.useState('');

	React.useEffect(() => {
	  searchAPI(search_value);
	}, [search_api, setSearch]);


  return (
    <React.Fragment>
      <AppBar>	
        <Toolbar color="primary">
          <Typography variant="h6" className={classes.title}>
						{title}
            {title == 'NLP | Error' && '	\u{1F627}'}
          </Typography>
					{menu.map(menu => (
						<form action={menu.link} key={menu.key}>
							<Tooltip title={menu.name}>
			          <IconButton color="inherit" type="submit">
  			          {icons[menu.name]}
    			      </IconButton>
							</Tooltip>
						</form>
					))}
				<SearchBar
			    onChange={(newValue) => search_value=newValue }
					// TODO: Fix Search Functionality
			    onRequestSearch={() => searchAPI(search_value)}
			  />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );

	
	function searchAPI(query_text){
		if( query_text ){
			window.location.href = '/search?q='+query_text;
		}
	}
}
