import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

import Navbar from './navbar';
import SearchResults from './search_results';
import AllPosts from './posts';
import PostDisplay from './post';
import NLPSelector from './main_selection';
import Processing from './processing';

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
  },
	typography: {
    fontFamily: [
      'Karla',
      'Mirza',
			'Muli',
			'Noto Sans',
			'Hind Guntur'
    ].join(','),
  },
});


var searchPage = document.querySelector("#searchresults");
var appSelectorPage = document.querySelector("#appselector");
var explorePage = document.querySelector("#explore");
var singlePostPage = document.querySelector("#singlepost");
var processingPage = document.querySelector("#processing");

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<Navbar
			title={title}
			menu={menu}
		/>
	</MuiThemeProvider>,
	document.querySelector('#navbar')
);

if (appSelectorPage) {
	ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<NLPSelector
			selection={selection}
		/>
	</MuiThemeProvider>,
	appSelectorPage);
}

if (searchPage){
	ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<SearchResults 
			results={results}
			next_url={next_url}
			prev_url={prev_url}
		/>
	</MuiThemeProvider>,
	searchPage);
}

if (explorePage){
	ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<AllPosts
			posts={posts}
		/>
	</MuiThemeProvider>,
	explorePage);
}

if (singlePostPage){
	ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<PostDisplay
			post={post}
		/>
	</MuiThemeProvider>,
	singlePostPage);
}

if (processingPage){
	ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<Processing
			asteroids={asteroids}
		/>
	</MuiThemeProvider>,
	processingPage);
}
