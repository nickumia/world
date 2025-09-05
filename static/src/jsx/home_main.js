import * as React from 'react';
import { 
  styled,
  Box,
  ButtonBase,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Link,
  Divider,
  useTheme
} from '@mui/material';

import json_parse from './json_parse';

// Styled components for the image gallery
const ImageBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: '#000',
  opacity: 0.5,
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  height: '40vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageTitle = styled(Typography)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(2, 4, 1.5),
  color: theme.palette.common.white,
  textShadow: '0 2px 4px rgba(0,0,0,0.5)',
  '&:hover': {
    color: theme.palette.primary.light,
  },
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

const images = [
  {
    url: '/static/img/2025_vietnam.jpg',
    title: 'Vietnam 2025',
    width: '30%',
    link: '2025_vietnam',
  },
  {
    url: '/static/img/20231014_143134_optimized.jpg',
    title: 'Kumia',
    width: '40%',
    link: 'kumia',
  },
  {
    url: '/static/img/20231221_204447_optimized.jpg',
    title: 'New York 2023',
    width: '30%',
    link: 'new_york',
  },
  {
    url: '/static/img/20231020_142059_optimized.jpg',
    title: 'London 2023',
    width: '40%',
    link: 'london',
  },
  {
    url: '/static/img/vlogging.png',
    title: 'Vlogging!',
    width: '20%',
    link: 'https://www.youtube.com/@nickumia',
  },
  {
    url: '/static/img/road_trip_main.jpg',
    title: 'US Road Trip 2024 - 2025',
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
  // {
  //   url: '/static/img/20231018_180624_optimized.jpg',
  //   title: 'NLP Research',
  //   width: '30%',
  //   link: 'nlp',
  // },
];

/**
 * HomeMain - Main landing page component
 * @param {Object} props - Component props
 * @param {Array} props.pages - Array of page objects with id and name
 * @returns {JSX.Element} The rendered component
 */
// Main component for the home page
export default function HomeMain({ allPages }) {
  const theme = useTheme();
  const allPages_list = json_parse(allPages);

  // Get IDs of featured pages
  const featuredPageIds = images.map(img =>
    img.link.replace('https://www.youtube.com/@nickumia', 'youtube') // Handle external link
  );

  // Filter out featured pages from all pages
  const nonFeaturedPages = React.useMemo(() => 
    allPages_list.filter(
      page => !featuredPageIds.some(id => page.id === id)
    ),
    [allPages_list, featuredPageIds]
  );

  return (
    <Container component="main" sx={{ mt: { xs: 4, md: 8 }, mb: 6 }}>
      <Typography 
        variant="h4" 
        align="center" 
        component="h1"
        sx={{
          mb: 4,
          fontWeight: 700,
          color: 'primary.main',
          [theme.breakpoints.down('sm')]: {
            fontSize: '1.75rem',
          },
        }}
      >
        Connecting People through Technology for a Better Tomorrow
      </Typography>
      
      {/* Featured Images Grid */}
      <Box 
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          gap: 0,
          borderRadius: 0,
          '& > *': {
            flex: '0 0 auto',
            borderRadius: 0,
          },
        }}
      >
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            href={image.link}
            target={image.link.startsWith('http') ? '_blank' : '_self'}
            rel={image.link.startsWith('http') ? 'noopener noreferrer' : undefined}
            sx={{
              width: { xs: '100%', md: image.width },
              height: { xs: 200, md: '40vh' },
              flex: '0 0 auto',
              maxWidth: '100%',
              borderRadius: 0,
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
                backgroundPosition: 'center',
                backgroundImage: `url(${image.url})`,
                borderRadius: 0,
                transition: theme.transitions.create('transform', {
                  duration: theme.transitions.duration.complex,
                }),
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            />
            <ImageBackdrop className="MuiImageBackdrop-root" />
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
                borderRadius: 0,
              }}
            >
              <ImageTitle variant="h6" component="h2">
                {image.title}
                <ImageMarked className="MuiImageMarked-root" />
              </ImageTitle>
            </Box>
          </ImageIconButton>
        ))}
      </Box>

      {/* Non-Featured Pages Section */}
      {nonFeaturedPages.length > 0 && (
        <Box 
          component="section"
          sx={{
            mt: 10,
            maxWidth: 1200,
            mx: 'auto',
            px: { xs: 2, sm: 3 },
          }}
        >
          <Typography
            variant="h5"
            align="center"
            sx={{
              mb: 6,
              fontWeight: 600,
              letterSpacing: '0.5px',
              position: 'relative',
              color: 'text.primary',
              '&:after': {
                content: '""',
                display: 'block',
                width: 60,
                height: 4,
                bgcolor: 'primary.main',
                mx: 'auto',
                mt: 2,
                borderRadius: 2,
                opacity: 0.8,
              },
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
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
              gap: 2,
              '& .MuiListItem-root': {
                transition: theme.transitions.create(['transform', 'box-shadow'], {
                  duration: theme.transitions.duration.shorter,
                }),
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                },
              },
            }}
          >
            {nonFeaturedPages.map((page) => (
              <ListItem
                key={page.id}
                button
                component="a"
                href={`/${page.id}`}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  p: 2.5,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  height: '100%',
                  minHeight: 120,
                  '&:hover': {
                    bgcolor: 'background.paper',
                    borderColor: 'primary.light',
                    '& .MuiListItemText-primary': {
                      color: 'primary.main',
                    },
                    '& .MuiListItemText-secondary': {
                      color: 'primary.light',
                    },
                  },
                }}
              >
                <Box sx={{ m: 0, width: '100%' }}>
                  <ListItemText
                    primary={page.name}
                    primaryTypographyProps={{
                      variant: 'subtitle1',
                      fontWeight: 500,
                      component: 'h3',
                    }}
                    secondary={
                      page.date && (
                        <Box 
                          component="span" 
                          sx={{
                            display: 'block',
                            fontSize: '0.75rem',
                            color: 'text.secondary',
                            fontStyle: 'italic',
                            mt: 0.5,
                            transition: 'color 0.2s ease',
                          }}
                        >
                          {page.date}
                        </Box>
                      )
                    }
                  />
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Container>
  );
}
