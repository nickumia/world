import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Fade,
  Zoom,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Timeline as TimelineIcon,
  Psychology as PsychologyIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Explore as ExploreIcon,
  Favorite as FavoriteIcon
} from '@mui/icons-material';

// Career advice themes
const CAREER_THEMES = {
  identity: {
    title: "Who You Are",
    icon: PsychologyIcon,
    color: "#8b5cf6",
    description: "Understanding yourself before choosing a path"
  },
  exploration: {
    title: "Exploring Possibilities",
    icon: ExploreIcon,
    color: "#06b6d4",
    description: "Discovering what interests you"
  },
  skills: {
    title: "Building Skills",
    icon: SchoolIcon,
    color: "#10b981",
    description: "Developing what you'll need"
  },
  reality: {
    title: "Real World Context",
    icon: WorkIcon,
    color: "#f59e0b",
    description: "How careers actually work"
  },
  balance: {
    title: "Life Integration",
    icon: FavoriteIcon,
    color: "#ec4899",
    description: "Career in the context of your whole life"
  }
};

// Styled components
const CentralPoint = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 120,
  height: 120,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '18px',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: theme.shadows[8],
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[12],
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    border: '2px solid rgba(59, 130, 246, 0.3)',
    borderRadius: '50%',
    animation: 'pulse 2s infinite',
  },
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)', opacity: 1 },
    '100%': { transform: 'scale(1.1)', opacity: 0 },
  },
}));

const PathBranch = styled(Box)(({ theme, isChosen, isDead, branchIndex }) => ({
  position: 'absolute',
  width: 4,
  backgroundColor: isChosen ? '#10b981' : isDead ? '#ef4444' : '#94a3b8',
  borderRadius: 2,
  transition: 'all 0.3s ease',
  opacity: isDead ? 0.3 : 1,
  transform: `rotate(${branchIndex * 45}deg)`,
  transformOrigin: 'top center',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 12,
    height: 12,
    borderRadius: '50%',
    backgroundColor: isChosen ? '#10b981' : isDead ? '#ef4444' : '#94a3b8',
  },
}));

const CarriedItem = styled(Chip)(({ theme, themeColor }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: themeColor,
  color: 'white',
  fontSize: '0.75rem',
  '& .MuiChip-icon': {
    color: 'white',
  },
}));

const CareerJourney = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentView, setCurrentView] = useState('present'); // 'past', 'present', 'future'
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [carriedChoices, setCarriedChoices] = useState([]);

  const handleThemeSelect = (themeId) => {
    setSelectedTheme(themeId);
  };

  const handleCarryChoice = (choice) => {
    if (carriedChoices.find(c => c.id === choice.id)) {
      setCarriedChoices(carriedChoices.filter(c => c.id !== choice.id));
    } else {
      setCarriedChoices([...carriedChoices, choice]);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      py: 4,
      px: 2
    }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
          Your Career Journey
        </Typography>
        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)' }}>
          Explore how career choices shape your future
        </Typography>
      </Box>

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        {['past', 'present', 'future'].map((view) => (
          <Button
            key={view}
            variant={currentView === view ? 'contained' : 'outlined'}
            onClick={() => setCurrentView(view)}
            sx={{
              mx: 1,
              color: currentView === view ? 'white' : 'rgba(255,255,255,0.7)',
              borderColor: 'rgba(255,255,255,0.3)',
              '&:hover': {
                borderColor: 'rgba(255,255,255,0.5)',
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </Button>
        ))}
      </Box>

      {/* Main Visual */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        minHeight: '400px',
        mb: 4
      }}>
        {/* Central Point - Today */}
        <Fade in={currentView === 'present'} timeout={500}>
          <CentralPoint>
            TODAY
          </CentralPoint>
        </Fade>

        {/* Past Paths (when viewing past) */}
        {currentView === 'past' && (
          <Fade in={true} timeout={300}>
            <Box sx={{ position: 'absolute', left: '20%', transform: 'translateX(-50%)' }}>
              <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                Paths You Left Behind
              </Typography>
              {['Traditional College', 'Gap Year', 'Trade School'].map((path, index) => (
                <Paper
                  key={path}
                  elevation={3}
                  sx={{
                    p: 2,
                    mb: 1,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    borderLeft: '4px solid #ef4444',
                    opacity: 0.7
                  }}
                >
                  <Typography variant="body2">{path}</Typography>
                </Paper>
              ))}
            </Box>
          </Fade>
        )}

        {/* Future Branches (when viewing future) */}
        {currentView === 'future' && (
          <Fade in={true} timeout={300}>
            <Box sx={{ position: 'absolute', right: '20%', transform: 'translateX(50%)' }}>
              <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                Possible Futures
              </Typography>
              {Object.entries(CAREER_THEMES).map(([key, theme]) => {
                const IconComponent = theme.icon;
                return (
                  <Paper
                    key={key}
                    elevation={3}
                    sx={{
                      p: 2,
                      mb: 1,
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      cursor: 'pointer',
                      borderLeft: `4px solid ${theme.color}`,
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.2)',
                      },
                    }}
                    onClick={() => handleThemeSelect(key)}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconComponent sx={{ mr: 1 }} />
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          {theme.title}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          {theme.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                );
              })}
            </Box>
          </Fade>
        )}
      </Box>

      {/* Carried Choices Display */}
      {carriedChoices.length > 0 && (
        <Fade in={true} timeout={300}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
              What You're Carrying Forward
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {carriedChoices.map((choice) => (
                <CarriedItem
                  key={choice.id}
                  icon={React.createElement(CAREER_THEMES[choice.theme]?.icon || PsychologyIcon)}
                  label={choice.title}
                  themeColor={CAREER_THEMES[choice.theme]?.color || '#666'}
                  onDelete={() => handleCarryChoice(choice)}
                />
              ))}
            </Box>
          </Box>
        </Fade>
      )}

      {/* Theme Detail View */}
      {selectedTheme && (
        <Zoom in={true}>
          <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>
                {CAREER_THEMES[selectedTheme].title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {CAREER_THEMES[selectedTheme].description}
              </Typography>

              <Typography variant="h6" sx={{ mb: 2 }}>
                Key Advice Points
              </Typography>

              {/* Placeholder for advice points - will be filled in later */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { id: 1, title: "Understand yourself first", theme: selectedTheme },
                  { id: 2, title: "Explore multiple options", theme: selectedTheme },
                  { id: 3, title: "Build practical skills", theme: selectedTheme },
                  { id: 4, title: "Consider long-term impact", theme: selectedTheme }
                ].map((advice) => (
                  <Paper
                    key={advice.id}
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      borderLeft: `4px solid ${CAREER_THEMES[selectedTheme].color}`,
                      '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
                    }}
                    onClick={() => handleCarryChoice(advice)}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body1">{advice.title}</Typography>
                      {carriedChoices.find(c => c.id === advice.id) && (
                        <Chip size="small" label="Carried" color="success" />
                      )}
                    </Box>
                  </Paper>
                ))}
              </Box>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button
                  variant="outlined"
                  onClick={() => setSelectedTheme(null)}
                >
                  Back to Overview
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Zoom>
      )}

      {/* Footer */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
          Click on themes to explore career advice • Choose what to carry with you into the future
        </Typography>
      </Box>
    </Box>
  );
};

export default CareerJourney;
