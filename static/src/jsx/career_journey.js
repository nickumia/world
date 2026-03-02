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

// Path data structure
const PATH_DATA = {
  past: [
    { id: 1, title: "Traditional College", isDead: true, description: "The expected path" },
    { id: 2, title: "Gap Year", isDead: true, description: "Time to explore" },
    { id: 3, title: "Trade School", isDead: true, description: "Practical skills focus" },
    { id: 4, title: "Self-Taught", isDead: false, description: "Your chosen path" },
  ],
  future: [
    { id: 1, title: "Tech Industry", theme: "skills", isChosen: false },
    { id: 2, title: "Creative Arts", theme: "identity", isChosen: false },
    { id: 3, title: "Entrepreneurship", theme: "exploration", isChosen: false },
    { id: 4, title: "Healthcare", theme: "reality", isChosen: false },
    { id: 5, title: "Education", theme: "balance", isChosen: false },
    { id: 6, title: "Research", theme: "exploration", isChosen: false },
  ]
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

const PathBranch = styled(Box)(({ theme, isChosen, isDead, branchIndex, pathType }) => ({
  position: 'absolute',
  width: pathType === 'main' ? 6 : 3,
  backgroundColor: isChosen ? '#10b981' : isDead ? '#94a3b8' : '#3b82f6',
  borderRadius: pathType === 'main' ? 3 : 1.5,
  transition: 'all 0.5s ease',
  opacity: isDead ? 0.3 : isChosen ? 1 : 0.8,
  transform: `rotate(${branchIndex * 30}deg)`,
  transformOrigin: 'top center',
  height: pathType === 'main' ? 200 : 150,
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: pathType === 'main' ? 16 : 10,
    height: pathType === 'main' ? 16 : 10,
    borderRadius: '50%',
    backgroundColor: isChosen ? '#10b981' : isDead ? '#94a3b8' : '#3b82f6',
    boxShadow: isChosen ? '0 0 20px rgba(16, 185, 129, 0.5)' : 'none',
  },
  '&:hover': {
    backgroundColor: isChosen ? '#10b981' : isDead ? '#94a3b8' : '#60a5fa',
    width: pathType === 'main' ? 8 : 4,
  },
}));

const PathVisualization = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '400px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'visible',
  margin: '20px 0',
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
      px: 2,
      overflowX: 'hidden'
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
      <PathVisualization>
        {/* Central Point - Today */}
        <Fade in={currentView === 'present'} timeout={500}>
          <CentralPoint>
            TODAY
          </CentralPoint>
        </Fade>

        {/* Past Paths (when viewing past) */}
        {currentView === 'past' && (
          <Fade in={true} timeout={300}>
            <Box sx={{ 
              position: 'absolute', 
              left: '5%', 
              top: '50%', 
              transform: 'translateY(-50%)',
              maxWidth: '35%',
              zIndex: 10
            }}>
              <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                Paths Behind You
              </Typography>
              {PATH_DATA.past.map((path, index) => (
                <Box key={path.id} sx={{ mb: 2, position: 'relative' }}>
                  <PathBranch
                    isChosen={!path.isDead}
                    isDead={path.isDead}
                    branchIndex={index}
                    pathType={!path.isDead ? 'main' : 'secondary'}
                    sx={{
                      position: 'absolute',
                      right: -40,
                      top: 20,
                      transform: `rotate(${-15 + index * 10}deg)`,
                    }}
                  />
                  <Paper
                    elevation={3}
                    sx={{
                      p: 2,
                      backgroundColor: path.isDead ? 'rgba(148, 163, 184, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                      color: 'white',
                      borderLeft: `4px solid ${path.isDead ? '#94a3b8' : '#10b981'}`,
                      opacity: path.isDead ? 0.6 : 1,
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {path.title}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {path.description}
                    </Typography>
                  </Paper>
                </Box>
              ))}
            </Box>
          </Fade>
        )}

        {/* Future Branches (when viewing future) */}
        {currentView === 'future' && (
          <Fade in={true} timeout={300}>
            <Box sx={{ 
              position: 'absolute', 
              right: '5%', 
              top: '50%', 
              transform: 'translateY(-50%)',
              maxWidth: '35%',
              zIndex: 10
            }}>
              <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                Possible Futures
              </Typography>
              {PATH_DATA.future.map((path, index) => {
                const theme = CAREER_THEMES[path.theme];
                const IconComponent = theme.icon;
                return (
                  <Box key={path.id} sx={{ mb: 2, position: 'relative' }}>
                    <PathBranch
                      isChosen={path.isChosen}
                      isDead={false}
                      branchIndex={index}
                      pathType={path.isChosen ? 'main' : 'secondary'}
                      sx={{
                        position: 'absolute',
                        left: -40,
                        top: 20,
                        transform: `rotate(${180 - index * 10}deg)`,
                        backgroundColor: theme.color,
                        '&::after': {
                          backgroundColor: theme.color,
                        },
                      }}
                    />
                    <Paper
                      elevation={3}
                      sx={{
                        p: 2,
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        cursor: 'pointer',
                        borderLeft: `4px solid ${theme.color}`,
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.2)',
                        },
                      }}
                      onClick={() => handleThemeSelect(path.theme)}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconComponent sx={{ mr: 1 }} />
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {path.title}
                          </Typography>
                          <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            {theme.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>
                );
              })}
            </Box>
          </Fade>
        )}

        {/* Converging Paths Visualization */}
        {currentView === 'present' && carriedChoices.length > 0 && (
          <Fade in={true} timeout={300}>
            <Box sx={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
              {carriedChoices.map((choice, index) => {
                const theme = CAREER_THEMES[choice.theme];
                return (
                  <Box
                    key={choice.id}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: 2,
                      height: 100,
                      backgroundColor: theme.color,
                      transform: `translate(-50%, -50%) rotate(${index * (360 / carriedChoices.length)}deg)`,
                      opacity: 0.6,
                    }}
                  />
                );
              })}
            </Box>
          </Fade>
        )}
      </PathVisualization>

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
