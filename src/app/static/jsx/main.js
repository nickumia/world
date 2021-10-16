import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

import Navbar from './navbar';
import SearchResults from './search_results';

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

var searchPage = document.querySelector("#searchresults");
var appPage = document.querySelector("#app");

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<Navbar
			title={title}
			menu={menu}
		/>
	</MuiThemeProvider>,
	document.querySelector('#navbar')
);

if (appPage) {
	ReactDOM.render(<App />, appPage);
}

if (searchPage){
	console.log("asdf");
	ReactDOM.render(
		<SearchResults 
			results={results}
			next_url={next_url}
			prev_url={prev_url}
		/>,
	searchPage);
}
