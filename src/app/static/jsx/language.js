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


export default function Language({asteroids}) {

	var asteroid_list = JSON.parse(asteroids);
	const pics = {
		'Aspects of Language': '/static/img/language_2.png',
		'Languages vs. Dialects': '/static/img/dialects.jpg',
		'Language Structure': '/static/img/db.png',
		'Language Use': '/static/img/road.png',
		'Language Expansion': '/static/img/growth.png',
		'Generality': '/static/img/general.png',
		'Specialization': '/static/img/special.png',
		'Known / Unknown Side Effects': '/static/img/unknown.png',
	};

	return (
    <React.Fragment>
			<Paper
				style={{padding: 16, backgroundColor: amber[50]}}>
				<Typography variant="h5">
					Hi, my name is <strong>Lalita</strong>, the Keeper of the knowledge of the Mode of Language.
				</Typography>
				<Typography variant="subtitle2">
					Apart from protecting and preserving knowledge, my friends and I are tasked with building a strong community.  A community of people with diverse backgrounds whose beliefs and values aren't necessarily the same, but are clear and benevolent.  Because of the delicate nature of our work, it is important that you remain truthful to yourself on this journey and follow your heart..
				</Typography>
			</Paper>



			{asteroid_list.map(asteroid => (
				<>
				<Accordion>
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
				</>
			))}


			<Paper
				style={{padding: 16, backgroundColor: amber[50]}}>
				<Typography variant="h5" align="center">
					Bridging Language Barriers
				</Typography>
				<Typography variant="subtitle1" align="center">
					In order to truly understand any given language, it might be helpful to create a "universal language template."  This template will define everything that is known to humans about our language and it is abstract enough to allow new properties and features of a language as necessary.  Not every language will have the same specifications, but just knowing that fact will help understand problems that arise.  It is essential to capture the real-world implications and reasonings as to why something is a certain way.
				</Typography>
				<Box textAlign='center'>
        	<Button size="small" href="/nlp/posts/104">Explore Languages</Button>
				</Box>
			</Paper>

    </React.Fragment>
	);
}
