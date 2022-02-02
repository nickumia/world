import React from "react";

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import json_parse from './json_parse';


export default function AllPosts({posts}) {

	var post_list = json_parse(posts);
	const pics = {
		'processing': '/static/img/processing.png',
		'language': '/static/img/language.png',
		'natural': '/static/img/natural.jpg'
	};

	return (
    <React.Fragment>
			<List dense={false}>
				{post_list.map(post_list => (
        	<ListItemButton component='a' href={post_list.link} key={post_list.id}>
						<ListItemAvatar>
							<Avatar alt={post_list.avatar} src={pics[post_list.avatar]} />
						</ListItemAvatar>
          	<ListItemText
            	primary={post_list.title}
							// TODO: Implement keyword analysis on post for contextual meaning extraction
              // secondary={post_list.body ? post_list.body : 'Click for more info'}
							secondary={post_list.subtitle}
              />
          </ListItemButton>
				))}
      </List>
    </React.Fragment>
	);
}
