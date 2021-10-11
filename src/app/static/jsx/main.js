import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

import Navbar from './navbar';

const theme = createTheme({
	palette: {
    primary: {
      main: "#78909C",
      contrastText: "#FFF"
    },
    secondary: {
      main: "#CFD8DC",
      contrastText: "#FFF"
    }
  }
});

function App() {
  return (
		<></>
	);
}

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<Navbar
			title={title}
			menu={menu}
		/>
	</MuiThemeProvider>,
	document.querySelector('#navbar')
);
ReactDOM.render(<App />, document.querySelector('#app'));
