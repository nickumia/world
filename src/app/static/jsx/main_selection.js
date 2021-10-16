import React from "react";
import Typography from "@material-ui/core/Typography";
import Tooltip from '@mui/material/Tooltip';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';


export default function NLPSelector({selection}) {

	var selection = JSON.parse(selection)
	const domain = {
		'Processing': '/static/img/balloons.jpg',
		'Language': '/static/img/mountains.jpg',
		'Natural Core': '/static/img/sunset.jpg'
	};

  return (
    <React.Fragment>
			<ImageList sx={{ width: "100%" }} cols={3}>
				{selection.map(selection => (
        	<ImageListItem key={selection.key}>
						<img
  	          src={`${domain[selection.domain]}?w=0.33&fit=crop&auto=format`}
    	        srcSet={`${domain[selection.domain]}?w=0.33&fit=crop&auto=format&dpr=3 3x`}
      	      alt={selection.domain}
        	    loading="lazy"
	          />
						<ImageListItemBar
	          	title={selection.liason}
	            subtitle={selection.domain}
	            actionIcon={
								<form action={selection.link}>
								<Tooltip title={`Explore the domain of ${selection.liason}`}>
	              	<IconButton
	                	sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
		                aria-label={`Explore the domain of ${selection.liason}`}
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
    </React.Fragment>
  );
}
