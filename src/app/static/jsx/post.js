import React from "react";

import Typography from "@material-ui/core/Typography";

export default function PostDisplay({post}) {

	var post_dict = JSON.parse(post)

	return (
    <React.Fragment>
    	<Typography variant="h3">
      	{post_dict.title}
      </Typography>
    	<Typography variant="h6">
      	Posted: {post_dict.posted_time}
      </Typography>

			<div className="wrapper row3">
			  <main className="hoc container clear"> 
					<div className="content" dangerouslySetInnerHTML={{__html: post_dict.body}}></div>
				</main>
			</div>

    </React.Fragment>
	);
}
