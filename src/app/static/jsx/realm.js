import React from "react";

import Typography from "@material-ui/core/Typography";
import Tooltip from '@mui/material/Tooltip';
import brown from "@material-ui/core/colors/brown";
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

import json_parse from './json_parse';


export default function Realm({domain, asteroids}) {

	var domain_specifics = json_parse(domain);
	var asteroid_list = json_parse(asteroids);
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

		'Aspects of Language': '/static/img/language_2.png',
		'Languages vs. Dialects': '/static/img/dialects.jpg',
		'Language Structure': '/static/img/db.png',
		'Language Use': '/static/img/road.png',
		'Language Expansion': '/static/img/growth.png',
		'Generality': '/static/img/general.png',
		'Specialization': '/static/img/special.png',
		'Known / Unknown Side Effects': '/static/img/unknown.png',

		'Expanding Knowledge': '/static/img/spark.gif',
		'Energy Flow': '/static/img/energy.gif',
		'The Four Element Model': '/static/img/four_elements.jpg',
		'The Self': '/static/img/self.png',
		'The Group': '/static/img/group.png',
		'The System': '/static/img/system.png',
		'Potential Energy': '/static/img/battery.png',
		'Kinetic Energy': '/static/img/wifi.png',
		'Physical-Metaphysical Interaction': '/static/img/key.png',
		'Water': '/static/img/water.png',
		'Earth': '/static/img/earth.png',
		'Fire': '/static/img/fire.png',
		'Air': '/static/img/air.png',

		'processing': '/static/img/balloons.jpg',
		'language': '/static/img/mountains.jpg',
		'natural': '/static/img/sunset.jpg'
	};

	const styles = {
    paperContainer: {
  		backgroundImage: `url(${pics[domain_specifics[0]]})`,
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",
			opacity: 0.7,
    },
		transparent: {
			backgroundColor: `rgba(18,18,18,0.6)`,
		},
		transparentFull: {
			backgroundColor: `rgba(255,255,255,0)`,
		}
	};

	return (
			<div style={styles.paperContainer}>
    <React.Fragment>
			<Paper
				style={{padding: 16, backgroundColor: brown[50]}}>
				<Typography variant="h5"
					dangerouslySetInnerHTML={{__html: domain_specifics[1]}}>
				</Typography>
				<Typography variant="subtitle2">
					{domain_specifics[2]}
				</Typography>
			</Paper>



			{asteroid_list.map(asteroid => (
				<Accordion key={asteroid.key} style={styles.transparent}>
					<AccordionSummary
					  expandIcon={<ExpandMoreIcon />}
					  aria-controls="panel1a-content"
					  id="panel1a-header"
					>
						<Typography variant="h6" color="secondary">
							{asteroid.type}
					  </Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Box sx={{ minWidth: 275 }}>
				      <Card variant="outlined" sx={{ display: 'flex' }} style={styles.transparentFull}>
								<Box sx={{ display: 'flex', flexDirection: 'column' }} justifyContent="center">
									<CardContent>
									  <Typography sx={{ fontSize: 14 }} color="secondary" gutterBottom>
									    <b>{asteroid.phrase}</b>
									  </Typography>
									  <Typography variant="body2"
											dangerouslySetInnerHTML={{__html: asteroid.description}}>
									  </Typography>
									</CardContent>
								</Box>
      					<CardMedia
      					  component="img"
      					  sx={{ width: 1/3 }}
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
									disableTypography
						    	primary=<Typography color="secondary">{subject.type}</Typography>
									secondary=<Typography color="secondary">{subject.description}</Typography>
						      />
						  </ListItemButton>
						))}
					</AccordionDetails>
				</Accordion>
			))}


			<Paper
				style={{padding: 16, backgroundColor: brown[50]}}>
				<Typography variant="h5" align="center">
					{domain_specifics[3]}
				</Typography>
				<Typography variant="subtitle1" align="center">
					{domain_specifics[4]}
				</Typography>
				<Box textAlign='center'>
        	<Button size="small" href="/nlp/posts/101">Explore Senses</Button>
				</Box>
			</Paper>

    </React.Fragment>
			</div>
	);
}
