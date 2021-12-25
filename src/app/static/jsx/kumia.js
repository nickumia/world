import React from "react";

import Paper from '@mui/material/Paper';
import amber from "@material-ui/core/colors/amber";
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


export default function Kumia({pubs, work, edu}) {

	var pubs_list = JSON.parse(pubs);
	var exps_list = JSON.parse(work);
	var edus_list = JSON.parse(edu);
	const [value, setValue] = React.useState('pubs');
	const [content, setContent] = React.useState('');

	React.useEffect(() => {
	  setContent(displayContent(value));
	}, [value, setContent]);

	return (
    <React.Fragment>
			<Paper
				style={{padding: 16, backgroundColor: amber[50]}}>
				<Typography variant="h5">
					Hi, I'm Nicholas Kumia
				</Typography>
				<Typography variant="h6">
					Human
				</Typography>
				<Typography variant="subtitle2">
					Usually, things like this are supposed to outline the "qualifications, merits, et cetera" of an individual. And sure, that stuff will be present. But I wanted to highlight the fact that defining an individual, and by extension anything, as a relation of other distinct things does not necessarily add to the true essence of that person.. or thing.<br/><br/>
					For a while now, I've been struggling with finding a meaning of life that aligns with the experiences of my life... I'll probably continue searching for the rest of my life. If there's one thing that really matters to me, it's that everyone should get the opportunity to apply themselves to their fullest. What does that do for me? Haha good question! Maybe one day I'll be able to answer that.<br/><br/>
					For now, my goal is to ensure that we can still ask questions like that in the future by allowing machines to properly understand our natural language and what connects us as humans. With the very questionable state of Technology, I feel like it is part of my global civic duty to use my knowledge to give the world the opportunity to not be overrun by this "data revolution" ... or any type of change that puts our humanity at stake.<br/>
				</Typography>
			</Paper>
			

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
					<Card sx={{ mb: 2 }} key={exp_list.key}>
						<CardHeader
							title={exp_list.school}
							subheader={exp_list.date} />
						<CardContent>
							<Typography variant="body2" color="textSecondary">
								{exp_list.degree}
							</Typography>
						</CardContent>
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
							title={exp_list.company}
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


