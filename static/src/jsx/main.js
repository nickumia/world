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
import NLPMain from './nlp_main';
import HomeMain from './home_main';
import SpiritualTech from './spiritual_tech';
import Financial from './financial';

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
	"#spiritualtech": function test1() {return <SpiritualTech />},
	"#financial": function test1() {return <Financial />},
	"#nlpmain": function test1() {return <NLPMain />},
	"#homemain": function test1() {return <HomeMain allPages={allPages} />}
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
