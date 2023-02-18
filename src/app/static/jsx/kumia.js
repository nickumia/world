import React from "react";

import Paper from '@mui/material/Paper';
import brown from "@material-ui/core/colors/brown";
import Typography from "@material-ui/core/Typography";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SchoolIcon from '@mui/icons-material/School';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import Tooltip from '@mui/material/Tooltip';

import json_parse from './json_parse';


export default function Kumia({pubs, work, edu}) {

	var pubs_list = json_parse(pubs);
	var exps_list = json_parse(work);
	var edus_list = json_parse(edu);
	const [value, setValue] = React.useState('pubs');
	const [content, setContent] = React.useState('');

	React.useEffect(() => {
	  setContent(displayContent(value));
	}, [value, setContent]);

	return (
    <React.Fragment>
			<div style={{position: 'relative', float: "left", width:'50%', overflowY: "scroll"}}>
			<Paper
				style={{backgroundColor: brown[50]}} sx={{px: 8, py: 4}}>
				<Typography variant="h5">
					Hi, I'm Nicholas Kumia
				</Typography>
				<Typography variant="h6">
					Human
				</Typography>
				<Typography variant="subtitle2">
					With each passing moment, life as we know it continues to change.  There's always been the changes that occur as we grow up.  However, the changes I'm referring to are the fact that ... society is growing more divided ... the Earth's health is declining as evident from climate change ... Poverty, Pollution, Crime, War, Inequality, Human Rights attacks, Deteriorating Economies ... the list of terrible changes seems never-ending.  It doesn't mean life is all bad.  It's just really heart-breaking to know that, as a human race, we are failing.<br/><br/>
					With everything that's wrong in the world, I've taken it upon myself to make my disapproval with many of our foundational systems known.  Working is no longer productive, nor is it effective in being the primary means of providing a living.  Education is so fractured that our knowledge transfer rate is nowhere near the level it should be for our level of intelligence.  While I use the term "resume" nostalgically, please do not mistake this part of my website to be an affirmation that I believe in any of the government/academic/corporate institutions in which I have and will continue to exist.  I've had both wonderful and not-so-wonderful experiences on my journey to figure out life and I've met truly extraordinary people along the way.  Ethics aside, there is no right way of living.  No one culture is better than any other culture.  There is no set path to succeed in life.  The optimization problem between working together as a society and growing as an individual is so difficult.<br/><br/>
					I want to highlight the fact that defining an individual, and by extension anything, as a relation of other distinct things does not necessarily add to the true essence of that person.. or thing.  These standardized mechanisms that we have as a society (aptitude tests, certifications, driving tests, working, taxes, et cetera) are important, but they do not define who we are as people.  As a multi-faceted person (just like so many others in the world), I don't believe in judging someone primarily from "qualifications" and "merits" on a piece of paper.<br/><br/>
					As a final point, technology is stretched way past its tangible usefulness.  It is tool that is meant to aid in the amelioration of the world.  It is not a leader that can impart direction and guidance.  It can not yield answers to meaningful questions.  Its unethical use is very much contributing to the deteriorating state of the world.<br/>
				</Typography>
			</Paper>
			</div>
			<div style={{position: 'relative', float: "right", width:'50%', overflowY: "scroll"}}>
			<BottomNavigation
			  value={value}
			  onChange={(event, newValue) => {setValue(newValue);}}
			>
			  <BottomNavigationAction
					label="Publications"
					value="pubs"
					icon={<NewspaperIcon />} />
			  <BottomNavigationAction
					label="Experience"
					value="exps"
					icon={<WorkOutlineIcon />} />
			  <BottomNavigationAction
					label="Education"
					value="edus"
					icon={<SchoolIcon />} />
			</BottomNavigation>
			{content}
			</div>
		</React.Fragment>
	);


	function displayContent(tab) {
		if (tab == "pubs") {
			return (
			<>
				{pubs_list.map(pubs_list => (
				<Accordion key={pubs_list.key}>
					<AccordionSummary
					  expandIcon={<ExpandMoreIcon />}
					  aria-controls="panel1a-content" id="panel1a-header"
					>
        	<ListItemButton key={pubs_list.key}>
						<ListItemAvatar>
							<Avatar alt={pubs_list.image.split('/')[-1]} src={pubs_list.image} />
						</ListItemAvatar>
          	<ListItemText
            	primary={pubs_list.title}
							secondary={pubs_list.date + " | " + pubs_list.place}
              />
          </ListItemButton>
					</AccordionSummary>
					<AccordionDetails>
						<Box sx={{ minWidth: 275, mx: "auto" }}>
							<Typography variant="body2"
								dangerouslySetInnerHTML={{__html: pubs_list.support}}
								align="center">
							</Typography>
				    </Box>
					</AccordionDetails>
				</Accordion>
				))}
				</>
			);
		} else if (tab == "edus") {
			return (
			<>
				{edus_list.map(exp_list => (
					<Card sx={{ mb: 2, display: 'flex' }} key={exp_list.key}>
						<CardMedia
			        component="img"
						  sx={{ width: 151 }}
			        image={exp_list.image}
						  alt={exp_list.image.split('/')[-1]}
			      />
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<CardHeader
								title={exp_list.school}
								subheader={exp_list.date} />
							<CardContent>
								<Tooltip
									title={
										<React.Fragment>
										<Typography variant="body1"
											dangerouslySetInnerHTML={{__html: exp_list.tooltip}}>
										</Typography>
										</React.Fragment>
									} followCursor>
									<Typography variant="body2" color="textSecondary">
										{exp_list.link && <a href={exp_list.link}>{exp_list.degree}</a>}
										{exp_list.link === "" && exp_list.degree}
									</Typography>
								</Tooltip>
							</CardContent>
						</Box>
					</Card>
				))}
			</>
			);
		} else {
			return (
			<>
				{exps_list.map(exp_list => (
					<Card sx={{ mb: 2 }} key={exp_list.key}>
						<CardHeader
							title={exp_list.link && <a href={exp_list.link}>{exp_list.company}</a>}
							subheader={exp_list.date} />
						<CardContent>
							<Typography variant="body2" color="textSecondary">
								{exp_list.role}
							</Typography>
							<Typography variant="body1"
								dangerouslySetInnerHTML={{__html: exp_list.details}}>
							</Typography>
						</CardContent>
					</Card>
				))}
			</>
			);
		}
	}
}


