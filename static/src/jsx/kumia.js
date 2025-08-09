import React, { useState } from "react";
import { 
  Paper, 
  Typography, 
  Box, 
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
        <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden' }}>
          {pubs_list.map((pub, index) => (
            <ListItemButton 
              key={index} 
              alignItems="flex-start" 
              component="a" 
              href={pub.link} 
              target="_blank"
              sx={{
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.action.hover,
                },
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                '&:last-child': {
                  borderBottom: 'none',
                },
                py: 2,
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
                      {pub.journal}
                    </Typography>
                  </React.Fragment>
                }
                sx={{ m: 0 }}
              />
            </ListItemButton>
          ))}
        </List>
      );
    } else if (content === 'work') {
      return (
        <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden' }}>
          {exps_list.map((exp, index) => (
            <ListItemButton 
              key={index} 
              alignItems="flex-start"
              sx={{
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.action.hover,
                },
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                '&:last-child': {
                  borderBottom: 'none',
                },
                py: 2,
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography component="div" variant="subtitle1" color="text.primary" sx={{ fontWeight: 500 }}>
                    {exp.role}
                  </Typography>
                  <Typography component="div" variant="body2" color="text.secondary">
                    {exp.duration}
                  </Typography>
                </Box>
                <Typography component="div" variant="body1" color="text.secondary" sx={{ mb: 1.5, fontWeight: 500 }}>
                  {exp.company}
                </Typography>
                <Typography component="div" variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {exp.description}
                </Typography>
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
            </ListItemButton>
          ))}
        </List>
      );
    } else if (content === 'edu') {
      return (
        <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden' }}>
          {edus_list.map((edu, index) => (
            <ListItemButton 
              key={index} 
              alignItems="flex-start"
              sx={{
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.action.hover,
                },
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                '&:last-child': {
                  borderBottom: 'none',
                },
                py: 2,
              }}
            >
              <ListItemAvatar>
                <Avatar 
                  alt={edu.institution} 
                  src={edu.image} 
                  variant="rounded"
                  sx={{ 
                    width: 56, 
                    height: 56, 
                    mr: 2,
                    boxShadow: 1,
                  }}
                />
              </ListItemAvatar>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                  <Typography component="div" variant="subtitle1" color="text.primary" sx={{ fontWeight: 500 }}>
                    {edu.degree}
                  </Typography>
                  <Typography component="div" variant="body2" color="text.secondary">
                    {edu.duration}
                  </Typography>
                </Box>
                <Typography component="div" variant="body1" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                  {edu.institution}
                </Typography>
                {edu.gpa && (
                  <Typography component="div" variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    GPA: {edu.gpa}
                  </Typography>
                )}
                <Typography component="div" variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {edu.description}
                </Typography>
                {edu.courses && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                      Relevant Courses:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {edu.courses.map((course, i) => (
                        <Chip 
                          key={i} 
                          label={course} 
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
                  </Box>
                )}
              </Box>
            </ListItemButton>
          ))}
        </List>
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
          width: { xs: '100%', md: '350px' },
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
