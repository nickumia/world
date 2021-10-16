import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

import Navbar from './navbar';
import SearchResults from './search_results';
import AllPosts from './posts';
import PostDisplay from './post';

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
var explorePage = document.querySelector("#explore");
var singlePostPage = document.querySelector("#singlepost");

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
	ReactDOM.render(
		<SearchResults 
			results={results}
			next_url={next_url}
			prev_url={prev_url}
		/>,
	searchPage);
}

if (explorePage){
	ReactDOM.render(
		<AllPosts
			posts={posts}
		/>,
	explorePage);
}

if (singlePostPage){
	ReactDOM.render(
		<PostDisplay
			post={post}
		/>,
	singlePostPage);
}
