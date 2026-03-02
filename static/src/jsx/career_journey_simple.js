import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Avatar,
  Tooltip,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  School as SchoolIcon,
  Code as CodeIcon,
  Work as WorkIcon,
  Psychology as PsychologyIcon,
  Explore as ExploreIcon,
  Favorite as FavoriteIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

// Styled components
const GraphContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '400px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(255,255,255,0.05)',
  borderRadius: theme.shape.borderRadius,
  margin: '20px 0',
}));

const CentralNode = styled(Box)(({ theme }) => ({
  width: 100,
  height: 100,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '16px',
  textAlign: 'center',
  boxShadow: theme.shadows[8],
  position: 'relative',
  zIndex: 20,
}));

const PathBranch = styled(Box)(({ theme, direction, isActive, branchColor }) => ({
  position: 'absolute',
  width: isActive ? 4 : 2,
  height: 120,
  backgroundColor: isActive ? branchColor || '#10b981' : '#94a3b8',
  borderRadius: isActive ? 2 : 1,
  opacity: isActive ? 1 : 0.4,
  transformOrigin: 'top center',
  transform: `rotate(${direction}deg)`,
  transition: 'all 0.3s ease',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: isActive ? 12 : 8,
    height: isActive ? 12 : 8,
    borderRadius: '50%',
    backgroundColor: isActive ? branchColor || '#10b981' : '#94a3b8',
  },
}));

