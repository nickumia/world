import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import brown from "@material-ui/core/colors/brown";
import indigo from "@material-ui/core/colors/indigo";
import lightGreen from "@material-ui/core/colors/lightGreen";

import Navbar from './navbar';
import SearchResults from './search_results';
import AllPosts from './posts';
import PostDisplay from './post';
import NLPSelector from './main_selection';
import Realm from './realm';
import Kumia from './kumia';

const theme = createTheme({
	palette: {
    primary: {
      main: indigo[300],
      contrastText: "#FFF"
    },
    secondary: {
      main: indigo[50],
      contrastText: "#FFF"
    },
  },
	typography: {
    fontFamily: [
      'Karla',
      'Mirza',
			'Muli',
			'Noto Sans',
			'Hind Guntur'
    ].join(','),
		body2: {
			color: "white"
		},
  },
});


var searchPage = document.querySelector("#searchresults");
var appSelectorPage = document.querySelector("#appselector");
var explorePage = document.querySelector("#explore");
var singlePostPage = document.querySelector("#singlepost");
var realmPage = document.querySelector("#realm");
var kumiaPage = document.querySelector("#kumia");

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

if (realmPage){
	ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<Realm
			domain={domain}
			asteroids={asteroids}
		/>
	</MuiThemeProvider>,
	realmPage);
}

if (kumiaPage){
	ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<Kumia
			pubs={pubs}
			work={work}
			edu={edu}
		/>
	</MuiThemeProvider>,
	kumiaPage);
}
