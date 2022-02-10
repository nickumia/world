import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import brown from "@material-ui/core/colors/brown";
import indigo from "@material-ui/core/colors/indigo";
import blue from "@material-ui/core/colors/blue";
import lightGreen from "@material-ui/core/colors/lightGreen";

import Navbar from './navbar';
import RealmNavbar from './realmnav';
import SearchResults from './search_results';
import AllPosts from './posts';
import PostDisplay from './post';
import NLPSelector from './main_selection';
import Realm from './realm';
import Kumia from './kumia';
import SyntaxApp from './syntax';
import Offline from './offline';

import decrypt from "./encryption";


const theme = createTheme({
	palette: {
    primary: {
      main: blue[800],
      contrastText: "#FFF"
    },
    secondary: {
      main: blue[50],
      contrastText: "#FFF"
    },
    // warning: {
    //   main: blue[700],
    //   contrastText: "#FFF"
    // },
  },
	typography: {
    fontFamily: [
      'Karla',
      'Mirza',
			'Muli',
			'Noto Sans',
			'Hind Guntur',
			'Arial'
    ].join(','),
		body2: {
			color: "white"
		},
  },
	spacing: 8,
});


var realmNav = document.querySelector('#realmnav');

var navBar = document.querySelector('#navbar');
var searchPage = document.querySelector("#searchresults");
var appSelectorPage = document.querySelector("#appselector");
var explorePage = document.querySelector("#explore");
var singlePostPage = document.querySelector("#singlepost");
var realmPage = document.querySelector("#realm");
var kumiaPage = document.querySelector("#kumia");
var syntaxPage = document.querySelector("#syntaxapp");
var offlinePage = document.querySelector("#offline");

if (navBar) {
	ReactDOM.render(
		<MuiThemeProvider theme={theme}>
			<Navbar
				title={title}
				menu={menu}
				searchToggle={searchOn}
			/>
		</MuiThemeProvider>,
	navBar);
}

if (realmNav){
	ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<RealmNavbar
			pages={navigate}
		/>
	</MuiThemeProvider>,
	realmNav);
}

if (appSelectorPage) {
	ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<NLPSelector
			// selection={decrypt(JSON.parse(selection).data)}
			selection={selection}
		/>
	</MuiThemeProvider>,
	appSelectorPage);
}

if (searchPage){
	ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<SearchResults 
			// results={decrypt(JSON.parse(results).data)}
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
			// posts={decrypt(JSON.parse(posts).data)}
			posts={posts}
		/>
	</MuiThemeProvider>,
	explorePage);
}

if (singlePostPage){
	ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<PostDisplay
			// post={decrypt(JSON.parse(post).data)}
			post={post}
		/>
	</MuiThemeProvider>,
	singlePostPage);
}

if (realmPage){
	ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<Realm
			// domain={decrypt(JSON.parse(domain).data)}
			// asteroids={decrypt(JSON.parse(asteroids).data)}
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
			// pubs={decrypt(JSON.parse(pubs).data)}
			// work={decrypt(JSON.parse(work).data)}
			// edu={decrypt(JSON.parse(edu).data)}
			pubs={pubs}
			work={work}
			edu={edu}
		/>
	</MuiThemeProvider>,
	kumiaPage);
}

if (syntaxPage){
	ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<SyntaxApp
			details={details}
		/>
	</MuiThemeProvider>,
	syntaxPage);
}

if (offlinePage){
	ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<Offline />
	</MuiThemeProvider>,
	offlinePage);
}