const PathContent = styled(Paper)(({ theme, isActive, contentColor }) => ({
  position: 'absolute',
  padding: theme.spacing(1.5),
  backgroundColor: isActive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.1)',
  color: 'white',
  borderRadius: theme.shape.borderRadius,
  borderLeft: `4px solid ${isActive ? contentColor || '#10b981' : '#94a3b8'}`,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  opacity: isActive ? 1 : 0.6,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

// Career themes
const CAREER_THEMES = {
  skills: {
    name: "Skills Building",
    icon: SchoolIcon,
    color: "#10b981",
    description: "Developing practical abilities"
  },
  coding: {
    name: "Coding",
    icon: CodeIcon,
    color: "#3b82f6",
    description: "Programming and development"
  },
  career: {
    name: "Career",
    icon: WorkIcon,
    color: "#f59e0b",
    description: "Professional development"
  },
  personal: {
    name: "Personal Growth",
    icon: PsychologyIcon,
    color: "#8b5cf6",
    description: "Self-discovery and growth"
  },
  exploration: {
    name: "Exploration",
    icon: ExploreIcon,
    color: "#06b6d4",
    description: "Trying new things"
  },
  balance: {
    name: "Life Balance",
    icon: FavoriteIcon,
    color: "#ec4899",
    description: "Work-life integration"
  }
};

// Enhanced choice data structure with dependencies
const INITIAL_CHOICES = [
  {
    id: 1,
    title: "Learn Basic Programming",
    theme: "coding",
    timeRequired: 3,
    description: "Start with HTML, CSS, JavaScript basics",
    prerequisites: [],
    unlocks: [2, 3],
    completed: false,
    selected: false
  },
  {
    id: 2,
    title: "Build First Project",
    theme: "coding",
    timeRequired: 2,
    description: "Create a simple web application",
    prerequisites: [1],
    unlocks: [4],
    completed: false,
    selected: false
  },
  {
    id: 3,
    title: "Explore Design Thinking",
    theme: "exploration",
    timeRequired: 1,
    description: "Learn creative problem solving",
    prerequisites: [1],
    unlocks: [5],
    completed: false,
    selected: false
  },
  {
    id: 4,
    title: "Internship Application",
    theme: "career",
    timeRequired: 4,
    description: "Gain real work experience",
    prerequisites: [2],
    unlocks: [6],
    completed: false,
    selected: false
  },
  {
    id: 5,
    title: "Creative Portfolio",
    theme: "personal",
    timeRequired: 2,
    description: "Showcase your unique perspective",
    prerequisites: [3],
    unlocks: [7],
    completed: false,
    selected: false
  },
  {
    id: 6,
    title: "Professional Networking",
    theme: "career",
    timeRequired: 3,
    description: "Build industry connections",
    prerequisites: [4],
    unlocks: [8],
    completed: false,
    selected: false
  },
  {
    id: 7,
    title: "Leadership Workshop",
    theme: "balance",
    timeRequired: 2,
    description: "Develop team management skills",
    prerequisites: [5],
    unlocks: [9],
    completed: false,
    selected: false
  },
  {
    id: 8,
    title: "Career Counseling",
    theme: "career",
    timeRequired: 1,
    description: "Get professional guidance",
    prerequisites: [6],
    unlocks: [10],
    completed: false,
    selected: false
  },
  {
    id: 9,
    title: "Mentorship Program",
    theme: "balance",
    timeRequired: 4,
    description: "Learn from experienced professionals",
    prerequisites: [7],
    unlocks: [11],
    completed: false,
    selected: false
  },
  {
    id: 10,
    title: "Job Search Strategy",
    theme: "career",
    timeRequired: 2,
    description: "Develop effective job hunting skills",
    prerequisites: [8],
    unlocks: [],
    completed: false,
    selected: false
  },
  {
    id: 11,
    title: "Entrepreneurial Venture",
    theme: "exploration",
    timeRequired: 6,
    description: "Start your own business project",
    prerequisites: [9],
    unlocks: [],
    completed: false,
    selected: false
  }
];

const CareerJourney = () => {
  const [choices, setChoices] = useState(INITIAL_CHOICES);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState(null);

  // Check if a choice is available to select
  const isChoiceAvailable = (choice) => {
    return choice.prerequisites.every(prereqId =>
      choices.find(c => c.id === prereqId)?.completed
    );
  };

  const handleChoiceSelect = (choiceId) => {
    const choice = choices.find(c => c.id === choiceId);
    if (!choice || !isChoiceAvailable(choice) || choice.completed) return;

    setChoices(prev => prev.map(c =>
      c.id === choiceId
        ? { ...c, selected: !c.selected }
        : c
    ));
  };

  const handleChoiceComplete = (choiceId) => {
    const choice = choices.find(c => c.id === choiceId);
    if (!choice) return;

    setChoices(prev => prev.map(c =>
      c.id === choiceId
        ? { ...c, selected: false, completed: true }
        : c
    ));
    setCurrentTime(prev => prev + choice.timeRequired);
  };

  // Get choices by availability
  const availableChoices = choices.filter(choice =>
    !choice.completed && isChoiceAvailable(choice)
  );
  const unavailableChoices = choices.filter(choice =>
    !choice.completed && !isChoiceAvailable(choice)
  );
  const selectedChoices = choices.filter(c => c.selected);
  const completedChoices = choices.filter(c => c.completed);

  // Filter choices by theme
  const getFilteredChoices = (choiceList) => {
    if (!selectedTheme) return choiceList;
    return choiceList.filter(choice => choice.theme === selectedTheme);
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
          Career Path Builder
        </Typography>
        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
          Build your future step by step
        </Typography>
        <Typography variant="body1" sx={{ color: 'white' }}>
          Time Invested: {currentTime} months
        </Typography>
      </Box>

      {/* Theme Filters */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
          Filter by Focus Area:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
          <Button
            variant={selectedTheme === null ? 'contained' : 'outlined'}
            onClick={() => setSelectedTheme(null)}
            sx={{
              color: selectedTheme === null ? 'white' : 'rgba(255,255,255,0.7)',
              borderColor: 'rgba(255,255,255,0.3)',
              '&:hover': { borderColor: 'rgba(255,255,255,0.5)' }
            }}
          >
            All
          </Button>
          {Object.entries(CAREER_THEMES).map(([key, theme]) => {
            const IconComponent = theme.icon;
            return (
              <Tooltip key={key} title={theme.description}>
                <Button
                  variant={selectedTheme === key ? 'contained' : 'outlined'}
                  onClick={() => setSelectedTheme(selectedTheme === key ? null : key)}
                  startIcon={<IconComponent />}
                  sx={{
                    color: selectedTheme === key ? 'white' : 'rgba(255,255,255,0.7)',
                    borderColor: 'rgba(255,255,255,0.3)',
                    backgroundColor: selectedTheme === key ? theme.color : 'transparent',
                    '&:hover': {
                      borderColor: 'rgba(255,255,255,0.5)',
                      backgroundColor: selectedTheme === key ? theme.color : 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  {theme.name}
                </Button>
              </Tooltip>
            );
          })}
        </Box>
      </Box>
      <GraphContainer>
        {/* SVG for precise connections */}
        <svg
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 15,
            border: '1px solid red' // Debug border
          }}
        >
          {/* Debug: Show completed choices count */}
          <text x="10" y="20" fill="red" fontSize="12">
            Completed Choices: {completedChoices.length}
          </text>
          
          {/* Connection lines between past choices */}
          {completedChoices.slice(-3).map((choice, index) => {
            if (index === 0) return null; // First choice connects to center
            
            const theme = CAREER_THEMES[choice.theme];
            const prevChoice = completedChoices.slice(-3)[index - 1];
            
            // Calculate current choice position
            const baseDistance = 25;
            const stepDistance = 18;
            const totalDistance = baseDistance + (index * stepDistance);
            const themeAngles = {
              coding: -60, skills: -45, career: -30, personal: -15,
              exploration: 15, balance: 30
            };
            const baseAngle = themeAngles[choice.theme] || -45;
            const angleVariation = (index % 2 === 0 ? 1 : -1) * Math.floor(index / 2) * 8;
            const finalAngle = baseAngle + angleVariation;
            const angleRad = (finalAngle * Math.PI) / 180;
            const currentX = 50 - (totalDistance * Math.cos(angleRad));
            const currentY = 50 + (totalDistance * Math.sin(angleRad) / 4); // Scale down for SVG coords
            
            // Calculate previous choice position
            const prevDistance = baseDistance + ((index - 1) * stepDistance);
            const prevAngle = themeAngles[prevChoice.theme] || -45;
            const prevAngleVariation = ((index - 1) % 2 === 0 ? 1 : -1) * Math.floor((index - 1) / 2) * 8;
            const prevFinalAngle = prevAngle + prevAngleVariation;
            const prevAngleRad = (prevFinalAngle * Math.PI) / 180;
            const prevX = 50 - (prevDistance * Math.cos(prevAngleRad));
            const prevY = 50 + (prevDistance * Math.sin(prevAngleRad) / 4);
            
            return (
              <g key={`connection-${choice.id}`}>
                {/* Debug: Show connection points */}
                <circle cx={`${prevX}%`} cy={`${prevY}%`} r="3" fill="red" />
                <circle cx={`${currentX}%`} cy={`${currentY}%`} r="3" fill="blue" />
                
                <line
                  x1={`${prevX}%`}
                  y1={`${prevY}%`}
                  x2={`${currentX}%`}
                  y2={`${currentY}%`}
                  stroke={theme.color}
                  strokeWidth="3"
                  strokeOpacity="0.7"
                />
              </g>
            );
          })}
          
          {/* Connection from center to first choice */}
          {completedChoices.length > 0 && (() => {
            const firstChoice = completedChoices.slice(-3)[0];
            const theme = CAREER_THEMES[firstChoice.theme];
            const baseDistance = 25;
            const themeAngles = {
              coding: -60, skills: -45, career: -30, personal: -15,
              exploration: 15, balance: 30
            };
            const baseAngle = themeAngles[firstChoice.theme] || -45;
            const angleRad = (baseAngle * Math.PI) / 180;
            const choiceX = 50 - (baseDistance * Math.cos(angleRad));
            const choiceY = 50 + (baseDistance * Math.sin(angleRad) / 4);
            
            return (
              <g key="center-to-first">
                {/* Debug: Show center and first choice points */}
                <circle cx="50%" cy="50%" r="3" fill="green" />
                <circle cx={`${choiceX}%`} cy={`${choiceY}%`} r="3" fill="orange" />
                
                <line
                  x1="50%"
                  y1="50%"
                  x2={`${choiceX}%`}
                  y2={`${choiceY}%`}
                  stroke={theme.color}
                  strokeWidth="3"
                  strokeOpacity="0.7"
                />
              </g>
            );
          })()}
        </svg>

        {/* Central Node */}
        <CentralNode>
          TODAY
        </CentralNode>

        {/* Past Paths - Left Side - Connected Tree Structure */}
        {completedChoices.slice(-3).map((choice, index) => {
          const theme = CAREER_THEMES[choice.theme];

          // Create connected path: each choice builds from previous position
          const baseDistance = 25; // Distance from center
          const stepDistance = 18; // Distance between choices
          const totalDistance = baseDistance + (index * stepDistance);

          // Theme-based angle variations for branching effect
          const themeAngles = {
            coding: -60,      // Sharp left for technical
            skills: -45,      // Moderate left for skills
            career: -30,      // Gentle left for career
            personal: -15,    // Slight left for personal
            exploration: 15,  // Slight right for exploration
            balance: 30       // Gentle right for balance
          };

          // Add progressive angle variation for tree-like growth
          const baseAngle = themeAngles[choice.theme] || -45;
          const angleVariation = (index % 2 === 0 ? 1 : -1) * Math.floor(index / 2) * 8;
          const finalAngle = baseAngle + angleVariation;

          // Calculate position using polar coordinates for smooth branching
          const angleRad = (finalAngle * Math.PI) / 180;
          const horizontalOffset = 50 - (totalDistance * Math.cos(angleRad));
          const verticalOffset = totalDistance * Math.sin(angleRad);

          return (
            <Box key={choice.id} sx={{
              position: 'absolute',
              left: `${horizontalOffset}%`,
              top: `calc(50% + ${verticalOffset}px)`,
              transform: 'translate(-50%, -50%)',
              zIndex: 5
            }}>
              <PathContent
                isActive={true}
                contentColor={theme.color}
                sx={{ width: 130, position: 'relative' }}
              >
                <Typography variant="body2" sx={{ fontSize: '0.75rem', fontWeight: 'bold' }}>
                  ✓ {choice.title}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.7rem', opacity: 0.8 }}>
                  {choice.timeRequired}mo
                </Typography>
              </PathContent>
            </Box>
          );
        })}

        {/* Future Paths - Right Side */}
        {availableChoices.slice(0, 3).map((choice, index) => {
          const theme = CAREER_THEMES[choice.theme];
          const verticalOffset = (index - 1) * 120; // Spread choices vertically
          return (
            <Box key={choice.id} sx={{
              position: 'absolute',
              right: '8%',
              top: `calc(50% + ${verticalOffset}px)`,
              transform: 'translateY(-50%)',
              zIndex: 5
            }}>
              <PathBranch
                direction={45 + (index * 15)}
                isActive={false}
                sx={{ position: 'absolute', left: -80, top: 10 }}
              />
              <PathContent
                isActive={false}
                onClick={() => handleChoiceSelect(choice.id)}
                sx={{ width: 130, position: 'relative', cursor: 'pointer' }}
              >
                <Typography variant="body2" sx={{ fontSize: '0.75rem', fontWeight: 'bold' }}>
                  {choice.title}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.7rem', opacity: 0.8 }}>
                  {choice.timeRequired}mo
                </Typography>
              </PathContent>
            </Box>
          );
        })}
      </GraphContainer>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          Completed: {completedChoices.length} • Selected: {selectedChoices.length} • Available: {availableChoices.length}
        </Typography>
      </Box>

      {/* Available Choices */}
      <Box sx={{ maxWidth: 1000, mx: 'auto', mb: 4 }}>
        <Typography variant="h5" sx={{ color: 'white', mb: 3, textAlign: 'center' }}>
          Available Choices
        </Typography>

        {getFilteredChoices(availableChoices).map(choice => {
          const theme = CAREER_THEMES[choice.theme];
          const IconComponent = theme.icon;

          return (
            <Card key={choice.id} sx={{
              mb: 2,
              backgroundColor: choice.selected ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.1)',
              border: choice.selected ? '2px solid #10b981' : '1px solid rgba(255,255,255,0.2)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onClick={() => handleChoiceSelect(choice.id)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: theme.color, mr: 2, width: 32, height: 32 }}>
                      <IconComponent sx={{ fontSize: 16 }} />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mb: 0.5 }}>
                        {choice.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.color, fontWeight: 'medium' }}>
                        {theme.name}
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    label={`${choice.timeRequired}mo`}
                    size="small"
                    sx={{ backgroundColor: 'rgba(59, 130, 246, 0.8)', color: 'white' }}
                  />
                </Box>

                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
                  {choice.description}
                </Typography>

                {choice.unlocks.length > 0 && (
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', mb: 1 }}>
                    Unlocks {choice.unlocks.length} new choice{choice.unlocks.length > 1 ? 's' : ''}
                  </Typography>
                )}

                {choice.selected && (
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChoiceComplete(choice.id);
                    }}
                  >
                    Mark Complete
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}

        {getFilteredChoices(availableChoices).length === 0 && (
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', py: 4 }}>
            No choices available in this category. Try selecting "All" or complete prerequisites first.
          </Typography>
        )}
      </Box>

      {/* Unavailable Choices (Locked) */}
      {!selectedTheme && unavailableChoices.length > 0 && (
        <Box sx={{ maxWidth: 1000, mx: 'auto', mb: 4 }}>
          <Typography variant="h5" sx={{ color: 'white', mb: 3, textAlign: 'center' }}>
            Locked Choices (Complete Prerequisites)
          </Typography>

          {unavailableChoices.slice(0, 3).map(choice => {
            const theme = CAREER_THEMES[choice.theme];
            const IconComponent = theme.icon;

            return (
              <Card key={choice.id} sx={{
                mb: 2,
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                opacity: 0.6
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', mr: 2, width: 32, height: 32 }}>
                        <IconComponent sx={{ fontSize: 16, color: 'rgba(255,255,255,0.5)' }} />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 'bold', mb: 0.5 }}>
                          🔒 {choice.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                          {theme.name}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      label={`${choice.timeRequired}mo`}
                      size="small"
                      sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}
                    />
                  </Box>

                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mb: 1 }}>
                    {choice.description}
                  </Typography>

                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
                    Requires: {choice.prerequisites.map(id => choices.find(c => c.id === id)?.title).join(', ')}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      )}

      {/* Completed Choices */}
      {completedChoices.length > 0 && (
        <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
          <Typography variant="h5" sx={{ color: 'white', mb: 3, textAlign: 'center' }}>
            Completed Choices
          </Typography>

          {getFilteredChoices(completedChoices).map(choice => {
            const theme = CAREER_THEMES[choice.theme];
            const IconComponent = theme.icon;

            return (
              <Card key={choice.id} sx={{
                mb: 2,
                backgroundColor: 'rgba(16, 185, 129, 0.3)',
                border: '2px solid #10b981'
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar sx={{ bgcolor: '#10b981', mr: 2, width: 32, height: 32 }}>
                      <IconComponent sx={{ fontSize: 16 }} />
                    </Avatar>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                      ✓ {choice.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    {choice.description} ({choice.timeRequired} months invested)
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default CareerJourney;
