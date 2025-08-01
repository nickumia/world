import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import CoPresent from '@mui/icons-material/CoPresent';


// Styled components using MUI v5 styled API
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: 'space-between',
}));

const TitleLink = styled('a')({
  color: 'white',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'none',
  },
});

export default function ButtonAppBar({ title, menu, login }) {
  // Adapted from https://react.school/material-ui/appbar/
	const icons = {
		"Login": <LoginIcon />,
		"Logout": <LogoutIcon />,
		"Home": <HomeIcon />,
		"Posts": <BookIcon />,
    "NLP": <CoPresent />,
		"Processing": <ChangeHistoryIcon />,
		"Language": <CheckBoxOutlineBlankIcon />,
		"Natural": <CircleOutlinedIcon />,
		"Kumia": <BlurOnIcon />,
	};



  return (
    <React.Fragment>
      <AppBar position="static">
        <StyledToolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <TitleLink href="/">
              {title}
              {title === 'Kamutiv Tech | Error' && ' \u{1F627}'}
            </TitleLink>
          </Typography>
          {menu.map((item) => (
            <form action={item.link} key={item.key}>
              <Tooltip title={item.name}>
                <IconButton color="inherit" type="submit" size="large">
                  {icons[item.name]}
                </IconButton>
              </Tooltip>
            </form>
          ))}
        </StyledToolbar>
      </AppBar>
    </React.Fragment>
  );
}
