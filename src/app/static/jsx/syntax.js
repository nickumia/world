import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from '@mui/material/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import json_parse from './json_parse';


export default function SyntaxApp({details}) {

  var page_details = json_parse(details);
	var opening_array = page_details.opening.split('\n');
	var start_array = page_details.definition.start.split('\n');
	var end_array = page_details.definition.end.split('\n');

  return (
    <React.Fragment>
			<Grid
			  container
			  //spacing={0}
				sx={{ marginTop: 2, marginBottom: 2 }}
			  direction="column"
			  alignItems="center"
			  justifyContent="center"
			  style={{ minHeight: '100vh' }}>
				<Box sx={{ minWidth: 275, maxWidth: '80%' }}>
					<Card variant="outlined">
						<CardContent>
							{opening_array.map(thing => (
								<Typography
									style={{whiteSpace: 'pre-wrap', marginBottom: '10px'}}
									color="textSecondary" >{thing}</Typography>
							))}
							<Typography variant="h6" style={{marginBottom: '10px'}} >Structure</Typography>
							<Typography style={{whiteSpace: 'pre-wrap', marginBottom: '10px'}} >{page_details.definition.start}</Typography>
							<ul>
								{page_details.definition.middle.map(lis => (
									<Typography style={{whiteSpace: 'pre-wrap', marginBottom: '10px' }} component="li"
										key={lis.key}>{lis.value}</Typography>
								))}
							</ul>
							{end_array.map(thing => (
								<Typography style={{whiteSpace: 'pre-wrap', marginBottom: '10px'}} >{thing}</Typography>
							))}
						</CardContent>
					</Card>
				</Box>
			</Grid>
    </React.Fragment>
  );
}
