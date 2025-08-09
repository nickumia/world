import React from "react";
import { Typography, colors } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import List from '@mui/material/List';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { cyan, orange } from '@mui/material/colors';

import json_parse from './json_parse';


export default function NLPMain() {

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, md: 6 },
          m: { xs: 1, md: 2 },
          backgroundColor: (theme) => theme.palette.mode === 'light' ? cyan[50] : theme.palette.background.paper,
          borderRadius: 2,
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)'
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 3
          }}
        >
          Hi there! 👋
        </Typography>
        <Typography 
          variant="h6" 
          component="h2"
          gutterBottom
          sx={{
            mb: 4,
            color: 'text.secondary'
          }}
        >
          This site is dedicated to applying Natural Language Processing for a better world
        </Typography>
        <Typography 
          variant="body1"
          sx={{
            lineHeight: 1.8,
            mb: 3,
            '& a': {
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }
          }}
        >
          Thanks for taking your time to check out this website. There are so many cool things in the world! So many things that have worlds of their own. So many things that unite or clash to form new worlds. So many things that unknowingly coexist. As living things, we get to interact with these things and create our own worlds from our experiences.
          <br/><br/>
          Various concepts are explored here that help to formulate the construction, destruction and transformation of our understanding of "things". All of the ideas presented in this journey are based in either the individual realms of 'Processing', 'Language', 'Natural Core' or (more likely) an interaction between them. The 'Processing' realm deals with the input and output of data through our five (or more?! 🤯) senses. The 'Language' realm nurtures the nuances of meaning that have been formed through the establishment of cultures and societies. The 'Natural Core' realm tears apart the manifestations of the idea to discern the abstract idea that is contained at the core of our communication.
          <br/><br/>
          Each of these realms are ever-evolving and, as such, this website is a work in progress. If one considers the education system, our understanding of the universe has evolved and the knowledge that is taught in schools has been updated accordingly. Similarly, with more research and more interactions, this website will evolve too!
        </Typography>
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h6" component="h3" gutterBottom sx={{ mb: 2, color: 'text.secondary' }}>
          Explore Realms:
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Chip
            avatar={
              <Avatar 
                alt="Parry" 
                src="/static/img/balloons.jpg" 
                sx={{ width: 32, height: 32 }}
              />
            }
            label="Processing"
            component="a"
            href="processing"
            variant="outlined"
            clickable
            sx={{
              px: 2,
              py: 1.5,
              fontSize: '1rem',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 1,
                backgroundColor: (theme) => theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.08)'
              },
              transition: 'all 0.2s ease-in-out'
            }}
          />
          <Chip
            avatar={
              <Avatar 
                alt="Lalita" 
                src="/static/img/mountains.jpg"
                sx={{ width: 32, height: 32 }}
              />
            }
            label="Language"
            component="a"
            href="language"
            variant="outlined"
            clickable
            sx={{
              px: 2,
              py: 1.5,
              fontSize: '1rem',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 1,
                backgroundColor: (theme) => theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.08)'
              },
              transition: 'all 0.2s ease-in-out'
            }}
          />
          <Chip
            avatar={
              <Avatar 
                alt="Nick" 
                src="/static/img/sunset.jpg"
                sx={{ width: 32, height: 32 }}
              />
            }
            label="Natural Core"
            component="a"
            href="natural"
            variant="outlined"
            clickable
            sx={{
              px: 2,
              py: 1.5,
              fontSize: '1rem',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 1,
                backgroundColor: (theme) => theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.08)'
              },
              transition: 'all 0.2s ease-in-out'
            }}
          />
        </Stack>
      </Box>
      </Paper>
    </Box>
  );
}
