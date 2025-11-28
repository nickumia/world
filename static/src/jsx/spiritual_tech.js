import React from "react";
import { Typography, colors } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
const { cyan, orange, brown } = colors;

import List from '@mui/material/List';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

import json_parse from './json_parse';

export default function SpiritualTech() {

  return (
    <React.Fragment>
      <Paper
        className="mobilec"
        sx={{
          backgroundColor: 'amber.50',
          marginTop: '10px',
          py: 4
        }}
      >
        <Typography variant="h3">
          SpiritualTech: A Road Trip Across America 🛣️
        </Typography>
        <Typography variant="h6">
          August 11th, 2024 - July 7th, 2025
        </Typography>
        <Typography variant="subtitle2">
          The true value of the road trip isn't something that can be easily conveyed.
          It's about seeing the names of the states and seeing more than just characters
          on a page.  Without having gone to see it for themselves, what people think about
          America is simply what they've experienced so far.  No one part of America
          accurately represents the whole.
        </Typography>
        <br/>
        <Grid container spacing={2} sx={{px: 8}}>
          <Grid item xs={12} md={3}>
            <Link href="https://github.com/nickumia/world/issues/131" underline="hover">
              <Button 
                variant="contained" 
                startIcon={<GitHubIcon />} 
                sx={{
                  width: '100%', 
                  height: '100%', 
                  backgroundColor: 'black', 
                  py: 2
                }}
              >
                Github
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} md={3}>
            <Link href="https://www.youtube.com/@nickumia" underline="hover">
              <Button 
                variant="contained" 
                startIcon={<YouTubeIcon />} 
                sx={{
                  width: '100%', 
                  height: '100%', 
                  backgroundColor: 'red', 
                  py: 2
                }}
              >
                YouTube
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} md={3}>
            <Link href="https://www.linkedin.com/in/nicholas-kumia/" underline="hover">
              <Button 
                variant="contained" 
                startIcon={<LinkedInIcon />} 
                sx={{
                  width: '100%', 
                  height: '100%', 
                  backgroundColor: '#0077B5', 
                  py: 2
                }}
              >
                LinkedIn
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} md={3}>
            <Link href="https://www.instagram.com/nickumia/" underline="hover">
              <Button 
                variant="contained" 
                startIcon={<InstagramIcon />} 
                sx={{
                  width: '100%', 
                  height: '100%', 
                  backgroundImage: 'linear-gradient(-135deg, rgb(20, 0, 200), rgb(185, 0, 180), rgb(245, 0, 0))', 
                  py: 2
                }}
              >
                Instagram
              </Button>
            </Link>
          </Grid>
        </Grid>
        <br/>
        <div className="trailer-box">
          <iframe 
            className="trailer" 
            src="https://www.youtube.com/embed/zAJibmxOIUo?si=u3A9q1YOdh_qgIao" 
            title="330 Days Across America: Where the Map Took Me | SpiritualTech" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
          />
        </div>

        {/* Road Trip Updates Section */}
        <div style={{ margin: '20px 0', padding: '15px', border: '0px', textAlign: 'center' }}>
          <ol style={{ paddingLeft: '20px', margin: '10px 0', textAlign: 'center' }}>
            <li style={{ marginBottom: '8px' }}>
              <a href="/keep_notes" style={{ textDecoration: 'none', color: '#1976d2' }}>Update: Digital Notes taken during the trip</a>
              <Typography variant="caption" display="block" color="textSecondary">July 31, 2025</Typography>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <a href="/spiritualtech_being_wrong" style={{ textDecoration: 'none', color: '#1976d2' }}>Update: Reframing the goal</a>
              <Typography variant="caption" display="block" color="textSecondary">August 14, 2025</Typography>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <a href="/spiritualtech/one_year_later" style={{ textDecoration: 'none', color: '#1976d2' }}>Update: Day-by-day One year later</a>
              <Typography variant="caption" display="block" color="textSecondary">August 29, 2025</Typography>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <a href="/struggling_to_return" style={{ textDecoration: 'none', color: '#1976d2' }}>Update: Struggling to return</a>
              <Typography variant="caption" display="block" color="textSecondary">September 7, 2025</Typography>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <a href="/fi_value" style={{ textDecoration: 'none', color: '#1976d2' }}>Update: The True Value of Financial Independence</a>
              <Typography variant="caption" display="block" color="textSecondary">November 18, 2025</Typography>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <a href="/good_and_bad_are_selfish" style={{ textDecoration: 'none', color: '#1976d2' }}>Update: Good and Bad Are Equally Selfish</a>
              <Typography variant="caption" display="block" color="textSecondary">November 24, 2025</Typography>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <a href="/road_change_home" style={{ textDecoration: 'none', color: '#1976d2' }}>Update: When the Road Changes You, but Home Stays the Same</a>
              <Typography variant="caption" display="block" color="textSecondary">November 27, 2025</Typography>
            </li>
          </ol>
        </div>

        <Typography variant="subtitle2">
          This page is home to the updates relating to my road trip across America, coined as SpiritualTech.
          It's important to understand the meaning behind the naming.  I'm defining <i>spiritual</i> as the
          underlying energy that connects us all and my goal is to use technology to connect us together more
          effectively to create a better tomorrow.  There are other terms like, 'Energy-based Tech' or 'Value-based
          Tech' but they don't carry a nice ring to it.  As next gen technology continues to advance in the fields
          of brain interfaces, AI and Quantum, we're going to continue to learn more about what makes us up, what
          makes the universe up and how everything is pieced together.  I can't do this journey alone and I
          wouldn't want to if I could.  As much freedom as there is in doing stuff by yourself, it's way more fun
          to do it with great company.  So join me, reach out, open the conversation in your circles.  Let's talk
          and connect!
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
        <Typography variant="h4">
          Trailers
        </Typography>
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
        <div className="trailer-box">
          <iframe 
            className="trailer" 
            src="https://www.youtube.com/embed/3krSS343lbk?si=4I9YkglByd4xWM0V" 
            title="SpiritualTech | Rose | Adventure Trailer" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
          />
          <iframe 
            className="trailer" 
            src="https://www.youtube.com/embed/KShYdxNg-M0?si=X9dmRb2UMP8MELEw" 
            title="SpiritualTech | Rose | Self Trailer" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
          />
          <iframe 
            className="trailer" 
            src="https://www.youtube.com/embed/ENl2E1Zihds?si=vBwomldhVnK4CI6A" 
            title="SpiritualTech | Rose | Horizon Trailer" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
          />
        </div>
        <br/>

        <Typography variant="h4">
          Maps
        </Typography>
        <Typography variant="subtitle2">
          There are two maps that outline (1) the points of interest that will define the trip and (2) the
          rough path that I'll take across America.  The points of interest range from state capitals to
          amusement parks (specifically rollercoaster) to nature pockets (state parks, geographical
          wonders and more) to major tourism spots to historical landmarks (specifically technological ones) to
          spiritual centers and more.  The map is subject to updates (both before the start and during the trip).
          It seems like the path is pretty robust, but it is also subject to change as weather, cultural
          interactions or other events highlight important considerations that affect maneuverability or safety.
        </Typography>
        <br/>
        <Typography variant="subtitle2">
          Feel free to add the map to your favorite map viewer.  It can be exported as KML/KMZ or directly
          imported into google maps.  Sorry Apple users 😣 I don't have a direct solution for you.
        </Typography>
        <br/>

        <div className="trailer-box">
          <iframe 
            className="trailer" 
            src="https://www.google.com/maps/d/u/0/embed?mid=1oWfaNPsgA3cwiXu2pXvIBZT81r2FEnQ&ehbc=2E312F" 
            frameBorder="0" 
            allowFullScreen
          />
          <iframe 
            className="trailer" 
            src="https://www.google.com/maps/d/u/0/embed?mid=1qRUtINRkfm8DJ-hUngADUpqztMpWRF0&ehbc=2E312F" 
            frameBorder="0" 
            allowFullScreen
          />
        </div>
        <Typography variant="h4">
          Timeline
        </Typography>
        <Timeline position="right">
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 1 | Aug 11 - Aug 20</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Florida | Orlando, Tallahassee, Panama City Beach</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 2 | Aug 20 - Aug 30</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Alabama | Dothan, Montgomery, Mobile</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> Side Quest A | Aug 30 - Sep 02</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Nephew's Christening</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 3 | Sep 02 - Sep 10</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Louisiana | Baton Rouge, Shreveport</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 4 | Sep 09 - Sep 13</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Mississippi | Jackson</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 5 | Sep 13 - Sep 22</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Arkansas | Little Rock, Fort Smith</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 6 | Sep 22 - Sep 28</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Oklahoma | Tulsa, Oklahoma City</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 7 | Sep 28 - Oct 17</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Texas | Dallas, Houston, San Antonio, Austin, Sonora, Alpine, El Paso</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 8 | Oct 17 - Oct 24</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>New Mexico | Riudoso, Albuquerque, Santa Fe</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 9 | Oct 24 - Nov 02</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Colorado | Trinidad, Colorado Springs, Denver</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 10 | Nov 02 - Nov 08</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Wyoming | Cheyenne, Saratoga, Rock Springs</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 11 | Nov 08 - Nov 16</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Utah | Salt Lake City, Moab, Cedar City</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 12 | Nov 16 - Nov 24</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Arizona | Flagstaff, Phoenix, Yuma</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 13 | Nov 24 - Dec 03</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>California | San Diego, Los Angeles</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 14 | Dec 03 - Dec 09</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Nevada | Las Vegas</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> Side Quest B | Dec 09 - Dec 13</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Work/Holiday</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 13 | Dec 13 - Dec 24</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>California | Arroyo, Santa Cruz, San Francisco, Sacramento, Shasta</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 15 | Dec 24 - Dec 29</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Oregon | Roseburg, Salem, Portland</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 16 | Dec 29 - Dec 31</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Washington | Olympia, Seattle</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 17 | Dec 31 - Jan 04</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Alaska | Juneau</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 16 | Jan 04 - Jan 06</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Washington | Richland</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 18 | Jan 06 - Jan 11</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Idaho | Boise, Pocatello</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> Side Quest C | Jan 10</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Circle back to Friend in SLC</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 19 | Jan 11 - Jan 21</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Montana | Yellowstone, Helena, Billings, Miles City</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 20 | Jan 21 - Jan 25</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>North Dakota | Dickinson, Bismarck</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 21 | Jan 25 - Jan 28</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>South Dakota | Sturgis, Pierre</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 22 | Jan 28 - Jan 29</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Minnesota | Minneapolis</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> Side Quest D | Jan 29 - Feb 01</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Family Relocation</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 22 | Feb 01 - Feb 04</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Minnesota | Minneapolis</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 23 | Feb 04 - Feb 09</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Wisconsin | Eau Claire, Madison, Milwaukee</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 24 | Feb 09 - Feb 13</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Illinois | Chicago, Moline</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 25/26 | Feb 13 - Feb 18</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Iowa/Nebraska | Des Moines, Council Bluffs/Omaha</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 26 | Feb 18 - Feb 20</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Nebraska | Lincoln</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 27 | Feb 20 - Feb 22</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Kansas | Topeka</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 28 | Feb 22 - Feb 24</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Missouri | Kansas City</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 24 | Feb 24 - Feb 27</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Illinois | Jefferson City, Springfield</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 28 | Feb 27 - Feb 28</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Missouri | St. Louis</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 29 | Feb 28 - Mar 01</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Kentucky | Paducah</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 30 | Mar 01 - Mar 04</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Tennessee | Nashville</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 29 | Mar 04 - Mar 09</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Kentucky | Bowling Green, Elizabethtown, Louisville, Corbin</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 30 | Mar 09 - Mar 12</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Tennessee | Chattanooga</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 31 | Mar 12 - Mar 14</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Georgia | Atlanta</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> Side Quest E | Mar 14 - Mar 16</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Financial Literacy</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 32 | Mar 16 - Mar 18</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Virginia | Bristol, Richlands</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 33 | Mar 18 - Mar 21</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>West Virginia | Princeton, Charleston, Morgantown</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> Side Quest F | Mar 21 - Mar 25</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Nephew's 1st Birthday</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 34 | Mar 25 - Mar 31</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Pennsylvania | Greentown, Scranton, State College, Pittsburgh</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 35 | Mar 31 - Apr 06</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Ohio | Belmont, Columbus, Monroe, Cincinnati</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> Side Quest G | Apr 06 - Apr 10</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Family Pooja</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 36 | Apr 10 - Apr 13</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Indiana | Indianapolis, Auburn</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 37 | Apr 13 - Apr 16</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Michigan | Lansing, Detroit</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 35 | Apr 16 - Apr 18</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Ohio | Sandusky, Cleveland</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 34 | Apr 18 - Apr 19</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Pennsylvania | Springfield</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 38 | Apr 19 - Apr 24</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>New York | Buffalo, Rochester, Syracuse</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> Side Quest H | Apr 24 - May 08</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Vietnam</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 38 | May 08 - May 11</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>New York | Fort Drum, Lake Placid</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 39 | May 11 - May 13</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Vermont | Montpelier</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 40 | May 13 - May 15</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>New Hampshire | Gorham</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 41 | May 15 - May 16</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Maine | Augusta</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 40 | May 16 - May 17</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>New Hampshire | Seabrook</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 42 | May 17 - May 19</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Massachusetts | Boston</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 43 | May 19 - May 21</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Rhode Island | Providence</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 44 | May 21 - May 23</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Connecticut | Hartford, Danbury</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 38/Side Quest I | May 23 - May 31</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>New York | Long Island</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 45 | May 31 - June 02</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>New Jersey | Edison</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 34 | June 02 - June 05</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Pennsylvania | Morrisville, King of Prussia</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 46 | June 05 - June 09</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Delaware | Newark, Smyrna, Rehoboth Beach</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 47 | June 09 - June 14</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Maryland | Baltimore, Scaggsville</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> US Capitol | June 14 - June 20</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Washington, DC</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 32 | June 20 - June 24</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Virginia | Leesburg, Richmond</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 48 | June 24 - June 29</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>North Carolina | Oxford, Raleigh, Seagrove, Charlotte</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 49 | June 29 - July 02</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>South Carolina | Columbia, Yemassee</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 31 | July 02 - July 04</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Georgia | Savannah</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary"> State 1 | July 04 - July 07</TimelineOppositeContent>
            <TimelineSeparator> <TimelineDot /> <TimelineConnector /> </TimelineSeparator>
            <TimelineContent>Florida | Jacksonville, Home</TimelineContent>
          </TimelineItem>
        </Timeline>
  <br/>
  <br style={{clear: "both"}}/>
  <Typography variant="h4" sx={{ mb: 2 }}>
    FAQs
  </Typography>
  <Accordion sx={{ backgroundColor: 'antiquewhite', mb: 0 }}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1-header">
      <Typography>What is SpiritualTech? What does it mean?</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        SpiritualTech is about spreading Technology Literacy concepts that help
        people use technology to augment the existing value in their lives. Check
        out the{' '}
        <Link href="https://youtube.com/playlist?list=PLOxF6dnRsrVentqaULadb6DZGxApiBiGR" underline="hover">
          full playlist
        </Link>.
        <br/><br/>

          &nbsp;SpiritualTech is about understanding our&nbsp;
          <Link href="https://youtu.be/r9J861e02r0" underline="hover">
            identities
          </Link>.<br/>
          &nbsp;SpiritualTech is about overcoming our&nbsp;
          <Link href="https://youtu.be/LPLgCaxoSeo" underline="hover">
            biases
          </Link>.<br/>
          &nbsp;SpiritualTech is about sharing knowledge, to thrive through failures and
          get to&nbsp;
          <Link href="https://youtu.be/hHhYBAkOP7Y" underline="hover">
            success
          </Link>.<br/>
          &nbsp;SpiritualTech is about connecting us as truth-seeking beings and connecting
          our existences through&nbsp;
          <Link href="https://youtu.be/_jVBB0YQg0U" underline="hover">
            consciousness
          </Link>.<br/>
          &nbsp;SpiritualTech is about cultivating a mindset where we can be a well-organized
          society with a stronger&nbsp;
          <Link href="https://youtu.be/KvDpS3oxvXk" underline="hover">
            learning ability
          </Link>.<br/>
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion sx={{ backgroundColor: 'antiquewhite', mb: 0 }}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel2-header">
      <Typography>If SpiritualTech is all about consciousness, why not call it ConsciousTech?</Typography>
    </AccordionSummary>
    <AccordionDetails>
      While consciousness is a core concept of SpiritualTech,
      the main idea is about finding our own value and connecting
      with others to share that value, using technology as a
      medium.<br/><br/>

      It's not about creating technology that is conscious.
      Being conscious of technology is only important while we
      use technology to create better lives.<br/><br/>

      The truth behind SpiritualTech is in the connection with
      ourselves and with others.  A connection to real life,
      not just focusing on technology.
    </AccordionDetails>
  </Accordion>
  <Accordion sx={{ backgroundColor: 'antiquewhite', mb: 0 }}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel3-header">
      <Typography>Why not include Alaska?  It's drive-able!</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        While it would be super cool to drive to Alaska, it is a 36
        hour one-way detour, adding up to 72 hours total, not counting
        the time spent in the state.  I don't feel up for that in my
        current condition.  But I will consider it depending on how
        the trip goes in general.
      </Typography>
      <img src="/static/img/alaska_detour.jpg" loading="lazy"
        sx={{
          maxWidth: '50%',
          textAlign: 'center',
          padding: 'inherit',
          margin: 'auto',
          display: 'inherit'
        }}/>
    </AccordionDetails>
  </Accordion>
  <Accordion sx={{ backgroundColor: 'antiquewhite', mb: 0 }}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel4-header">
      <Typography>How can I find you?!</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>Look for my car!!</Typography>
      <img src="/static/img/phoenix1.jpg" loading="lazy"
        style={{maxWidth: '50%', textAlign: 'center', padding: 'inherit', margin: 'auto'}}/>
      <img src="/static/img/phoenix2.jpg" loading="lazy"
        sx={{
          maxWidth: '45%',
          textAlign: 'center',
          padding: 'inherit',
          margin: 'auto'
        }}/>
      <img src="/static/img/dragon1.jpg" loading="lazy"
        style={{maxWidth: '50%', textAlign: 'center', padding: 'inherit', margin: 'auto'}}/>
      <img src="/static/img/dragon2.jpg" loading="lazy"
        sx={{
          maxWidth: '45%',
          textAlign: 'center',
          padding: 'inherit',
          margin: 'auto'
        }}/>
      <img src="/static/img/phoenix3.jpg" loading="lazy"
        sx={{
          maxWidth: '70%',
          textAlign: 'center',
          padding: 'inherit',
          margin: 'auto',
          display: 'inherit'
        }}/>
    </AccordionDetails>
  </Accordion>
</Paper>
</React.Fragment>
);
}
