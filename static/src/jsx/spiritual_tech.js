import React from "react";
import Typography from "@material-ui/core/Typography";
import Tooltip from '@mui/material/Tooltip';
import cyan from "@material-ui/core/colors/cyan";
import orange from "@material-ui/core/colors/orange";

import List from '@mui/material/List';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';


import json_parse from './json_parse';


export default function SpiritualTech() {

  return (
    <React.Fragment>
			<Paper
				style={{backgroundColor: cyan[50], marginTop: '10px'}} sx={{px: 8, py: 4}}>
				<Typography variant="h5">
					Spiritual Tech: A Road Trip Across America 🛣️
				</Typography>
				<Typography variant="h6">
          2024
				</Typography>
				<Typography variant="subtitle2">
          This page will be home to the updates relating to my road trip across America, coined as Spiritual
          Tech.  It's important to understand the meaning behind the naming.  I'm defining <i>spiritual</i> as
          anything that is not physical and my goal is to use technology to connect these spiritual elements to
          create a better tomorrow.  I can't do it alone and I wouldn't want to if I could.  As much freedom as
          there is in doing stuff by yourself, it's way more fun to do it with great company.
				</Typography>
				<Typography variant="subtitle2">
          For now, check out the trailers for my trip to get a feel for what it'll be like.  If you like it,
          please reach out and let's make some great stuff happen together!
				</Typography>
				<Typography variant="subtitle2">
          <a href="https://www.youtube.com/@nickumia">My YouTube channel</a> is the place to be to watch all
          of the videos 😁<br/>
				</Typography>
        <iframe style={{marginLeft: 'auto', marginRight: 'auto', display: 'flex'}} src="https://www.youtube.com/embed/3krSS343lbk?si=4I9YkglByd4xWM0V" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
			</Paper>

    </React.Fragment>
  );
}
