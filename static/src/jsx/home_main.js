import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from "@material-ui/core/Typography";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

const ImageBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: '#000',
  opacity: 0.5,
  transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: 0,
  height: '40vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover': {
    zIndex: 1,
  },
  '&:hover .imageBackdrop': {
    opacity: 0.15,
  },
  '&:hover .imageMarked': {
    opacity: 0,
  },
  '&:hover .imageTitle': {
    border: '4px solid currentColor',
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  '& .imageMarked': {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const images = [
  {
    url: '/static/img/20231018_180624_optimized.jpg',
    title: 'NLP Research',
    width: '30%',
    link: 'nlp',
  },
  {
    url: '/static/img/20231020_142059_optimized.jpg',
    title: 'London 2023',
    width: '40%',
    link: 'london',
  },
  {
    url: '/static/img/20231014_143134_optimized.jpg',
    title: 'Kumia',
    width: '30%',
    link: 'kumia',
  },
  {
    url: '/static/img/20231221_204447_optimized.jpg',
    title: 'New York 2023',
    width: '40%',
    link: 'new_york',
  },
  {
    url: '/static/img/vlogging.png',
    title: 'Vlogging!',
    width: '20%',
    link: 'https://www.youtube.com/@nickumia',
  },
  {
    url: '/static/img/road_trip_main.jpg',
    title: 'Road Trip Across America',
    width: '40%',
    link: 'spiritual-tech',
  },
  {
    url: '/static/img/financial_background.jpg',
    title: 'Financial Resources',
    width: '50%',
    link: 'financial',
  },
  {
    url: '/static/img/spiritual_background.jpg',
    title: 'Hinduism + Spiritual Resources',
    width: '50%',
    link: 'spiritual',
  },
];

// List of all available pages with their display names
const allPages = [
  { id: 'd20141228', name: 'A Beginning (2014)' },
  { id: 'nlp', name: 'NLP Research' },
  { id: 'london', name: 'London 2023' },
  { id: 'kumia', name: 'Kumia' },
  { id: 'new_york', name: 'New York 2023' },
  { id: 'financial', name: 'Financial Resources' },
  { id: 'spiritual', name: 'Hinduism + Spiritual Resources' },
  { id: 'introduction_legacy', name: 'End of the begining... (2018)' },
  { id: 'senses', name: 'Without senses, what would we know?' },
  { id: 'identification', name: 'How do we know speech is speech?' },
  { id: 'universalization', name: 'How is a sense perceived as a sense?' },
  { id: 'languages', name: 'What does it mean to know a language?' },
  { id: 'consciousness', name: 'What is this consciousness idea that we gravitate to?' },
];

export default function HomeMain() {
  // Get IDs of featured pages
  const featuredPageIds = images.map(img =>
    img.link.replace('https://www.youtube.com/@nickumia', 'youtube') // Handle external link
  );

  // Filter out featured pages from all pages
  const nonFeaturedPages = allPages.filter(
    page => !featuredPageIds.some(id => page.id === id || page.id.includes(id))
  );

  return (
    <React.Fragment>
      <Container component="section" sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" marked="center" align="center" component="h2">
          Connecting People through Technology for a Better Tomorrow
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            href={image.link}
            style={{
              width: image.width,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                backgroundImage: `url(${image.url})`,
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'common.white',
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
              >
                {image.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
        </Box>

        {nonFeaturedPages.length > 0 && (
          <Box sx={{
            mt: 8,
            maxWidth: 1100,
            mx: 'auto',
            px: 2
          }}>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              sx={{
                mb: 4,
                fontWeight: 500,
                letterSpacing: '0.5px',
                position: 'relative',
                '&:after': {
                  content: '""',
                  display: 'block',
                  width: 60,
                  height: 3,
                  bgcolor: 'primary.main',
                  mx: 'auto',
                  mt: 1,
                  borderRadius: 2
                }
              }}
            >
              Explore More
            </Typography>
            <List
              component="nav"
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)'
                },
                gap: 2,
                '& .MuiListItem-root': {
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 1
                  }
                }
              }}
            >
              {nonFeaturedPages.map((page) => {
                // Extract first sentence for description
                const description = page.name.split('?')[0] + (page.name.includes('?') ? '?' : '');
                const isQuestion = description.endsWith('?');

                return (
                  <ListItem
                    key={page.id}
                    button
                    component="a"
                    href={`/${page.id}`}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      p: 2,
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      height: '100%',
                      '&:hover': {
                        bgcolor: 'background.paper',
                        borderColor: 'primary.main',
                        '& .MuiListItemText-primary': {
                          color: 'primary.main',
                        }
                      },
                    }}
                  >
                    <ListItemText
                      primary={description}
                      primaryTypographyProps={{
                        variant: 'body1',
                        color: 'text.primary',
                        fontWeight: 500,
                        mb: 1,
                        sx: {
                          transition: 'color 0.2s ease',
                          '&:hover': {
                            color: 'primary.main',
                          }
                        }
                      }}
                      secondary={
                        isQuestion ? (
                          <Box component="span" sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: 'text.secondary',
                            fontSize: '0.8rem',
                            mt: 0.5
                          }}>
                            <Box component="span" sx={{
                              display: 'inline-block',
                              width: 20,
                              height: 1,
                              bgcolor: 'divider',
                              mr: 1
                            }} />
                            {page.name.split('?').slice(1).join('?').trim() || 'Explore more'}
                          </Box>
                        ) : null
                      }
                      secondaryTypographyProps={{
                        variant: 'body2',
                        component: 'div',
                        color: 'text.secondary',
                        sx: {
                          display: 'flex',
                          alignItems: 'center',
                          '&:hover': {
                            color: 'primary.main',
                          }
                        }
                      }}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Box>
        )}
      </Container>
    </React.Fragment>
  );
}
