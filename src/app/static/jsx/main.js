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
import AllPosts from './posts';
import PostDisplay from './post';
import NLPSelector from './main_selection';
import Realm from './realm';
import Kumia from './kumia';
import SyntaxApp from './syntax';
import Offline from './offline';
import OfflineMain from './offline_main';

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
var appSelectorPage = document.querySelector("#appselector");
var explorePage = document.querySelector("#explore");
var singlePostPage = document.querySelector("#singlepost");
var realmPage = document.querySelector("#realm");
var kumiaPage = document.querySelector("#kumia");
var syntaxPage = document.querySelector("#syntaxapp");
var offlinePage = document.querySelector("#offline");
var offlineMainPage = document.querySelector("#offlinemain");

if (navBar) {
	const root = ReactDOM.createRoot(navBar);
	root.render(
		<MuiThemeProvider theme={theme}>
			<Navbar
				title={title}
				menu={menu}
			/>
		</MuiThemeProvider>
	);
}

if (realmNav){
	const root = ReactDOM.createRoot(realmNav);
	root.render(
	<MuiThemeProvider theme={theme}>
		<RealmNavbar
			pages={navigate}
		/>
	</MuiThemeProvider>
	);
}

if (appSelectorPage) {
	const root = ReactDOM.createRoot(appSelectorPage);
	root.render(
	<MuiThemeProvider theme={theme}>
		<NLPSelector
			// selection={decrypt(JSON.parse(selection).data)}
			selection={selection}
		/>
	</MuiThemeProvider>
	);
}

if (explorePage){
	const root = ReactDOM.createRoot(explorePage);
	root.render(
	<MuiThemeProvider theme={theme}>
		<AllPosts
			// posts={decrypt(JSON.parse(posts).data)}
			posts={posts}
		/>
	</MuiThemeProvider>
	);
}

if (singlePostPage){
	const root = ReactDOM.createRoot(singlePostPage);
	root.render(
	<MuiThemeProvider theme={theme}>
		<PostDisplay
			// post={decrypt(JSON.parse(post).data)}
			post={post}
		/>
	</MuiThemeProvider>
	);
}

if (realmPage){
	const root = ReactDOM.createRoot(realmPage);
	root.render(
	<MuiThemeProvider theme={theme}>
		<Realm
			// domain={decrypt(JSON.parse(domain).data)}
			// asteroids={decrypt(JSON.parse(asteroids).data)}
			domain={domain}
			asteroids={asteroids}
		/>
	</MuiThemeProvider>
	);
}

if (kumiaPage){
	const root = ReactDOM.createRoot(kumiaPage);
	root.render(
	<MuiThemeProvider theme={theme}>
		<Kumia
			// pubs={decrypt(JSON.parse(pubs).data)}
			// work={decrypt(JSON.parse(work).data)}
			// edu={decrypt(JSON.parse(edu).data)}
			pubs={pubs}
			work={work}
			edu={edu}
		/>
	</MuiThemeProvider>
	);
}

if (syntaxPage){
	const root = ReactDOM.createRoot(syntaxPage);
	root.render(
	<MuiThemeProvider theme={theme}>
		<SyntaxApp
			details={details}
		/>
	</MuiThemeProvider>
	);
}

if (offlinePage){
	const root = ReactDOM.createRoot(offlinePage);
	root.render(
	<MuiThemeProvider theme={theme}>
		<Offline />
	</MuiThemeProvider>
	);
}

if (offlineMainPage){
	const root = ReactDOM.createRoot(offlineMainPage);
	root.render(
	<MuiThemeProvider theme={theme}>
		<OfflineMain />
	</MuiThemeProvider>
	);
}
