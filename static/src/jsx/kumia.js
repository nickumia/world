import React, { useState } from "react";
import { 
  Paper, 
  Typography, 
  Box, 
  Button,
  BottomNavigation, 
  BottomNavigationAction,
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  Chip,
  Tooltip,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { brown } from '@mui/material/colors';
import {
  ExpandMore as ExpandMoreIcon,
  Newspaper as NewspaperIcon,
  WorkOutline as WorkOutlineIcon,
  School as SchoolIcon,
  GitHub as GitHubIcon,
  YouTube as YouTubeIcon,
  MonetizationOn as MonetizationOnIcon,
  Instagram as InstagramIcon
} from '@mui/icons-material';

import json_parse from './json_parse';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

export default function Kumia({ pubs, work, edu }) {
  const theme = useTheme();
  const [value, setValue] = useState('pubs');
  const [expanded, setExpanded] = useState(false);
  const [content, setContent] = useState('');
  
  const pubs_list = json_parse(pubs);
  const exps_list = json_parse(work);
  const edus_list = json_parse(edu);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  React.useEffect(() => {
    setContent(displayContent(value));
  }, [value, setContent]);

  const displayContent = (content) => {
    if (content === 'pubs') {
      return (
        <>
          {pubs_list.map((pub, index) => (
            <Accordion key={index} sx={{ mb: 1, boxShadow: 1, '&:before': { display: 'none' } }}>
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  '& .MuiAccordionSummary-content': {
                    alignItems: 'center',
                  },
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.action.hover,
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar 
                    alt={pub.title} 
                    src={pub.image} 
                    variant="rounded" 
                    sx={{ 
                      width: 56, 
                      height: 56, 
                      mr: 2,
                      boxShadow: 1,
                    }} 
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography 
                      variant="subtitle1" 
                      component="div"
                      sx={{ 
                        fontWeight: 500,
                        mb: 0.5,
                        lineHeight: 1.3
                      }}
                    >
                      {pub.title}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                        sx={{ display: 'block', mb: 0.5 }}
                      >
                        {pub.authors}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ 
                          fontStyle: 'italic',
                          display: 'block',
                          lineHeight: 1.4
                        }}
                      >
                        {pub.date + " | " + pub.place}
                      </Typography>
                    </React.Fragment>
                  }
                  sx={{ m: 0 }}
                />
              </AccordionSummary>
              <AccordionDetails sx={{ bgcolor: 'background.paper' }}>
                <Box sx={{ width: '100%', p: 2 }}>
                  <Typography 
                    variant="body2" 
                    component="div"
                    dangerouslySetInnerHTML={{__html: pub.support || 'No additional information available.'}}
                    align="center"
                  />
                  {pub.link && (
                    <Button 
                      href={pub.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      color="primary"
                      size="small"
                      sx={{ mt: 2 }}
                    >
                      View Publication
                    </Button>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      );
    } else if (content === 'work') {
      return (
        <>
          {exps_list.map((exp, index) => (
            <Accordion key={index} sx={{ mb: 1, boxShadow: 1, '&:before': { display: 'none' } }}>
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.action.hover,
                  },
                }}
              >
                <Box sx={{ width: '100%' }}>
                    <Typography component="div" variant="subtitle1" color="text.primary" sx={{ fontWeight: 500 }}>
                    {exp.link && <a href={exp.link}>{exp.company}</a>}
                    </Typography>
                    <Typography component="div" variant="body2" color="text.secondary">
                      {exp.date}
                    </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ bgcolor: 'background.paper' }}>
                <Box sx={{ width: '100%', p: 2 }}>
                  <Typography component="div" variant="body1" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                    {exp.role}
                  </Typography>
                  <Typography 
                    component="div" 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ lineHeight: 1.6, mb: 2 }}
                    dangerouslySetInnerHTML={{__html: exp.details}}
                  />
                  {exp.skills && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                      {exp.skills.map((skill, i) => (
                        <Chip 
                          key={i} 
                          label={skill} 
                          size="small" 
                          variant="outlined"
                          sx={{
                            fontSize: '0.7rem',
                            height: 24,
                            '& .MuiChip-label': {
                              px: 1,
                            },
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      );
    } else if (content === 'edu') {
      return (
        <>
          {edus_list.map((edu, index) => (
            <Card key={index} sx={{ mb: 2, display: 'flex', boxShadow: 1, '&:last-child': { mb: 0 } }}>
              <CardMedia 
                component="img" 
                sx={{ 
                  width: 151, 
                  height: 151, 
                  objectFit: 'contain',
                  p: 2,
                  bgcolor: 'background.paper'
                }}
                image={edu.image} 
                alt={edu.image.split('/')[-1]}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <CardHeader 
                  title={edu.institution} 
                  subheader={edu.duration}
                  titleTypographyProps={{ variant: 'h6' }}
                  sx={{ 
                    pb: 1, 
                    '& .MuiCardHeader-subheader': {
                      color: 'text.secondary'
                    }
                  }}
                />
                <CardContent sx={{ pt: 1, pb: '16px !important' }}>
                  <Tooltip
                    title={
                      <React.Fragment>
                        <Typography variant="body1" component="div" dangerouslySetInnerHTML={{__html: edu.tooltip || 'No description available'}} />
                        
                      </React.Fragment>
                    }
                    arrow
                    placement="top"
                    componentsProps={{
                      tooltip: {
                        sx: {
                          maxWidth: 400,
                          bgcolor: 'background.paper',
                          color: 'text.primary',
                          border: '1px solid',
                          borderColor: 'divider',
                          boxShadow: 3,
                          p: 2,
                        },
                      },
                    }}
                  >
                    <Typography variant="body1" component="div">
                      {edu.link ? (
                        <a href={edu.link} style={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                          {edu.degree}
                        </a>
                      ) : (
                        <span>{edu.degree}</span>
                      )}
                    </Typography>
                  </Tooltip>
                </CardContent>
              </Box>
            </Card>
          ))}
        </>
      );
    }
  }

  return (
    <Box 
      sx={{ 
        overflow: 'hidden', 
        flexGrow: 1, 
        position: 'relative',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 2, md: 4 },
        p: { xs: 2, md: 4 },
        maxWidth: '1600px',
        mx: 'auto',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      {/* Left Column - Profile */}
      <Box 
        sx={{ 
          width: { xs: '100%', md: '35%' },
          flexShrink: 0,
          position: 'relative',
          mb: { xs: 3, md: 0 }
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 3,
            backgroundColor: (theme) => theme.palette.mode === 'light' ? brown[50] : 'rgba(121, 85, 72, 0.12)',
            borderRadius: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
              Nicholas Kumia
            </Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: 'text.secondary',
                mb: 2,
                fontWeight: 500
              }}
            >
              Integrator
            </Typography>
            
            <Box 
              sx={{ 
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 1,
                mb: 3
              }}
            >
              {[
                { icon: <GitHubIcon />, label: 'GitHub', href: 'https://github.com/nickumia/' },
                { icon: <YouTubeIcon />, label: 'YouTube', href: 'https://www.youtube.com/@nickumia' },
                { icon: <MonetizationOnIcon />, label: 'Financial', href: 'https://agents.worldfinancialgroup.com/Nicholas-Kumia-92UJS' },
                { icon: <InstagramIcon />, label: 'Instagram', href: 'https://www.instagram.com/nickumia/' }
              ].map((item, index) => (
                <Tooltip key={index} title={item.label} arrow>
                  <IconButton 
                    component="a" 
                    href={item.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'primary.main',
                        backgroundColor: (theme) => theme.palette.mode === 'light' 
                          ? 'rgba(0, 0, 0, 0.04)' 
                          : 'rgba(255, 255, 255, 0.08)'
                      }
                    }}
                  >
                    {item.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Box>
            
            <Box 
              component="img" 
              src="/static/img/profile.jpg" 
              alt="Nicholas Kumia"
              sx={{
                width: '100%',
                maxWidth: '300px',
                borderRadius: 2,
                boxShadow: 3,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)'
                }
              }}
            />
          </Box>
        </Paper>
      </Box>
      
      {/* Right Column - Content */}
      <Box 
        sx={{ 
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Paper 
          elevation={0}
          sx={{
            mb: 3,
            borderRadius: 2,
            overflow: 'hidden',
            border: (theme) => `1px solid ${theme.palette.divider}`,
            backgroundColor: 'background.paper'
          }}
        >
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
            sx={{
              '& .MuiBottomNavigationAction-root': {
                minWidth: 'auto',
                px: 2,
                '&.Mui-selected': {
                  color: 'primary.main',
                  '& .MuiSvgIcon-root': {
                    color: 'primary.main'
                  }
                },
                '& .MuiSvgIcon-root': {
                  fontSize: '1.5rem',
                  mb: 0.5
                }
              }
            }}
          >
            <BottomNavigationAction
              label="Publications"
              value="pubs"
              icon={<NewspaperIcon />}
              showLabel
            />
            <BottomNavigationAction
              label="Experience"
              value="work"
              icon={<WorkOutlineIcon />}
              showLabel
            />
            <BottomNavigationAction
              label="Education"
              value="edu"
              icon={<SchoolIcon />}
              showLabel
            />
          </BottomNavigation>
        </Paper>
        
        <Box sx={{ flex: 1 }}>
          {content}
        </Box>
      </Box>
    </Box>
  );
}
