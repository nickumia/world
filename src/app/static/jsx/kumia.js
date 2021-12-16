import React from "react";

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


export default function Kumia({pubs, work, edu}) {

	var pubs_list = JSON.parse(pubs);
	var work_list = JSON.parse(work);
	var edu_list = JSON.parse(edu);
	const [value, setValue] = React.useState('edus');
	const [content, setContent] = React.useState('');

	React.useEffect(() => {
	  setContent(displayContent(value));
	}, [value, setContent]);

	return (
    <React.Fragment>
			<BottomNavigation
			  showLabels
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
				<Accordion>
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
						<Box sx={{ minWidth: 275 }}>
							<Typography variant="body2"
								dangerouslySetInnerHTML={{__html: pubs_list.support}}>
							</Typography>
				    </Box>
					</AccordionDetails>
				</Accordion>
				))}
				</>
			);
		} else if (tab == "edus") {
			return (<p>edus</p>);
		} else {
			return (<p>exps</p>);
		}
	}
}


