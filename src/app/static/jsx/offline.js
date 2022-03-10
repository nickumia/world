import React from "react";
import Typography from "@material-ui/core/Typography";
import Tooltip from '@mui/material/Tooltip';
import cyan from "@material-ui/core/colors/cyan";
import orange from "@material-ui/core/colors/orange";

import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

import json_parse from './json_parse';


export default function Offline() {

  return (
    <React.Fragment>
			<Paper
				style={{
					backgroundColor: orange[100],
					marginLeft: '8%', marginRight: '8%',
					textAlign: 'center', justifyContent: 'center', alignItems: 'center', display: 'flex'}} sx={{px: 2, py: 1}} elevation={10}>
				<List component={Stack} direction="row">
					<Box> <p style={{height: 'inherit', fontSize: 30}}> &#129402; </p> </Box>
					<Box>
						<Typography variant="h6">
							Please excuse the limited functionality.  We are trying to save costs during our development. <br/>
							Full functionality is currently available from 7:00 am EST to 6:00 pm EST
						</Typography>
					</Box>
					<Box> <p style={{height: 'inherit', fontSize: 30}}> &#129402; </p> </Box>
				</List>
			</Paper>
			
    </React.Fragment>
  );
}
