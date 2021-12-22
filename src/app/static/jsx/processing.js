import React from "react";

import Typography from "@material-ui/core/Typography";
import Tooltip from '@mui/material/Tooltip';
import amber from "@material-ui/core/colors/amber";
import Button from '@mui/material/Button';

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
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


export default function Processing({asteroids}) {

	var asteroid_list = JSON.parse(asteroids);
	const pics = {
		'Basic Text': '/static/img/writing.png',
		'Speech Audio': '/static/img/audio.png',
		'Seeing the World': '/static/img/camera.png',
		'Syntax/Grammar': '/static/img/tag.png',
		'Semantics': '/static/img/leaf.png',
		'Pragmatics': '/static/img/bike.png',
		'Phonetics': '/static/img/bell.png',
		'Phonology': '/static/img/comment.png',
		'Morphology': '/static/img/comments.png',
		'Real-world Objects': '/static/img/flash.png',
		'Reference Clues': '/static/img/arrows.png',
		'Object Definitions / Relations': '/static/img/heartbeat.png',
	};

	return (
    <React.Fragment>
			<Paper
				style={{padding: 16, backgroundColor: amber[50]}}>
				<Typography variant="h5">
					Hello, I am <strong>Parry</strong>, the Keeper of the knowledge of the Mode of Processing.
				</Typography>
				<Typography variant="subtitle2">
					As a Keeper, I merely maintain and distribute the knowledge that was entrusted to me.  You will meet my friends later on who preserve the deeper Modes of NLP.  Together we seek to help foster a world of understanding to bring about peace and harmony between humans and machines.  Prepare yourself mentally and physicially and when you are ready..
				</Typography>
			</Paper>



			{asteroid_list.map(asteroid => (
				<Accordion key={asteroid.key}>
					<AccordionSummary
					  expandIcon={<ExpandMoreIcon />}
					  aria-controls="panel1a-content"
					  id="panel1a-header"
					>
						<Typography variant="h6">
							{asteroid.type}
					  </Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Box sx={{ minWidth: 275 }}>
				      <Card variant="outlined" sx={{ display: 'flex' }}>
								<Box sx={{ display: 'flex', flexDirection: 'column' }}>
									<CardContent>
									  <Typography sx={{ fontSize: 14 }} color="textSecondary" gutterBottom>
									    {asteroid.phrase}
									  </Typography>
									  <Typography variant="body2"
											dangerouslySetInnerHTML={{__html: asteroid.description}}>
									  </Typography>
									</CardContent>
								</Box>
      					<CardMedia
      					  component="img"
      					  sx={{ width: 151 }}
      					  image={pics[asteroid.type]}
      					  alt={asteroid.type}
      					/>
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
			))}


			<Paper
				style={{padding: 16, backgroundColor: amber[50]}}>
				<Typography variant="h5" align="center">
					Removing the Limitations
				</Typography>
				<Typography variant="subtitle1" align="center">
					As humans, we have FIVE main senses that we use to experience the world: (1) Sight, (2) Hearing, (3) Touch, (4) Taste and (5) Smell.  Currently, machines are only capable of "understanding" the first two.  However, our understanding of the world is dependent on combinations of these senses, not necessarily any one of them in isolation.  When we form ideas and communicate with each other, these ideas are influenced by our understanding of the other aspects that aren't always explicitly stated.
				</Typography>
				<Box textAlign='center'>
        	<Button size="small" href="/nlp/posts/101">Explore Senses</Button>
				</Box>
			</Paper>

    </React.Fragment>
	);
}
