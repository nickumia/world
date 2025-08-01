import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Container, Tooltip } from "@mui/material";
import { blue } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import json_parse from './json_parse';

// react.school/material-ui

// Styled components using MUI v5 styled API
const StyledAppBar = styled(AppBar)({
  background: `linear-gradient(45deg, ${blue[600]} 30%, ${blue[800]} 90%)`,
  boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
});

const NavButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2),
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

export default function RealmNavbar({ pages }) {
  const parsedPages = json_parse(pages);
  
  return (
    <StyledAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box 
            sx={{ 
              flexGrow: 1, 
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              padding: 1
            }}
          >
            {parsedPages.map((page) => (
              <NavButton
                key={page.key}
                href={page.link}
                variant="text"
                size="large"
              >
                {page.key}
              </NavButton>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
	
}
