import React from "react";
import { Typography, colors } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

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

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import json_parse from './json_parse';


export default function Realm({domain, asteroids}) {

	var domain_specifics = json_parse(domain);
	var asteroid_list = json_parse(asteroids);
	const pics = {
		'Basic Text': '/static/img/writing.png',
		'Speech Audio': '/static/img/audio.png',
		'Seeing the World': '/static/img/camera.png',
		'Syntax/Grammar': '/static/img/tag.png',
		'Semantics': '/static/img/leaf.png',
		'Pragmatics': '/static/img/bike.png',
		'Phonetics': '/static/img/bell.png',
		'Phonology': '/static/img/comment.png',
		'Morphology': '/static/img/comments.png',
		'Real-world Objects': '/static/img/flash.png',
		'Reference Clues': '/static/img/arrows.png',
		'Object Definitions / Relations': '/static/img/heartbeat.png',

		'Aspects of Language': '/static/img/language_2.png',
		'Languages vs. Dialects': '/static/img/dialects.jpg',
		'Language Structure': '/static/img/db.png',
		'Language Use': '/static/img/road.png',
		'Language Expansion': '/static/img/growth.png',
		'Generality': '/static/img/general.png',
		'Specialization': '/static/img/special.png',
		'Known / Unknown Side Effects': '/static/img/unknown.png',

		'Expanding Knowledge': '/static/img/spark.gif',
		'Energy Flow': '/static/img/energy.gif',
		'The Four Element Model': '/static/img/four_elements.jpg',
		'The Self': '/static/img/self.png',
		'The Group': '/static/img/group.png',
		'The System': '/static/img/system.png',
		'Potential Energy': '/static/img/battery.png',
		'Kinetic Energy': '/static/img/wifi.png',
		'Physical-Metaphysical Interaction': '/static/img/key.png',
		'Water': '/static/img/water.png',
		'Earth': '/static/img/earth.png',
		'Fire': '/static/img/fire.png',
		'Air': '/static/img/air.png',

		'processing': '/static/img/balloons.jpg',
		'language': '/static/img/mountains.jpg',
		'natural': '/static/img/sunset.jpg'
	};

	const paperContainerSx = {
    backgroundImage: `url(${pics[domain_specifics[0]]})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    opacity: 0.7,
  };

  const transparentSx = {
    backgroundColor: 'rgba(18,18,18,0.6)',
  };

  const transparentFullSx = {
    backgroundColor: 'rgba(255,255,255,0)',
  };

	return (
    <Box 
      sx={{
        ...paperContainerSx,
        minHeight: '100vh',
        backgroundAttachment: 'fixed'
      }}
    >
      <React.Fragment>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 3,
            backgroundColor: 'background.paper',
            backgroundImage: 'none',
            borderRadius: 2,
            boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)'
          }}
        >
          <Typography 
            variant="h4"
            component="h1"
            gutterBottom
            dangerouslySetInnerHTML={{__html: domain_specifics[1]}}
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 2
            }}
          />
          <Typography 
            variant="subtitle1"
            color="text.secondary"
            sx={{
              lineHeight: 1.6,
              fontSize: '1.1rem'
            }}
          >
            {domain_specifics[2]}
          </Typography>



			{asteroid_list.map(asteroid => (
        <Accordion 
          key={asteroid.key} 
          sx={{
            backgroundColor: 'rgba(18,18,18,0.6)',
            mb: 1
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon color="secondary" />}
            aria-controls={`${asteroid.key}-content`}
            id={`${asteroid.key}-header`}
          >
            <Typography variant="h6" color="secondary">
              {asteroid.type}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ minWidth: 275 }}>
              <Card 
                variant="outlined" 
                sx={{ 
                  display: 'flex',
                  backgroundColor: 'rgba(255,255,255,0)'
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="secondary" gutterBottom>
                      <b>{asteroid.phrase}</b>
                    </Typography>
                    <Typography 
                      variant="body2"
                      dangerouslySetInnerHTML={{__html: asteroid.description}}
                      color="text.secondary"
                    />
                  </CardContent>
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 1/3, objectFit: 'cover' }}
                  image={pics[asteroid.type]}
                  alt={asteroid.type}
                />
              </Card>
            </Box>
						<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {asteroid.subject.map(subject => (
                <ListItemButton 
                  component="a" 
                  href={subject.link} 
                  key={subject.key}
                  sx={{ 
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)'
                    }
                  }}
                >
                  <ListItemAvatar>
                    <Avatar 
                      alt={subject.type} 
                      src={pics[subject.type]} 
                      sx={{ 
                        width: 40, 
                        height: 40,
                        border: '1px solid rgba(255, 255, 255, 0.23)'
                      }} 
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography 
                        variant="subtitle2" 
                        color="secondary"
                        sx={{ fontWeight: 'medium' }}
                      >
                        {subject.type}
                      </Typography>
                    }
                    secondary={
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {subject.description}
                      </Typography>
                    }
                    sx={{ my: 0 }}
                  />
                </ListItemButton>
              ))}
            </List>
					</AccordionDetails>
				</Accordion>
			))}


        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 4 },
            mt: 4,
            textAlign: 'center',
            backgroundColor: (theme) => theme.palette.mode === 'light' ? 'background.paper' : 'rgba(255, 255, 255, 0.05)',
            backgroundImage: 'none',
            borderRadius: 2,
            boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
            border: (theme) => `1px solid ${theme.palette.divider}`,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 24px 0 rgba(0,0,0,0.15)'
            }
          }}
        >
          <Typography 
            variant="h5" 
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: 'primary.main',
              fontSize: { xs: '1.5rem', sm: '1.75rem' },
              mb: 2
            }}
          >
            {domain_specifics[3]}
          </Typography>
          <Typography 
            variant="subtitle1"
            color="text.secondary"
            sx={{
              mb: 3,
              lineHeight: 1.7,
              fontSize: { xs: '1rem', sm: '1.1rem' },
              maxWidth: '800px',
              mx: 'auto',
              '& a': {
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }
            }}
          >
            {domain_specifics[4]}
          </Typography>
          <Box sx={{ 
            mt: 2,
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            flexWrap: 'wrap'
          }}>
            <Button 
              size="large" 
              href="/nlp/posts/101"
              variant="contained"
              color="primary"
              startIcon={<TravelExploreIcon />}
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 2,
                minWidth: '200px',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4
                },
                transition: 'all 0.2s ease-in-out',
                fontSize: '1rem'
              }}
            >
              Explore Senses
            </Button>
            <Button 
              size="large" 
              href="/nlp/"
              variant="outlined"
              color="primary"
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 500,
                textTransform: 'none',
                borderRadius: 2,
                minWidth: '200px',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  backgroundColor: (theme) => theme.palette.mode === 'light' 
                    ? 'rgba(25, 118, 210, 0.04)' 
                    : 'rgba(144, 202, 249, 0.08)'
                },
                transition: 'all 0.2s ease-in-out',
                fontSize: '1rem'
              }}
            >
              Back to Home
            </Button>
          </Box>
        </Paper>
		</Paper>
      </React.Fragment>
    </Box>
  );
}
