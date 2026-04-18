import React from "react";
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { brown } from '@mui/material/colors';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import json_parse from './json_parse';

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'light' 
    ? `linear-gradient(to bottom, ${brown[50]}, ${theme.palette.background.default})`
    : `linear-gradient(to bottom, ${brown[900]}, ${theme.palette.background.default})`,
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  boxShadow: theme.shadows[3],
  '&:hover': {
    boxShadow: theme.shadows[6],
  },
  transition: theme.transitions.create(['box-shadow', 'transform'], {
    duration: theme.transitions.duration.standard,
  }),
}));

const DomainImageList = styled(ImageList)(({ theme }) => ({
  margin: 0,
  gap: theme.spacing(3) + '!important',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)!important',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr!important',
  },
}));

const DomainItem = styled(ImageListItem)(({ theme }) => ({
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
  transition: theme.transitions.create(['transform', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
  }),
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
    '& .MuiImageListItemBar-root': {
      opacity: 1,
    },
  },
  '& .MuiImageListItemBar-root': {
    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0) 100%)',
    opacity: 0.9,
    transition: theme.transitions.create('opacity'),
  },
  '& .MuiImageListItemBar-title': {
    fontWeight: 600,
    fontSize: '1.1rem',
  },
  '& .MuiImageListItemBar-subtitle': {
    color: 'rgba(255,255,255,0.8)',
  },
}));

const ExploreButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  borderColor: 'rgba(255,255,255,0.5)',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderColor: theme.palette.common.white,
  },
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1),
  },
}));

export default function NLPSelector({ selection }) {
  const parsedSelection = json_parse(selection);
  
  const domainImages = {
    'Processing': '/static/img/balloons.jpg',
    'Language': '/static/img/mountains.jpg',
    'Natural Core': '/static/img/sunset.jpg'
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <StyledPaper elevation={0}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            color: 'primary.main',
            mb: 3,
            textAlign: 'center',
          }}
        >
          Welcome to My NLP Journey
        </Typography>
        
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom 
          sx={{ 
            fontWeight: 500,
            mb: 4,
            textAlign: 'center',
            color: 'text.secondary',
          }}
        >
          Exploring the Intersection of Language, Processing, and Core Concepts
        </Typography>
        
        <Typography 
          variant="body1" 
          paragraph 
          sx={{ 
            fontSize: '1.1rem',
            lineHeight: 1.8,
            mb: 3,
          }}
        >
          Thanks for taking your time to check out this website. There are so many fascinating things in the world! 
          Each concept has its own universe, with depth and complexity that often goes unnoticed. As we navigate 
          through life, we interact with these concepts, shaping our understanding and creating our own unique 
          perspectives.
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            fontSize: '1.1rem',
            lineHeight: 1.8,
            mb: 2,
          }}
        >
          This website explores various ideas that help us understand how we construct, deconstruct, and transform 
          our comprehension of complex concepts. These ideas are organized into three interconnected realms:
        </Typography>
        
        <Box component="ul" sx={{ pl: 4, mb: 4 }}>
          <li>
            <Typography component="span" fontWeight="bold">Processing:</Typography>{' '}
            The input and output of data through our five (or more? 😲) senses.
          </li>
          <li>
            <Typography component="span" fontWeight="bold">Language:</Typography>{' '}
            The nuances of meaning shaped by cultures and societies.
          </li>
          <li>
            <Typography component="span" fontWeight="bold">Natural Core:</Typography>{' '}
            The fundamental abstract ideas at the heart of our communication.
          </li>
        </Box>
        
        <Typography 
          variant="body2" 
          sx={{ 
            fontStyle: 'italic',
            color: 'text.secondary',
            textAlign: 'center',
            mt: 4,
            pt: 2,
            borderTop: theme => `1px solid ${theme.palette.divider}`,
          }}
        >
          This website is a living document, evolving with new research and insights. 
          Just as our understanding of the universe grows, so too will this space.
        </Typography>
      </StyledPaper>
      
      <DomainImageList cols={3}>
        {parsedSelection.map((item) => (
          <DomainItem key={item.key}>
            <Box
              component="img"
              src={domainImages[item.domain]}
              srcSet={`${domainImages[item.domain]} 2x`}
              alt={`${item.liason}'s ${item.domain}`}
              loading="lazy"
              sx={{
                height: 300,
                width: '100%',
                objectFit: 'cover',
              }}
            />
            <ImageListItemBar
              title={
                <Typography variant="inherit" component="span">
                  {item.liason}'s {item.domain}
                </Typography>
              }
              subtitle={
                <Typography variant="body2" component="span">
                  {item.speech}
                </Typography>
              }
              actionIcon={
                <Tooltip title={`Explore ${item.liason}'s ${item.domain}`} arrow>
                  <Box component="form" action={item.link} sx={{ display: 'inline' }}>
                    <ExploreButton 
                      variant="outlined" 
                      size="small"
                      type="submit"
                      endIcon={<TravelExploreIcon />}
                    >
                      Explore
                    </ExploreButton>
                  </Box>
                </Tooltip>
              }
              sx={{
                '& .MuiImageListItemBar-actionIcon': {
                  marginRight: 2,
                  marginBottom: 1,
                },
              }}
            />
          </DomainItem>
        ))}
      </DomainImageList>
    </Container>
  );
}
