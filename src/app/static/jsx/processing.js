import React from "react";

import Typography from "@material-ui/core/Typography";
import Tooltip from '@mui/material/Tooltip';

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

						// <Typography variant="h6">
      			// 	welcome to the first abode (:
      			// </Typography>

export default function Processing({asteroids}) {

	var asteroid_list = JSON.parse(asteroids);
	var text_list = asteroid_list[0];
	const basic_text = {
		'Syntax/Grammar': '/static/img/tag.png',
		'Semantics': 'fa-leaf',
		'Pragmatics': 'fa-bicycle'
	};

	return (
    <React.Fragment>
    	<Typography variant="h4">
		  	Hello, I am <strong>Parry</strong>, the Keeper of the knowledge of the Mode of Processing.
      </Typography>
    	<Typography variant="subtitle1">
    		As a Keeper, I merely maintain and distribute the knowledge that was entrusted to me.  You will meet my friends later on who preserve the deeper Modes of NLP.  Together we seek to help foster a world of understanding to bring about peace and harmony between humans and machines.  Prepare yourself mentally and physicially and when you are ready..
      </Typography>

			<hr/>

    	<Typography variant="h4">
				Basic Text
      </Typography>
			<List dense={false}>
	      <ListItemText
					primary="- Machines are very simple.  They are not hardwired with things like feelings, emotions, self-awareness, consciousness..."
				/>
      	<ListItemText
					primary="- Despite the inability of text to store and retain these things, there are many sources of text and writing where these things are perceived and conveyed to some degree.  When reading a book, an article, a blog, there is a \u0022voice\u0022 that is present that influences your understanding of the words used."
				/>
      	<ListItemText
					primary="- The idea is to be able to process the text with an understanding that there is (1) the Intended Meaning and (2) the Perceived Meaning, neither of which may be known at any given time."
				/>
      </List>

			<ImageList sx={{ width: "100%" }} cols={3}>
				{text_list.map(text_list => (
        	<ImageListItem key={text_list.key}>
						<img
  	          src={`${basic_text[text_list.type]}?w=0.33&fit=crop&auto=format`}
    	        srcSet={`${basic_text[text_list.type]}?w=0.33&fit=crop&auto=format&dpr=3 3x`}
      	      alt={basic_text[text_list.type]}
        	    loading="lazy"
	          />
						<ImageListItemBar
	          	title={text_list.type}
	            subtitle={text_list.type}
	            actionIcon={
								<form action={text_list.link}>
								<Tooltip title={`Learn more about ${text_list.type}`}>
	              	<IconButton
	                	sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
		                aria-label={`Learn more about ${text_list.type}`}
										type="submit"
		              >
	  	              <TravelExploreIcon />
										<Typography variant="subtitle2">
											Explore
										</Typography>
	    	          </IconButton>
								</Tooltip>
								</form>
	            }
	          />
          </ImageListItem>
				))}
      </ImageList>
			

			<List dense={false}>
				{text_list.map(text_list => (
        	<ListItemButton component='a' href={text_list.link} key={text_list.key}>
						<ListItemAvatar>
							<Avatar alt={text_list.type} src={basic_text[text_list.type]} />
						</ListItemAvatar>
          	<ListItemText
            	primary={text_list.type}
							secondary={text_list.description}
              />
          </ListItemButton>
				))}
      </List>

    </React.Fragment>
	);
}
