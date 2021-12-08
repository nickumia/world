import React from "react";

import Typography from "@material-ui/core/Typography";
import Tooltip from '@mui/material/Tooltip';
import yellow from "@material-ui/core/colors/yellow";

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


export default function Processing({asteroids}) {

	var asteroid_list = JSON.parse(asteroids);
	const pics = {
		'Syntax/Grammar': '/static/img/tag.png',
		'Semantics': '/static/img/leaf.png',
		'Pragmatics': '/static/img/bike.png'
	};

	return (
    <React.Fragment>
			<Paper
				style={{padding: 16, backgroundColor: yellow[50]}}>
				<Typography variant="h4">
					Hello, I am <strong>Parry</strong>, the Keeper of the knowledge of the Mode of Processing.
				</Typography>
				<Typography variant="subtitle1">
					As a Keeper, I merely maintain and distribute the knowledge that was entrusted to me.  You will meet my friends later on who preserve the deeper Modes of NLP.  Together we seek to help foster a world of understanding to bring about peace and harmony between humans and machines.  Prepare yourself mentally and physicially and when you are ready..
				</Typography>
			</Paper>

			<hr/>


			{asteroid_list.map(asteroid => (
				<>
				<Accordion>
					<AccordionSummary
					  expandIcon={<ExpandMoreIcon />}
					  aria-controls="panel1a-content"
					  id="panel1a-header"
					>
						<Typography variant="h4">
							{asteroid.type}
					  </Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Box sx={{ minWidth: 275 }}>
				      <Card variant="outlined">
								<CardContent>
								  <Typography sx={{ fontSize: 14 }} color="textSecondary" gutterBottom>
								    {asteroid.phrase}
								  </Typography>
								  <Typography variant="body2"
										dangerouslySetInnerHTML={{__html: asteroid.description}}>
								  </Typography>
								</CardContent>
							</Card>
				    </Box>
						{asteroid.subject.map(subject => (
							<ListItemButton component='a' href={subject.link} key={subject.key}>
								<ListItemAvatar>
									<Avatar alt={subject.type} src={pics[subject.type]} />
								</ListItemAvatar>
						  	<ListItemText
						    	primary={subject.type}
									secondary={subject.description}
						      />
						  </ListItemButton>
						))}
					</AccordionDetails>
				</Accordion>
				</>
			))}

    </React.Fragment>
	);
}
