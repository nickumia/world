import React from 'react';
import { createRoot } from 'react-dom/client';
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
import OfflineMain from './offline_main';

import decrypt from "./encryption";


const theme = createTheme({
	palette: {
    primary: {
      main: "#c7a97b",
      contrastText: "#FFF"
    },
    secondary: {
      main: "#ffe396",
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


var pages = {
	"#navbar": function test1() {return <Navbar title={title} menu={menu} />},
	"#realmnav": function test1() {return <RealmNavbar pages={navigate} />},
	"#appselector": function test1() {return <NLPSelector selection={selection} />},
	"#explore": function test1() {return <AllPosts posts={posts} />},
	"#singlepost": function test1() {return <PostDisplay post={post} />},
	"#realm": function test1() {return <Realm domain={domain} asteroids={asteroids} />},
	"#kumia": function test1() {return <Kumia pubs={pubs} work={work} edu={edu} />},
	"#syntaxapp": function test1() {return <SyntaxApp details={details} />},
	"#offlinemain": function test1() {return <OfflineMain />}
}

for (let page in pages) {
	var pageElement = document.querySelector(page);
	if (pageElement) {
		createRoot(pageElement).render(
			<MuiThemeProvider theme={theme}>
						{pages[page].call()}
			</MuiThemeProvider>
		);
	}
}
