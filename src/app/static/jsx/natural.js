import React from "react";

import Typography from "@material-ui/core/Typography";
import Tooltip from '@mui/material/Tooltip';
import yellow from "@material-ui/core/colors/yellow";
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


export default function Natural({asteroids}) {

	var asteroid_list = JSON.parse(asteroids);
	const pics = {
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
	};

	return (
    <React.Fragment>
			<Paper
				style={{padding: 16, backgroundColor: yellow[50]}}>
				<Typography variant="h5">
					Hmm.. I am <strong>Nick</strong>, the Keeper of the knowledge of the Mode of the Natural Core.
				</Typography>
				<Typography variant="subtitle2">
					You've already met Parry and Lalita.  Being experts in their respective domains, they are both very helpful and informative.  Unfortunately, I am known to disrupt their fluidity because I try to connect them with the ever-changing universe that lies beyond our worlds.  Yes, my domain may be located in the center of those of my friends, but the connection to everything else transcends the material universe and is irrespective of any sort of physical understanding of things.
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
				style={{padding: 16, backgroundColor: yellow[50]}}>
				<Typography variant="h5" align="center">
					What's next?
				</Typography>
				<Typography variant="subtitle1" align="center">
					We still have a long way to go before we can say we understand anything we think we do as humans.  We know so little about our universe, yet we constantly create and indulge in new universes which may or may not be possible.  Our ability to weave together anything and everything makes our existence very dynamic.  We have a word for "<i>everything</i>" and this ability of ours to imagine is only limited by us (when not considering diseases that prohibit mental capacity).  Normally, we don't think of humans as God (and imho we aren't exactly).  But to think we have all of this power.  You should just think about why we could have possibly been given it.  For what reason do we need it.
				</Typography>
			</Paper>

    </React.Fragment>
	);
}
