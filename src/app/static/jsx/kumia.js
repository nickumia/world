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

import Chip from '@mui/material/Chip';
import GitHubIcon from '@mui/icons-material/GitHub';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import InstagramIcon from '@mui/icons-material/Instagram';

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
			<div style={{overflow: "hidden", flexGrow: 1, position: "relative"}}>
			<div className={"sidebyside1"}>
			<Paper
				style={{backgroundColor: brown[50]}} sx={{px: 8, py: 4}}>
				<Typography variant="h5"> Hi, I'm Nicholas Kumia </Typography>
				<Typography variant="h6"> Integrator </Typography>
        <div style={{float: 'right'}}>
        <a href="https://github.com/nickumia/">
          <Chip icon={<GitHubIcon />} label="Github" variant="outlined" />
        </a>&nbsp;
        <a href="https://agents.worldfinancialgroup.com/Nicholas-Kumia-92UJS">
          <Chip icon={<MonetizationOnIcon />} label="Financial Services" variant="outlined" />
        </a>&nbsp;
        <a href="https://www.instagram.com/nickumia/">
          <Chip icon={<InstagramIcon />} label="Instagram" variant="outlined" />
        </a>&nbsp;
        </div><br/><br/>
        <img src="/static/img/profile.jpg" style={{width: '100%'}}/>
			</Paper>
			</div><br/>
			<div className={"sidebyside2"}>
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
			</div>
		</React.Fragment>
	);


	function displayContent(tab) {
		if (tab == "pubs") {
			return (
			<>
				{pubs_list.map(pubs_list => (
				<Accordion key={pubs_list.key}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} >
        	<ListItemButton key={pubs_list.key}>
						<ListItemAvatar>
							<Avatar alt={pubs_list.image.split('/')[-1]} src={pubs_list.image} />
						</ListItemAvatar>
          	<ListItemText primary={pubs_list.title} secondary={pubs_list.date + " | " + pubs_list.place} />
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
						<CardMedia component="img" sx={{ width: 151, height: 151, paddingLeft: 1.5 }}
								image={exp_list.image} alt={exp_list.image.split('/')[-1]} />
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<CardHeader title={exp_list.school} subheader={exp_list.date} />
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
				<Accordion key={exp_list.key}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} >
	        	<ListItemButton key={exp_list.key}>
		        	<ListItemText
			        	primary={exp_list.link && <a href={exp_list.link}>{exp_list.company}</a>}
								secondary={exp_list.date}
					      />
						</ListItemButton>
					</AccordionSummary>
					<AccordionDetails>
						<Box sx={{ minWidth: 275, mx: "auto" }}>
							<Typography variant="body2" color="textSecondary"> {exp_list.role} </Typography>
							<Typography variant="body1"
								dangerouslySetInnerHTML={{__html: exp_list.details}}
								>
							</Typography>
				    </Box>
					</AccordionDetails>
				</Accordion>
				))}
			</>
			);
		}
	}
}
