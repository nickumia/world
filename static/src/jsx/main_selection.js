import React from "react";
import Typography from "@material-ui/core/Typography";
import Tooltip from '@mui/material/Tooltip';
import brown from "@material-ui/core/colors/brown";

import Paper from '@mui/material/Paper';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

import json_parse from './json_parse';


export default function NLPSelector({selection}) {

	var selection = json_parse(selection);
	const domain = {
		'Processing': '/static/img/balloons.jpg',
		'Language': '/static/img/mountains.jpg',
		'Natural Core': '/static/img/sunset.jpg'
	};

  return (
    <React.Fragment>
			<Paper
				style={{backgroundColor: brown[50]}} sx={{px: 8, py: 4}}>
				<Typography variant="h5">
					Hi there!
				</Typography>
				<Typography variant="h6">
					This site is dedicated to applying Natural Language Processing for a better world &#128513;
				</Typography>
				<Typography variant="subtitle2">
					<br/>Thanks for taking your time to check out this website.  There are sooo many cool things in the world!  So many things that have worlds of their own.  So many things that unite or clash to form new worlds.  So many things that unknowingly coexist.  As living things, we get to interact with these things and create our own worlds from our experiences.  Please forgive me for my minor abuse of the word 'thing'.  The thing is that there's so much breadth and depth to every aspect of life that it's inefficient to be specific.  On the contrary, it's rather disrespectful to be general.  One of our daily struggles is processing a wealth of information and choosing the right level of detail for each aspect.  <br/><br/>
					Various concepts are explored here that help to formulate the construction, destruction and transformation of our understanding of "things" &#128521;  All of the ideas presented in this journey are based in either the individual realms of 'Processing', 'Language', 'Natural Core' or (more likely) an interaction between them.  The 'Processing' realm deals with the input and output of data through our five (or more?! &#128559;) senses.  The 'Language' realm nurtures the nuances of meaning that have been formed through the establishment of cultures and societies.  The 'Natural Core' realm tears apart the manifestations of the idea to discern the abstract idea that is contained at the core of our communication.  Each of these realms are ever-evolving and, as such, this website is a work in progress.  If one considers the education system, our understanding of the universe has evolved and the knowledge that is taught in schools has been updated accordingly.  Similarly, with more research and more interactions, this website will evolve too!
				</Typography>
			</Paper>
			
			<ImageList sx={{ width: "100%" }} cols={3}>
				{selection.map(selection => (
        	<ImageListItem key={selection.key} style={{ height: "200px" }}>
						<img
  	          src={`${domain[selection.domain]}?fit=crop&auto=format`}
    	        srcSet={`${domain[selection.domain]}?fit=crop&auto=format&dpr=3 3x`}
      	      alt={selection.domain}
							style={{ height: "200px" }}
        	    loading="lazy"
	          />
							<ImageListItemBar
		          	title={selection.liason + "'s " + selection.domain}
		            subtitle={selection.speech}
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
