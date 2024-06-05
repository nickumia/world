import React from "react";
import Typography from "@material-ui/core/Typography";
import Tooltip from '@mui/material/Tooltip';
import cyan from "@material-ui/core/colors/cyan";
import orange from "@material-ui/core/colors/orange";
import brown from "@material-ui/core/colors/brown";

import List from '@mui/material/List';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


import json_parse from './json_parse';


export default function SpiritualTech() {

  return (
    <React.Fragment>
			<Paper
				style={{backgroundColor: 'transparent', marginTop: '10px', paddingTop: '30px'}} sx={{px: 8, py: 4}}>
				<Typography variant="h3">
					SpiritualTech: A Road Trip Across America 🛣️
				</Typography>
				<Typography variant="h6">
          Starting August 2024
				</Typography>
			<Paper
				style={{}} sx={{px: 8}}>
        <div style={{float: 'right', paddingTop: '8px'}}>
        <a href="https://github.com/nickumia/">
          <Chip icon={<GitHubIcon />} label="Github" variant="outlined" />
        </a>&nbsp;
        <a href="https://www.youtube.com/@nickumia">
          <Chip icon={<YouTubeIcon />} label="Youtube" variant="outlined" />
        </a>&nbsp;
        <a href="https://www.linkedin.com/in/nicholas-kumia/">
          <Chip icon={<LinkedInIcon />} label="LinkedIn" variant="outlined" />
        </a>&nbsp;
        <a href="https://www.instagram.com/nickumia/">
          <Chip icon={<InstagramIcon />} label="Instagram" variant="outlined" />
        </a>&nbsp;
        </div>
    <br/><br/><br/><br/><br/><br/>
			</Paper>
    <br/>
				<Typography variant="subtitle2">
          This page will be home to the updates relating to my road trip across America, coined as Spiritual
          Tech.  It's important to understand the meaning behind the naming.  I'm defining <i>spiritual</i> as
          anything that is not physical and my goal is to use technology to connect these spiritual elements to
          create a better tomorrow.  I can't do it alone and I wouldn't want to if I could.  As much freedom as
          there is in doing stuff by yourself, it's way more fun to do it with great company.
				</Typography>
    <br/>
				<Typography variant="subtitle2">
          <b><u>Call to Action</u></b>: Increasing Technology Literacy in Communities Worldwide<br/>
          <b>Sub-Action A.</b> Connecting those fully engrossed in technology with the Real World outside of technology.<br/>
          <b>Sub-Action B.</b> Connecting those removed from technology with the means to understand technology more effectively.<br/>
				</Typography>
    <br/>
				<Typography variant="subtitle2">
          From my career across academia, government and industry, I have found my niche as a Technology
          Integrator. As the world is constantly evolving and technology lifecycles are getting shorter and
          shorter, my goal is help people create a personal understanding of technology to enable a better
          quality of life, on an individual level as well as at a community or organization level.
				</Typography>
    <br/>
				<Typography variant="subtitle2">
          To better understand the current state of how the American people understand and interact with
          technology, I am taking a road trip across America, visiting at least the 48 contiguous states.
          I am interested in learning about how social, economic, cultural and generational conditions
          intersect with technology adoption and use. I believe that technology augments our inherent
          ability and adds value to our existing value.
				</Typography>
    <br/>
				<Typography variant="subtitle2">
          I'd like to meet people to discuss where/when/how/why technology is either helping or failing
          them and offer insight into different ways of understanding and thinking about technology. My
          ultimate goal is spreading Technology Literacy concepts that will help even the playing field
          into the technologically advancing future.  Technology should meet people where they are and
          as such, I will be integrating into communities to learn and grow with them.
				</Typography>
    <br/>
				<Typography variant="subtitle2">
          Check out the trailers for my trip to get a feel for what it'll be like.  If you like it,
          please reach out and let's make some great stuff happen together!
				</Typography>
    <br/>
				<Typography variant="subtitle2">
          <a href="https://www.youtube.com/@nickumia">My YouTube channel</a> is the place to be to watch all
          of the videos 😁<br/>
				</Typography>
    <br/>
<div class="trailer-box">
  <iframe class="trailer" src="https://www.youtube.com/embed/3krSS343lbk?si=4I9YkglByd4xWM0V" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  <iframe class="trailer" src="https://www.youtube.com/embed/KShYdxNg-M0?si=X9dmRb2UMP8MELEw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  <iframe class="trailer" src="https://www.youtube.com/embed/ENl2E1Zihds?si=vBwomldhVnK4CI6A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
    <br/>

				<Typography variant="subtitle2">
          The first map highlights the points of interest that will define the trip.  It ranges from state
          capitals to amusement parks (specifically rollercoaster) to nature pockets (state parks, geographical
          wonders and more) to major tourism spots to historical landmarks (specifically technological ones) to
          spiritual centers and more.  The map is subject to updates (both before the start and during the trip).
				</Typography>
    <br/>
    <Typography variant="subtitle2">
          Feel free to add the map to your favorite map viewer.  It can be exported as KML/KMZ or directly
          imported into google maps.  Sorry Apple users 😣 I don't have a direct solution for you.
				</Typography>
    <br/>

<div class="trailer-box">
  <iframe class="trailer" src="https://www.google.com/maps/d/u/0/embed?mid=1oWfaNPsgA3cwiXu2pXvIBZT81r2FEnQ&ehbc=2E312F"></iframe>
</div>
    <br/>

				<Typography variant="subtitle2">
          The second map is a rough outline of the path that I'll take across America.  It seems like it is
          pretty robust, but it is also subject to change as weather, cultural interactions or other events highlight
          important considerations that affect maneuverability or safety.
				</Typography>
    <br/>

<div class="trailer-box">
  <iframe class="trailer" src="https://www.google.com/maps/d/u/0/embed?mid=1qRUtINRkfm8DJ-hUngADUpqztMpWRF0&ehbc=2E312F"></iframe>
</div>

<br style={{clear: "both"}}/>
			</Paper>

    </React.Fragment>
  );
}
